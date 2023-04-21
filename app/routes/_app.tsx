import type { LoaderArgs } from '@remix-run/node';
import type { User } from '@/models';

import { Outlet } from '@remix-run/react';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { Menu } from 'lucide-react';

import { Button } from '@/ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/ui/drawer';

import { Theme, ChooseTheme, useTheme } from '@/components/theme';

import { getUserSession } from '@/server/session.server';
import { Separator } from '@/ui/separator';

export async function loader({ request }: LoaderArgs) {
    const user = await getUserSession(request);

    return json({
        user,
    });
}

const LoggedIn = () => {
    return (
        <>
            <form method="post" action="/logout">
                <Button>Log Out</Button>
            </form>
        </>
    );
};

const LoggedOut = () => {
    return (
        <div>
            <Link to="/login">
                <Button>Log In</Button>
            </Link>
        </div>
    );
};

export default function AppLayout() {
    const data = useLoaderData<typeof loader>();

    const [theme, setTheme] = useTheme();

    return (
        <div>
            <header className="h-20 w-full border-b shadow-sm z-10 bg-background flex justify-between items-center fixed top-0 px-4">
                <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Clonist
                </h1>
                <Drawer>
                    <DrawerContent position="top" size="content">
                        <DrawerHeader>
                            <DrawerTitle>Clonist</DrawerTitle>
                        </DrawerHeader>
                        <Separator className="my-6" />
                        <div className="h-24">
                            {data.user ? <div>{data.user.email}</div> : null}
                        </div>
                        <Separator className="my-6" />
                        <DrawerFooter>
                            <div className="flex w-full justify-between">
                                {data.user ? <LoggedIn /> : <LoggedOut />}
                                <ChooseTheme
                                    theme={theme}
                                    onThemeChange={setTheme}
                                />
                            </div>
                        </DrawerFooter>
                    </DrawerContent>
                    <DrawerTrigger asChild>
                        <Button variant="ghost">
                            <Menu />
                        </Button>
                    </DrawerTrigger>
                </Drawer>
            </header>
            <main className="pt-20">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
