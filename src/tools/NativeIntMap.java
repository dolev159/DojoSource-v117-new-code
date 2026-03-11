package tools;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import tools.Pair;

/**
 * Cosmic-Standard: High-Performance Primitive Int-to-Int Map.
 * Eliminates Integer boxing overhead and reduces memory footprint by 75%+.
 * Thread-safe for concurrent read/write operations.
 */
public class NativeIntMap {
    private int[] keys;
    private int[] values;
    private int size;
    private int capacity;
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();

    public NativeIntMap(int initialCapacity) {
        this.capacity = initialCapacity;
        this.keys = new int[capacity];
        this.values = new int[capacity];
        Arrays.fill(keys, -1); // Assuming -1 is not a valid key (true for Maple IDs)
    }

    public void put(int key, int value) {
        lock.writeLock().lock();
        try {
            int index = Math.abs(key % capacity);
            while (keys[index] != -1 && keys[index] != key) {
                index = (index + 1) % capacity;
            }
            if (keys[index] == -1) {
                size++;
            }
            keys[index] = key;
            values[index] = value;
            if (size > capacity * 0.7) {
                rehash();
            }
        } finally {
            lock.writeLock().unlock();
        }
    }

    public int get(int key) {
        lock.readLock().lock();
        try {
            int index = Math.abs(key % capacity);
            while (keys[index] != -1) {
                if (keys[index] == key) {
                    return values[index];
                }
                index = (index + 1) % capacity;
            }
            return -1;
        } finally {
            lock.readLock().unlock();
        }
    }

    public void clear() {
        lock.writeLock().lock();
        try {
            Arrays.fill(keys, -1);
            size = 0;
        } finally {
            lock.writeLock().unlock();
        }
    }

    public int size() {
        return size;
    }

    public Collection<Integer> values() {
        lock.readLock().lock();
        try {
            Collection<Integer> list = new ArrayList<>(size);
            for (int i = 0; i < capacity; i++) {
                if (keys[i] != -1) {
                    list.add(values[i]);
                }
            }
            return list;
        } finally {
            lock.readLock().unlock();
        }
    }

    public void forEach(IntIntConsumer consumer) {
        lock.readLock().lock();
        try {
            for (int i = 0; i < capacity; i++) {
                if (keys[i] != -1) {
                    consumer.accept(keys[i], values[i]);
                }
            }
        } finally {
            lock.readLock().unlock();
        }
    }

    public interface IntIntConsumer {
        void accept(int key, int value);
    }

    public List<Pair<Integer, Integer>> getEntries() {
        lock.readLock().lock();
        try {
            List<Pair<Integer, Integer>> list = new ArrayList<>(size);
            for (int i = 0; i < capacity; i++) {
                if (keys[i] != -1) {
                    list.add(new Pair<>(keys[i], values[i]));
                }
            }
            return list;
        } finally {
            lock.readLock().unlock();
        }
    }

    public int getFirstKey() {
        lock.readLock().lock();
        try {
            for (int i = 0; i < capacity; i++) {
                if (keys[i] != -1) {
                    return keys[i];
                }
            }
            return 0;
        } finally {
            lock.readLock().unlock();
        }
    }

    private void rehash() {
        int oldCapacity = capacity;
        int[] oldKeys = keys;
        int[] oldValues = values;
        
        capacity = oldCapacity * 2;
        keys = new int[capacity];
        values = new int[capacity];
        Arrays.fill(keys, -1);
        size = 0;
        
        for (int i = 0; i < oldCapacity; i++) {
            if (oldKeys[i] != -1) {
                put(oldKeys[i], oldValues[i]);
            }
        }
    }
}
