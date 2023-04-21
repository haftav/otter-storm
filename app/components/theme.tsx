import * as React from 'react';

export type Theme = 'light' | 'dark' | 'system';

export function isTheme(maybeTheme?: string): maybeTheme is Theme {
    if (!maybeTheme) {
        return false;
    }

    return (
        maybeTheme === 'light' ||
        maybeTheme === 'dark' ||
        maybeTheme === 'system'
    );
}

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

export const ThemeScript = (props: { initialTheme: string | null }) => {
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

interface ChooseThemeProps {
    theme: Theme;
    onThemeChange: (newTheme: Theme) => void;
}

export const ChooseTheme = (props: ChooseThemeProps) => {
    const { theme, onThemeChange } = props;
    return (
        <div>
            <label htmlFor="choose-theme">Theme</label>
            <select
                id="choose-theme"
                className="block"
                defaultValue={theme}
                onChange={(e) => {
                    onThemeChange(e.target.value as Theme);
                }}
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
            </select>
        </div>
    );
};
