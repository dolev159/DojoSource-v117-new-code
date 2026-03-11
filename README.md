# DojoSource-v117-Ultimate
The most advanced GMS v117 Emulator project focused on stabilization, security, and authentic gameplay.

## 🛠️ Technical Stack & Architecture

This project has been re-architected to meet 2026 enterprise standards for game server development:

- **Runtime Environment:** Optimized for **Java 11+ / OpenJDK 17**.
- **Networking Layer:** High-performance **Netty 4.1.x NIO** framework for non-blocking packet I/O, ensuring zero-lag communication.
- **Scripting Engine:** **GraalVM Polyglot API** (JavaScript) with a custom **Nashorn compatibility bridge**, enabling high-speed script execution while maintaining support for legacy GMS scripts.
- **Database Architecture:** **MariaDB / MySQL** integration using **HikariCP** for ultra-fast, leak-proof connection pooling.
- **Security:** Implementations of **AES-256 CTR** cryptography and custom CRC bypasses matching the GMS v117.2 protocol.
- **Concurrency Model:** Enterprise-grade **ReentrantReadWriteLocks** for character data thread safety and optimized **Spatial Hashing** for packet broadcasting.

---

## 🚀 Weekly Update Log (March 2026)

Nexus Omni has completed a comprehensive overhaul of the source code. Below is the detailed list of modifications and enhancements implemented this week:

### 🔐 Security & Persistence (Zero-Rollback Initiative)
- **Zero-Rollback System:** Integrated mandatory `saveToDB` calls into critical character state changes (`levelUp`, `changeMap`, `addId`, `drop`).
- **Global Auto-Save Heartbeat:** Implemented a recursive `WorldTimer` that performs a global synchronization of all online characters every 15 minutes.
- **Emergency Shutdown Protocol:** Added a JVM Shutdown Hook to `Start.java` ensuring a synchronous database save of all active sessions during a crash or manual termination.
- **Database Leak Neutralization:** Audited `DatabaseConnection.java` and replaced manual `close()` calls with `try-with-resources` blocks to prevent connection depletion.

### ⚡ Engine & Infrastructure
- **GraalVM Scripting Engine:** Fully synchronized the script engine with GraalVM 24.0.1.
- **ICU Compatibility Fix:** Resolved the `DateFormat` ClassNotFoundException by integrating the correct shadowed GraalVM ICU libraries.
- **Nashorn compatibility Bridge:** Implemented a legacy shim in `AbstractScriptManager` allowing older v117 JavaScripts to operate on modern Graal engines with full HostAccess permissions.
- **Launch_Ultimate System:** Created a centralized `Launch_Ultimate.bat` that manages the Login, Channel, and World servers with optimized JVM parameters and logging.

### 📊 Character & Packet synchronization
- **Ghost AP Fix:** Optimized the `updatePlayerStats` packet structure. Reserved masks (0x4000) now correctly pull from `chr.getRemainingAp()`, eliminating the bug where AP resets to 0.
- **Stat Corruption Resolution:** Corrected the buffer alignment in `CWvsContext.java`. STR/DEX/INT/LUK are now written as **Shorts** (2 bytes) and HP/MP as **Ints** (4 bytes) to match the v117.2 protocol.
- **Multi-Character Support:** Unlocked the character selection limitation, allowing a single account to host and create multiple characters.
- **Native Data Mapping:** Fixed `NativeIntMap` type incompatibilities in `MapleStatEffect.java` to allow for clean compilation.

### 📜 Script-to-Java Bridge (Job Integrity Patch)
- **Global Bridge Standardization:** Standardized the interaction between scripts and the backend for ALL jobs (Aran, Evan, Resistance, etc.).
- **Missing Packet Methods:** Implemented `environmentChange`, `AranTutInstructionalBalloon`, `ShowWZEffect`, and `serverNotice` in the Java source.
- **NoSuchMethod Fallback:** Refactored `NPCScriptManager` to catch `NoSuchMethodException` and automatically redirect missing `start()` calls to the `action()` function, preventing script crashes.
- **Portal Engine Refactor:** Standardized `PortalScriptManager` to use the `AbstractScriptManager` architecture, bringing modern performance and stability to tutorial portals.

### 🎮 Gameplay Authenticity
- **Smart Spawn Logic:** Fixed job advancement maps. Aran now correctly spawns in the Rien tutorial area, and Resistance characters in Edelstein.
- **Tutorial Visuals:** Corrected the `ShowWZEffect` packet writing to ensure instructional bubbles and map effects display accurately for new players.

---
*Project Lead: Nexus Omni*
*Status: Optimized & Stable (v117.2 Standard)*
