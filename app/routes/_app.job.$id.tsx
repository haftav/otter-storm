import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getJobById } from '@/services/job.service';

export async function loader({ params }: LoaderArgs) {
    const id = params.id as string;
    const job = await getJobById(Number(id));

    if (!job) {
        throw new Response('Job not found', {
            status: 404,
        });
    }

    return json({
        job,
        error: null,
    });
}

export default function JobDetail() {
    const data = useLoaderData<typeof loader>();

    return (
        <div>
            <h1>{data.job.title}</h1>
            <div>{data.job.company}</div>
            <div>{data.job.type}</div>
            <div>{data.job.location}</div>
            <p>{data.job.description}</p>
        </div>
    );
}
