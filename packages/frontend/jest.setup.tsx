import '@testing-library/jest-dom';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
        text: () => Promise.resolve(''),
    })
) as jest.Mock;

jest.mock('next/navigation', () => ({
    usePathname: () => '/',
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    }),
}));


