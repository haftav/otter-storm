import * as React from 'react';

function getTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

export default function useTheme() {
    const [theme, setTheme] = React.useState(() => getTheme());

    const toggle = () => {
        if (theme === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setTheme('dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setTheme('light');
        }
    };

    return [theme, toggle] as const;
}
