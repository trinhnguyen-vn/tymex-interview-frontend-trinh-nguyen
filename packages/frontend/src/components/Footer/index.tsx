"use client"
import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { MAIN_BACKGROUND_COLOR } from '@/styles';
import { StyledLink } from '@/styles/Link';
import { NAV_LINKS } from '@/constants/navbar';

const SECURITY_LINKS = [{ path: '/', label: "Security" }, { path: '/', label: "Legal" }, { path: '/', label: "Privacy" }]
const OTHER_LINKS = [{ path: '/faqs', label: "FAQs" }, { path: '/', label: "News" }, { path: '/', label: "Community" }]
const FOOTER_LINKS = [...NAV_LINKS, ...OTHER_LINKS]

const Footer: React.FC = () => {
    const handleSubscribe = (event: React.FormEvent) => {
        event.preventDefault();
        // Add subscription logic here
        console.log('Subscribed with:');
    };

    return (
        <Box
            sx={{
                background: MAIN_BACKGROUND_COLOR,
                color: '#fff',
                py: 4,
                px: 5,
            }}
        >
            <Grid container spacing={3} justifyContent="space-between">
                {/* Navigation Section */}
                <Grid size={{ xs: 12, md: 3, sm: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        NAVIGATION
                    </Typography>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr', gap: "16px 32px", width: 300
                    }}>
                        {FOOTER_LINKS.map(item => (
                            <StyledLink href={item.path} passHref key={item.label}>
                                {item.label}
                            </StyledLink>
                        ))}
                    </Box>
                </Grid>

                {/* Contact Us Section */}
                <Grid size={{ xs: 12, md: 2, sm: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        CONTACT US
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                        <PhoneIcon sx={{ mr: 1 }} />
                        <Typography variant="body2">01234568910</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                        <EmailIcon sx={{ mr: 1 }} />
                        <Typography variant="body2">tymex-talent@tyme.com</Typography>
                    </Box>
                </Grid>

                {/* Subscribe Section */}
                <Grid size={{ xs: 12, md: 3, sm: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        SUBSCRIBE TO RECEIVE OUR LATEST UPDATE
                    </Typography>
                    <form onSubmit={handleSubscribe}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Your email address"
                            sx={{
                                backgroundColor: 'background.default',
                                borderRadius: 1,
                                mb: 2,
                            }}
                            inputProps={{ style: { color: '#000' } }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Subscribe
                        </Button>
                    </form>
                </Grid>
            </Grid>

            <Grid container justifyContent="space-between"
                sx={{ mt: 4, textAlign: 'center', borderTop: '1px solid #333', pt: 2 }}
            >
                <Typography variant="body2" sx={{ color: '#fff', mt: 2 }}>
                    ©2023 Tyme - Edit. All Rights reserved.
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    {SECURITY_LINKS.map(item => (
                        <StyledLink key={item.label} href={item.path} passHref >{item.label}</StyledLink>
                    ))}
                </Box>
            </Grid>
        </Box>
    );
};

export default Footer;