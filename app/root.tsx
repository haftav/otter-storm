import * as React from 'react';
import { json, LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react';

import { parseTheme } from '@/lib/cookie.server';

import { ThemeProvider, ThemeScript, Theme, isTheme } from '@/components/theme';

import styles from './tailwind.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Classical Stack',
    viewport: 'width=device-width,initial-scale=1',
});

export async function loader({ request }: LoaderArgs) {
    const cookies = request.headers.get('Cookie');
    const themeData = parseTheme(cookies);

    const theme: Theme = themeData && isTheme(themeData) ? themeData : 'system';

    return json({
        theme,
    });
}

export default function App() {
    const { theme } = useLoaderData<typeof loader>();

    return (
        <html
            lang="en"
            className={theme === 'dark' ? 'dark' : ''}
            suppressHydrationWarning
        >
            <head>
                <ThemeScript initialTheme={theme} />
                <Meta />
                <Links />
            </head>
            <body className="bg-background">
                <ThemeProvider value={theme}>
                    <Outlet />
                </ThemeProvider>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
