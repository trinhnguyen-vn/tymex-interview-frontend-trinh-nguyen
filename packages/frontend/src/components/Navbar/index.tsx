'use client';
import React from 'react';
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
import { TypeLanguageValue } from '@/constants/languages';
import { NAV_LINKS } from '@/constants/navbar';
import MobileNavbar from './MobileNavBar';
import ConnectWalletButton from './ConnectWalletButton';
import LanguageSelector from './LanguageSelector';

const Navbar: React.FC = () => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const currentActivePath = usePathname();
    const checkIsActive = (path: string) => currentActivePath === path;

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
                background: 'linear-gradient(90deg, #1A1A2E 0%, #16213E 100%)',
                boxShadow: 'none',

            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', height: '80px', }}>
                {/* Logo */}
                <StyledLink href="/">
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                        MarketPlace
                    </Typography>
                </StyledLink>
                {/* Desktop Navigation */}
                {!isMobile ? (
                    <>
                        <Box sx={{ display: 'flex', gap: 5 }}>
                            {NAV_LINKS.map((link) => (
                                <StyledLink href={link.path} passHref key={link.label} sx={{
                                    textDecoration: 'none',
                                }}>
                                    <Typography sx={{
                                        color: checkIsActive(link.path) ? 'primary.main' : 'text.primary',
                                    }}>{link.label}</Typography>
                                </StyledLink>
                            ))}
                        </Box>

                        <div>
                            <ConnectWalletButton handleConnectWallet={handleConnectWallet} />
                            <LanguageSelector handleSelectLanguage={handleSelectLanguage} />

                        </div>
                    </>
                ) : (
                    // Mobile Navigation
                    <MobileNavbar checkIsActive={checkIsActive} handleConnectWallet={handleConnectWallet} handleSelectLanguage={handleSelectLanguage} />
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;