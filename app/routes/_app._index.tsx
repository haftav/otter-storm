import type { LoaderArgs } from '@remix-run/node';

import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';

import { getUserSession } from '@/server/session.server';

import { Button } from '@/ui/button';

export async function loader({ request }: LoaderArgs) {
    const user = await getUserSession(request);

    return json({
        user,
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
        <div className="flex justify-center">
            {data.user ? `Welcome back, ${data.user.email}!` : <Login />}
        </div>
    );
}
