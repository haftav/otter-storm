import * as React from 'react';

type Theme = 'light' | 'dark' | 'system';

const ThemeContext = React.createContext<
    readonly [Theme, (newTheme: Theme) => void] | null
>(null);

export function useTheme() {
    const ctx = React.useContext(ThemeContext);

    if (!ctx) {
        throw new Error(
            'Must call useThemeContext within <ThemeContext.Provider>'
        );
    }

    return ctx;
}

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

function setCookie(theme: Theme) {
    document.cookie = `theme=${theme}`;
}

function updateDocumentClass(theme: Theme) {
    if (theme === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }
}

export const ThemeProvider = (props: {
    children: React.ReactNode;
    value: Theme;
}) => {
    const { value } = props;

    const [theme, setThemeState] = React.useState<Theme>(value);

    const setTheme = (newTheme: Theme) => {
        setCookie(newTheme);

        if (newTheme === 'system') {
            const systemTheme = getSystemTheme();
            updateDocumentClass(systemTheme);
        } else {
            updateDocumentClass(newTheme);
        }

        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {props.children}
        </ThemeContext.Provider>
    );
};
