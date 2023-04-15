import type { LoaderArgs } from '@remix-run/node';

import { authenticator } from '@/server/auth.server';

export let loader = ({ request, params }: LoaderArgs) => {
    return authenticator.authenticate(params.provider as string, request, {
        successRedirect: '/',
        failureRedirect: '/login',
    });
};
