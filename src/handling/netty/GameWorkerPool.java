package handling.netty;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * GameWorkerPool to handle heavy game logic off the Netty Event Loop.
 * This ensures the networking layer remains responsive even during heavy processing.
 */
public class GameWorkerPool {

    private static final ExecutorService pool;
    private static final int THREAD_COUNT = Runtime.getRuntime().availableProcessors() * 2;

    static {
        pool = Executors.newFixedThreadPool(THREAD_COUNT, new ThreadFactory() {
            private final AtomicInteger threadNumber = new AtomicInteger(1);

            @Override
            public Thread newThread(Runnable r) {
                Thread t = new Thread(r);
                t.setName("Netty-GameWorker-" + threadNumber.getAndIncrement());
                t.setPriority(Thread.MAX_PRIORITY); // Prioritize game logic processing
                return t;
            }
        });
    }

    public static void submit(Runnable task) {
        pool.submit(task);
    }

    public static void shutdown() {
        pool.shutdown();
    }
}
