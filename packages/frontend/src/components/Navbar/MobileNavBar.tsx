'use client';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NAV_LINKS } from '@/constants/navbar';
import ConnectWalletButton from '../Wallets/ConnectWalletButton';
import LanguageSelector from './LanguageSelector';
import { TypeLanguageValue } from '@/types';

const MobileNavbar: FC<{ handleConnectWallet: () => void; handleSelectLanguage: (language: TypeLanguageValue) => void; checkIsActive: (path: string) => boolean }> = ({ handleConnectWallet, handleSelectLanguage, checkIsActive }) => {
    const router = useRouter();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return <div data-testid="mobile-navbar">
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
                        key={link.label}
                        component="button"
                        onClick={() => {
                            router.push(link.path);
                            setMobileOpen(false);
                        }}
                        sx={{
                            color: theme.palette.text.primary,
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
    </div>

}
export default MobileNavbar;