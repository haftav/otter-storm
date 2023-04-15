import type { ActionArgs } from '@remix-run/node';

import { redirect } from '@remix-run/node';

import { authenticator } from '@/server/auth.server';

export let loader = () => redirect('/login');

export let action = ({ request, params }: ActionArgs) => {
    return authenticator.authenticate(params.provider as string, request, {
        successRedirect: '/',
        failureRedirect: '/login',
    });
};
