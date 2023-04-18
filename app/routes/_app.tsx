import type { LoaderArgs } from '@remix-run/node';
import type { User } from '@/models';

import { Outlet } from '@remix-run/react';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { Button } from '@/ui/button';

import { useTheme } from '@/components/theme-provider';

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
        <>
            <div>Logged in as {user.email}</div>
            <form method="post" action="/logout">
                <Button>Log Out</Button>
            </form>
        </>
    );
};

const LoggedOut = () => {
    return (
        <>
            <div>Logged Out</div>
            <Link to="/login">
                <Button>Log In</Button>
            </Link>
        </>
    );
};

export default function AppLayout() {
    const data = useLoaderData<typeof loader>();

    const [theme, setTheme] = useTheme();
    console.log(theme);

    return (
        <div className="dark:bg-slate-900">
            <h1>{theme}</h1>
            <select
                defaultValue={theme}
                onChange={(e) => {
                    setTheme(e.target.value);
                }}
            >
                <option>light</option>
                <option>dark</option>
                <option>system</option>
            </select>
            <header className="h-16 flex items-center">
                {data.user ? <LoggedIn user={data.user} /> : <LoggedOut />}
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
