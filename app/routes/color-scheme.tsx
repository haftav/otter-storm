import { createCookie } from '@remix-run/node';

let cookie = createCookie('color-scheme', {
    maxAge: 34560000,
    sameSite: 'lax',
});

export async function parseColorScheme(request: Request) {
    const header = request.headers.get('Cookie');
    const vals = await cookie.parse(header);
    return vals ? vals.colorScheme : 'system';
}

export const action = () => {};
