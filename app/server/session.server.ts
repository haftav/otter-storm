import { authenticator } from './auth.server';

export async function getUserSession(request: Request) {
    const user = await authenticator.isAuthenticated(request);

    return user;
}

export async function requireUserSession(request: Request) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: '/login',
    });

    return user;
}
