'use client';
import React, { FC, useState } from 'react';
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { LANGUAGES, TypeLanguageValue } from '@/constants/languages';
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
            <Box
                sx={{
                    backgroundColor: "background.default",
                    borderRadius: 1,
                }}
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

                ))}   </Box>  </Menu>
    </>
}

export default LanguageSelector;
