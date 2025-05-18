interface NavLink {
    label: string;
    path: string;
}

export const NAV_LINKS: NavLink[] = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT US', path: '/about' },
    { label: 'OUR TEAMS', path: '/teams' },
    { label: 'MARKETPLACE ROADMAP', path: '/roadmap' },
    { label: 'WHITEPAPER', path: '/whitepaper' },
];