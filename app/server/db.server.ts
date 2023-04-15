import type { DB } from 'kysely-codegen';

import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

let db: Kysely<DB>;

declare global {
    var __db: any;
}

if (process.env.NODE_ENV === 'production') {
    db = new Kysely<DB>({
        dialect: new PostgresDialect({
            pool: new Pool({
                connectionString: process.env.DATABASE_URL,
            }),
        }),
        log: ['error'],
    });
} else {
    if (!global.__db) {
        db = new Kysely<DB>({
            dialect: new PostgresDialect({
                pool: new Pool({
                    connectionString: process.env.DATABASE_URL,
                }),
            }),
            log: ['query', 'error'],
        });
        global.__db = db;
    }
    db = global.__db;
}

export { db };
