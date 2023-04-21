export function TypographyH1(props: { children: React.ReactNode }) {
    const { children } = props;

    return (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {children}
        </h1>
    );
}

export function TypographyH2(props: { children: React.ReactNode }) {
    const { children } = props;

    return (
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            {children}
        </h1>
    );
}

export function TypographyH3(props: { children: React.ReactNode }) {
    const { children } = props;

    return (
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {children}
        </h1>
    );
}

export function TypographyH4(props: { children: React.ReactNode }) {
    const { children } = props;

    return (
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {children}
        </h1>
    );
}

export function TypographyP(props: { children: React.ReactNode }) {
    const { children } = props;

    return <h1 className="leading-7 [&:not(:first-child)]:mt-6">{children}</h1>;
}
