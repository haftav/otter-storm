import type { LoaderArgs } from '@remix-run/node';

import * as React from 'react';
import { Outlet, useLocation, useNavigation } from '@remix-run/react';
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

function useCloseOnNavigate(closeMenu: () => void) {
    const location = useLocation();

    React.useEffect(() => {
        closeMenu();
    }, [location, closeMenu]);
}

export default function AppLayout() {
    const data = useLoaderData<typeof loader>();

    const [theme, setTheme] = useTheme();

    const [isOpen, setIsOpen] = React.useState(false);

    useCloseOnNavigate(React.useCallback(() => setIsOpen(false), []));

    return (
        <div>
            <header className="h-20 w-full border-b shadow-sm z-10 bg-background flex justify-between items-center fixed top-0 px-4">
                <Link to="/">
                    <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Clonist
                    </h1>
                </Link>
                <Drawer
                    open={isOpen}
                    onOpenChange={(isOpen) => setIsOpen(isOpen)}
                >
                    <DrawerContent position="top" size="content">
                        <DrawerHeader>
                            <DrawerTitle>Clonist</DrawerTitle>
                        </DrawerHeader>
                        <Separator className="my-6" />
                        <div>
                            <div>
                                <Link to="/" className="text-lg">
                                    Home
                                </Link>
                            </div>
                            <div>
                                <Link to="job/create" className="text-lg">
                                    Add job
                                </Link>
                            </div>
                        </div>
                        <Separator className="my-6" />
                        <DrawerFooter>
                            <div className="h-16">
                                {data.user ? (
                                    <div>{data.user.email}</div>
                                ) : null}
                            </div>
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
