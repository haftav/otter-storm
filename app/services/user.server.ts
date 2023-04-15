import { db } from '@/server/db.server';

export async function findUserByEmail(email: string) {
    return await db
        .selectFrom('app_user')
        .selectAll()
        .where('email', '=', email)
        .executeTakeFirst();
}

export async function createUser(email: string) {
    return await db
        .insertInto('app_user')
        .values({ email })
        .returningAll()
        .executeTakeFirstOrThrow();
}
