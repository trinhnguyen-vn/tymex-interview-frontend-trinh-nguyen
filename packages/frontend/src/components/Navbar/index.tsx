'use client';
import React, { FC, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme,
    Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { StyledLink } from '@/styles/Link';
import { LANGUAGES, TypeLanguageValue } from '@/constants/languages';

interface NavLink {
    label: string;
    path: string;
}

const NAV_LINKS: NavLink[] = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT US', path: '/about' },
    { label: 'OUR TEAMS', path: '/teams' },
    { label: 'MARKETPLACE ROADMAP', path: '/roadmap' },
    { label: 'WHITEPAPER', path: '/whitepaper' },
];

const MobileNavbar: FC<{ handleConnectWallet: () => void; handleSelectLanguage: (language: string) => void; checkIsActive: (path: string) => boolean }> = ({ handleConnectWallet, handleSelectLanguage, checkIsActive }) => {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return <>
        <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ color: '#fff' }}
        >
            <MenuIcon />
        </IconButton>
        <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
                '& .MuiDrawer-paper': {
                    backgroundColor: '#1A1A2E',
                    color: '#fff',
                },
            }}
        >
            <List>
                {NAV_LINKS.map((link) => (
                    <ListItem
                        button
                        key={link.label}
                        onClick={() => {
                            router.push(link.path);
                            setMobileOpen(false);
                        }}
                        sx={{
                            backgroundColor: checkIsActive(link.path) ? 'primary.main' : 'transparent',
                        }}
                    >
                        <ListItemText primary={link.label} />
                    </ListItem>
                ))}
                <ListItem>
                    <ConnectWalletButton handleConnectWallet={handleConnectWallet} />
                </ListItem>
                <ListItem>
                    <LanguageSelector handleSelectLanguage={handleSelectLanguage} />
                </ListItem>
            </List>
        </Drawer>
    </>

}

const ConnectWalletButton: FC<{ handleConnectWallet: () => void }> = ({ handleConnectWallet }) => {
    return <Button
        variant="contained"
        onClick={handleConnectWallet}
    >
        Connect Wallet
    </Button>
}


const LanguageSelector: FC<{ handleSelectLanguage: (language: TypeLanguageValue) => void }> = ({ handleSelectLanguage }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLanguageMenuClose = () => {
        setAnchorEl(null);
    };
    return <>
        <IconButton
            sx={{ color: '#fff' }}
            onClick={handleLanguageMenuOpen}
        >
            <LanguageIcon />
            <ArrowDropDownIcon />
        </IconButton>
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleLanguageMenuClose}
        >
            {LANGUAGES.map((language) => (
                <MenuItem
                    key={language.value}
                    onClick={() => {
                        handleLanguageMenuClose();
                        handleSelectLanguage(language.value)
                    }}
                    sx={{ color: language.value === 'en' ? 'primary.main' : 'text.secondary', fontWeight: language.value === 'en' ? 'bold' : 'normal', }}
                >
                    {language.label}
                </MenuItem>
            ))}     </Menu>
    </>
}

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