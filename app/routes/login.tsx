import type { LoaderArgs } from '@remix-run/node';

import { redirect } from '@remix-run/node';
import { SocialsProvider } from 'remix-auth-socials';

import { Button } from '@/ui/button';

import { getUserSession } from '@/server/session.server';

interface SocialButtonProps {
    provider: SocialsProvider;
    label: string;
}

export async function loader({ request }: LoaderArgs) {
    const user = await getUserSession(request);

    if (user) {
        return redirect('/');
    }

    return null;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, label }) => (
    <form action={`/auth/${provider}`} method="post" className="w-full">
        <Button variant="outline" className="w-full">
            {label}
        </Button>
    </form>
);

export default function Login() {
    return (
        <div className="w-full p-8 flex flex-col">
            <div>
                <h1 className="scroll-m-20 text-xl font-semibold tracking-tight mb-6">
                    Log in
                </h1>
            </div>
            <SocialButton
                provider={SocialsProvider.GOOGLE}
                label="Continue with Google"
            />
        </div>
    );
}
