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

import { ThemeProvider } from '@/components/theme-provider';

import styles from './tailwind.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Classical Stack',
    viewport: 'width=device-width,initial-scale=1',
});

type Theme = 'light' | 'dark' | 'system';

function isTheme(maybeTheme?: string): maybeTheme is Theme {
    if (!maybeTheme) {
        return false;
    }

    return (
        maybeTheme === 'light' ||
        maybeTheme === 'dark' ||
        maybeTheme === 'system'
    );
}

export async function loader({ request }: LoaderArgs) {
    const cookies = request.headers.get('Cookie');
    const themeData = parseTheme(cookies);

    const theme: Theme = themeData && isTheme(themeData) ? themeData : 'system';

    return json({
        theme,
    });
}

const ThemeScript = (props: { initialTheme: string | null }) => {
    const { initialTheme } = props;

    let script = React.useMemo(
        () => `
      let colorScheme = ${JSON.stringify(initialTheme)};
      if (colorScheme === "system") {
        let media = window.matchMedia("(prefers-color-scheme: dark)")
        if (media.matches) document.documentElement.classList.add("dark");
      }
    `,
        [] // eslint-disable-line
        // we don't want this script to ever change
    );

    return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

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
            <body className="dark:bg-slate-900">
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
