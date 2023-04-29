import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

import type { CreateJobData } from '@/services/job.service';
import { jobSchema, createJob } from '@/services/job.service';

import { Button } from '@/ui/button';
import { requireUserSession } from '@/server/session.server';
import { redirect } from 'react-router';

function validate(data: Record<string, unknown>): data is CreateJobData {
    const result = jobSchema.safeParse(data);

    if (!result.success) {
        return false;
    }

    return true;
}

export async function action({ request }: ActionArgs) {
    await requireUserSession(request);

    const rawData = await request.formData();

    const data = Object.fromEntries(rawData);

    if (!validate(data)) {
        return json({
            error: true,
        });
    }

    return createJob(data)
        .then(() => {
            return redirect('/');
        })
        .catch(() => {
            return json({
                error: true,
            });
        });
}

export default function CreateJob() {
    return (
        <form method="post">
            <div>
                <label htmlFor="title">Title</label>
                <input name="title" id="title" required />
            </div>
            <div>
                <label htmlFor="company">Company</label>
                <input name="company" id="company" required />
            </div>
            <div>
                <label htmlFor="location">Location</label>
                <input name="location" id="location" required />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" />
            </div>
            <div>
                <label htmlFor="type">Type</label>
                <select name="type" id="type" required>
                    <option value="in_person">In Person</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="remote">Remote</option>
                </select>
            </div>
            <div>
                <Button type="submit">Create Job Posting</Button>
            </div>
        </form>
    );
}
