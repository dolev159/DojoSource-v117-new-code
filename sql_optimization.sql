-- ============================================================
-- SQL OPTIMIZATION PATCH for DojoSource v117
-- Generated: 2026-03-07
-- Purpose: Improve query performance, fix engine types,
--          add missing indexes, and optimize data types.
-- ============================================================
-- IMPORTANT: Back up your database before running this script!
-- Run this AFTER importing judoms.sql
-- ============================================================

-- ============================================================
-- 1. CONVERT MyISAM TABLES TO InnoDB
-- MyISAM does NOT support row-level locking or transactions.
-- InnoDB is much better for concurrent read/write (game server).
-- ============================================================

ALTER TABLE `auth_server_channel_ip` ENGINE = InnoDB;
ALTER TABLE `cashshop_limit_sell` ENGINE = InnoDB;
ALTER TABLE `cashshop_modified_items` ENGINE = InnoDB;
ALTER TABLE `cheatlog` ENGINE = InnoDB;
ALTER TABLE `cmsbcomments` ENGINE = InnoDB;
ALTER TABLE `cmsecomments` ENGINE = InnoDB;
ALTER TABLE `cmsevents` ENGINE = InnoDB;
ALTER TABLE `cmsgdcache` ENGINE = InnoDB;
ALTER TABLE `cmsgmblog` ENGINE = InnoDB;
ALTER TABLE `cmsncomments` ENGINE = InnoDB;
ALTER TABLE `cmsnews` ENGINE = InnoDB;
ALTER TABLE `cmsprofile` ENGINE = InnoDB;
ALTER TABLE `cmsvote` ENGINE = InnoDB;
ALTER TABLE `cmsvotingrecords` ENGINE = InnoDB;
ALTER TABLE `drop_data` ENGINE = InnoDB;
ALTER TABLE `drop_data_global` ENGINE = InnoDB;
ALTER TABLE `hyperrocklocations` ENGINE = InnoDB;
ALTER TABLE `nxcode` ENGINE = InnoDB;

-- macbans uses MEMORY engine (RAM only, lost on restart)
-- Convert to InnoDB for persistence
ALTER TABLE `macbans` ENGINE = InnoDB;

-- ============================================================
-- 2. ADD MISSING INDEXES ON HIGH-TRAFFIC TABLES
-- These are the most queried tables during gameplay.
-- ============================================================

-- 2a. inventoryitems - Missing characterid single-column index
-- The query in ItemLoader.java uses: WHERE type = ? AND characterid = ?
-- There is a composite index (characterid, inventorytype) but no
-- single-column characterid index for DELETE operations.
ALTER TABLE `inventoryitems` ADD INDEX `idx_characterid` (`characterid`);

-- 2b. inventoryitems - Add composite index for type + characterid
-- This covers the most common query pattern in ItemLoader
ALTER TABLE `inventoryitems` ADD INDEX `idx_type_characterid` (`type`, `characterid`);

-- 2c. inventoryitems - Add composite index for type + accountid (Storage)
ALTER TABLE `inventoryitems` ADD INDEX `idx_type_accountid` (`type`, `accountid`);

-- 2d. bosslog - Add indexes for frequent lookups
ALTER TABLE `bosslog` ADD INDEX `idx_characterid` (`characterid`);
ALTER TABLE `bosslog` ADD INDEX `idx_accountid_bossid` (`accountid`, `bossid`);

-- 2e. familiars - Add index on characterid for loading
ALTER TABLE `familiars` ADD INDEX `idx_characterid` (`characterid`);

-- 2f. inner_ability_skills - Add index on player_id for loading
ALTER TABLE `inner_ability_skills` ADD INDEX `idx_player_id` (`player_id`);

-- 2g. extendedslots - Add index on characterid
ALTER TABLE `extendedslots` ADD INDEX `idx_characterid` (`characterid`);

-- 2h. questinfo - Add composite index (characterid, quest)
ALTER TABLE `questinfo` ADD INDEX `idx_char_quest` (`characterid`, `quest`);

-- 2i. queststatus - Add composite index (characterid, quest)
ALTER TABLE `queststatus` ADD INDEX `idx_char_quest` (`characterid`, `quest`);

-- 2j. hiredmerch - Add indexes for lookups
ALTER TABLE `hiredmerch` ADD INDEX `idx_characterid` (`characterid`);
ALTER TABLE `hiredmerch` ADD INDEX `idx_accountid` (`accountid`);

-- 2k. dueypackages - Add index on RecieverId
ALTER TABLE `dueypackages` ADD INDEX `idx_receiverid` (`RecieverId`);

-- 2l. bbs_replies - Add indexes for thread lookups
ALTER TABLE `bbs_replies` ADD INDEX `idx_threadid` (`threadid`);
ALTER TABLE `bbs_replies` ADD INDEX `idx_guildid` (`guildid`);

-- 2m. bbs_threads - Add index on guildid
ALTER TABLE `bbs_threads` ADD INDEX `idx_guildid` (`guildid`);

-- 2n. gmlog - Add index on cid for GM command history
ALTER TABLE `gmlog` ADD INDEX `idx_cid` (`cid`);

-- 2o. internlog - Add index on cid
ALTER TABLE `internlog` ADD INDEX `idx_cid` (`cid`);

