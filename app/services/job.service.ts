import { z } from 'zod';

import { db } from '@/server/db.server';

export const jobSchema = z.object({
    title: z.string().min(1),
    company: z.string().min(1),
    location: z.string().min(1),
    description: z.string(),
    type: z.enum(['remote', 'hybrid', 'in_person']),
});

export type CreateJobData = z.infer<typeof jobSchema>;
export type UpdateJobData = z.infer<typeof jobSchema>;

export async function createJob(data: CreateJobData) {
    return await db
        .insertInto('job')
        .values(data)
        .returning('id')
        .executeTakeFirstOrThrow();
}

export async function updateJob(id: number, data: UpdateJobData) {
    return await db
        .updateTable('job')
        .set(data)
        .where('job.id', '=', id)
        .executeTakeFirstOrThrow();
}

export async function getAllJobs() {
    return await db.selectFrom('job').selectAll().execute();
}

export async function getJobById(id: number) {
    return await db
        .selectFrom('job')
        .selectAll()
        .where('job.id', '=', id)
        .executeTakeFirst();
}

export async function deleteJob(id: number) {
    return await db
        .deleteFrom('job')
        .where('job.id', '=', id)
        .executeTakeFirstOrThrow();
}
