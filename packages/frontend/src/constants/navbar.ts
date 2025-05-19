interface NavLink {
    label: string;
    path: string;
}

export const NAV_LINKS: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'About us', path: '/about' },
    { label: 'Our teams', path: '/teams' },
    { label: 'Marketplace', path: '/marketplace' },
    { label: 'Roadmap', path: '/roadmap' },
    { label: 'Whitepaper', path: '/whitepaper' },
];