-- 2p. guildskills - Add index on guildid
ALTER TABLE `guildskills` ADD INDEX `idx_guildid` (`guildid`);

-- 2q. hyperrocklocations - Add index on characterid
ALTER TABLE `hyperrocklocations` ADD INDEX `idx_characterid` (`characterid`);

-- 2r. iplog - Add index on accid for lookups
ALTER TABLE `iplog` ADD INDEX `idx_accid` (`accid`);

-- 2s. drop_data - Add composite index for faster mob lookups
ALTER TABLE `drop_data` ADD INDEX `idx_dropper_item` (`dropperid`, `itemid`);

-- 2t. mts_items - Add index on characterid
ALTER TABLE `mts_items` ADD INDEX `idx_characterid` (`characterid`);

-- ============================================================
-- 3. REMOVE REDUNDANT / DUPLICATE INDEXES
-- An index on PRIMARY KEY column alone is redundant.
-- ============================================================

-- accounts: KEY `id` (`id`) is redundant with PRIMARY KEY (`id`)
ALTER TABLE `accounts` DROP INDEX `id`;

-- androids: KEY `uniqueid` is redundant with PRIMARY KEY
ALTER TABLE `androids` DROP INDEX `uniqueid`;

-- buddies: KEY `id` (`id`) is redundant with PRIMARY KEY
ALTER TABLE `buddies` DROP INDEX `id`;

-- character_slots: KEY `id` is redundant with PRIMARY KEY
ALTER TABLE `character_slots` DROP INDEX `id`;

-- characters: KEY `id` is redundant with PRIMARY KEY
ALTER TABLE `characters` DROP INDEX `id`;

-- families: KEY `familyid` is redundant with PRIMARY KEY
ALTER TABLE `families` DROP INDEX `familyid`;

-- guilds: KEY `guildid` is redundant with PRIMARY KEY
ALTER TABLE `guilds` DROP INDEX `guildid`;

-- imps: KEY `impid` is redundant with PRIMARY KEY
ALTER TABLE `imps` DROP INDEX `impid`;

-- inventoryslot: KEY `id` is redundant with PRIMARY KEY
ALTER TABLE `inventoryslot` DROP INDEX `id`;

-- mts_cart: KEY `id` is redundant with PRIMARY KEY
ALTER TABLE `mts_cart` DROP INDEX `id`;

-- monsterbook: KEY `id` is redundant with PRIMARY KEY
ALTER TABLE `monsterbook` DROP INDEX `id`;

-- mountdata: KEY `id` is redundant with PRIMARY KEY
ALTER TABLE `mountdata` DROP INDEX `id`;

-- pets: KEY `petid` is redundant with PRIMARY KEY
ALTER TABLE `pets` DROP INDEX `petid`;

-- queststatus: KEY `queststatusid` is redundant with PRIMARY KEY
ALTER TABLE `queststatus` DROP INDEX `queststatusid`;

-- ============================================================
-- 4. CHARACTER SET OPTIMIZATION
-- Convert from latin1 to utf8mb4 for proper Unicode support
-- (player names with special characters, chat messages, etc.)
-- ============================================================

ALTER TABLE `accounts` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `characters` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `guilds` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `alliances` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `notes` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ============================================================
-- 5. InnoDB BUFFER POOL & CONFIGURATION RECOMMENDATIONS
-- Add these to your MySQL my.cnf / my.ini configuration file:
-- ============================================================
-- [mysqld]
-- # Buffer pool: Set to 50-70% of available RAM
-- innodb_buffer_pool_size = 512M
--
-- # Log file size: Larger = fewer checkpoints = better write perf
-- innodb_log_file_size = 128M
--
-- # Flush method: Use O_DIRECT to avoid double-buffering
-- innodb_flush_method = O_DIRECT
--
-- # Flush at commit: 2 = flush once per second (faster, tiny risk)
-- innodb_flush_log_at_trx_commit = 2
--
-- # Thread concurrency: 0 = let InnoDB decide
-- innodb_thread_concurrency = 0
--
-- # Query cache: Disable for write-heavy workloads (game servers)
-- query_cache_type = 0
-- query_cache_size = 0
--
-- # Connection pool: Match your server's max player capacity
-- max_connections = 300
--
-- # Slow query log: Enable to find bottlenecks
-- slow_query_log = 1
-- slow_query_log_file = /var/log/mysql/slow.log
-- long_query_time = 1
-- ============================================================

-- ============================================================
-- 6. OPTIMIZE TABLES (defragment and reclaim space)
-- Run this periodically (e.g., during maintenance windows)
-- ============================================================

OPTIMIZE TABLE `accounts`;
OPTIMIZE TABLE `characters`;
OPTIMIZE TABLE `inventoryitems`;
OPTIMIZE TABLE `inventoryequipment`;
OPTIMIZE TABLE `queststatus`;
OPTIMIZE TABLE `questinfo`;
OPTIMIZE TABLE `keymap`;
OPTIMIZE TABLE `buddies`;
OPTIMIZE TABLE `famelog`;
OPTIMIZE TABLE `familiars`;
OPTIMIZE TABLE `monsterbook`;
OPTIMIZE TABLE `drop_data`;

-- ============================================================
-- Done! Your database is now optimized for better performance.
-- ============================================================
