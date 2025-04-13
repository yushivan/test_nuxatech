import Cookies from 'js-cookie';

export const setCookiesUser = (token: string, email: string) => {
    try {
        Cookies.set('access_token', token);
        Cookies.set('email', email);
    } catch (error) {
        console.error('Invalid token:', error);
        Cookies.remove('access_token');
        Cookies.remove('email');
    }
};

export const removeCookiesUser = () => {
    Cookies.remove('access_token');
    Cookies.remove('email');
};