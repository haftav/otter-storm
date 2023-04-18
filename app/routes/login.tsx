import { SocialsProvider } from 'remix-auth-socials';

import { Button } from '@/ui/button';

interface SocialButtonProps {
    provider: SocialsProvider;
    label: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, label }) => (
    <form action={`/auth/${provider}`} method="post">
        <Button>{label}</Button>
    </form>
);

export default function Login() {
    return (
        <div>
            <SocialButton
                provider={SocialsProvider.GOOGLE}
                label="Login with Google"
            />
        </div>
    );
}
