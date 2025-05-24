import { getApiHostUrl } from '..';

describe('getApiHostUrl', () => {
    it('returns the value of NEXT_PUBLIC_API_HOST_URL', () => {
        process.env.NEXT_PUBLIC_API_HOST_URL = 'https://api.example.com';
        expect(getApiHostUrl()).toBe('https://api.example.com');
    });

    it('returns undefined if NEXT_PUBLIC_API_HOST_URL is not set', () => {
        delete process.env.NEXT_PUBLIC_API_HOST_URL;
        expect(getApiHostUrl()).toBeUndefined();
    });
});