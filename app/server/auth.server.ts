import { Authenticator } from 'remix-auth';
import { GoogleStrategy, SocialsProvider } from 'remix-auth-socials';

import { sessionStorage } from '@/lib/cookie.server';

import { createUser, findUserByEmail } from '@/services/user.server';

import { getDomain } from '@/utils';

interface User {
    id: number;
    email: string;
}

export const authenticator = new Authenticator<User>(sessionStorage);

const getCallback = (provider: SocialsProvider) => {
    return `${getDomain()}/auth/${provider}/callback`;
};

authenticator.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: getCallback(SocialsProvider.GOOGLE),
        },
        async ({ profile }) => {
            const data = profile._json;
            const { email } = data;

            let user = await findUserByEmail(email);

            if (!user) {
                user = await createUser(email);
            }

            return user;
        }
    )
);
