import type { LoaderArgs } from '@remix-run/node';

import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';

import { getUserSession } from '@/server/session.server';

import { Button } from '@/ui/button';
import { getAllJobs } from '@/services/job.service';
import { Card } from '@/ui/card';

export async function loader({ request }: LoaderArgs) {
    const user = await getUserSession(request);

    const jobs = await getAllJobs();

    return json({
        user,
        jobs,
    });
}

const Login = () => {
    return (
        <Link to="/login">
            <Button className="w-24">Log In</Button>
        </Link>
    );
};

export default function Index() {
    const data = useLoaderData<typeof loader>();

    return (
        <div className="flex flex-col justify-center items-center">
            {data.user ? `Welcome back, ${data.user.email}!` : <Login />}

            {data.jobs.map((job) => (
                <Link key={job.id} to={`/job/${job.id}`}>
                    <Card>
                        <h3>{job.title}</h3>
                        <span>{job.company}</span>, <span>{job.location}</span>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
