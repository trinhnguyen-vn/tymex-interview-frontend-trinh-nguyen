'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
    AppBar,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
    Box,
} from '@mui/material';
import { StyledLink } from '@/styles/Link';
import { TypeLanguageValue } from '@/types';
import { NAV_LINKS } from '@/constants/navbar';
import MobileNavbar from './MobileNavBar';
import ConnectWalletButton from '@/components/Wallets/ConnectWalletButton';
import LanguageSelector from './LanguageSelector';
import { MAIN_BACKGROUND_COLOR } from '@/styles';

const Navbar: React.FC = () => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const currentActivePath = usePathname();
    const checkIsActive = (path: string) => currentActivePath === path;
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleConnectWallet = () => {
        // wallet connection logic here
        console.log('Connecting wallet...');
        router.push('/wallet');
    };

    const handleSelectLanguage = (language: TypeLanguageValue) => {
        console.log('Selecting language...', language);
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                background: MAIN_BACKGROUND_COLOR,
                borderBottom: scrolled ? `3px solid ${theme.palette.primary.main}` : 'none',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', height: '80px', }}>
                {/* Logo */}
                <StyledLink href="/">
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                        MarketPlace
                    </Typography>
                </StyledLink>

                {isMobile ? (
                    // Mobile Navigation
                    <MobileNavbar checkIsActive={checkIsActive} handleConnectWallet={handleConnectWallet} handleSelectLanguage={handleSelectLanguage} />
                ) : (
                    <>
                        {/* Desktop Navigation  */}
                        <Box sx={{ display: 'flex', gap: 5 }} data-testid="desktop-navbar">
                            {NAV_LINKS.map((link) => (
                                <StyledLink href={link.path} passHref key={link.label} sx={{
                                    color: checkIsActive(link.path) ? 'primary.main' : 'text.primary', textTransform: "uppercase"
                                }}>
                                    {link.label}
                                </StyledLink>
                            ))}
                        </Box>

                        <div>
                            <ConnectWalletButton handleConnectWallet={handleConnectWallet} />
                            <LanguageSelector handleSelectLanguage={handleSelectLanguage} />

                        </div>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;