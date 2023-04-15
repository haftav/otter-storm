import type { LoaderArgs } from '@remix-run/node';
import type { User } from '@/models';

import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getUserSession } from '@/server/session.server';

export async function loader({ request }: LoaderArgs) {
    const user = await getUserSession(request);

    return json({
        user,
    });
}

const LoggedIn = (props: { user: User }) => {
    const { user } = props;

    return (
        <div>
            <div>Logged in as {user.email}</div>
            <form method="post" action="/logout">
                <button>Log Out</button>
            </form>
        </div>
    );
};

const LoggedOut = () => {
    return (
        <div>
            <div>Logged Out</div>
            <Link to="/login">Log In</Link>
        </div>
    );
};

export default function Index() {
    const data = useLoaderData<typeof loader>();

    return (
        <div>{data.user ? <LoggedIn user={data.user} /> : <LoggedOut />}</div>
    );
}
