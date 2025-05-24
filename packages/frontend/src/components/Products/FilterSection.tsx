// add search and filter section
import React, { useCallback, useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    Button,
    Slider,
    Typography,
    styled,
} from '@mui/material';
import { PRODUCT_TIERS, PRODUCT_THEMES } from '@/constants/products';
import { SearchOutlined } from '@mui/icons-material';
import { TypeProduct, TypeSortPrice, TypeTimeFrame } from '@/types';
import useDebounce from '@/hooks/useDebounce';
import { getAllProducts } from '@/api/products';

const CustomSlider = styled(Slider)({
    height: 8,
    '& .MuiSlider-track': {
        background: 'linear-gradient(90deg, #DA458F 0%, #DA34DD 100%)',
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid #DA458F',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
    },
    '& .MuiSlider-valueLabel': {
        background: '#DA458F',
    },
});

type TypeFilterSectionProps = {
    setFilteredProducts: React.Dispatch<React.SetStateAction<TypeProduct[] | null>>;
    isResetFilter: boolean;
    setIsResetFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterSection = ({ setFilteredProducts, isResetFilter, setIsResetFilter }: TypeFilterSectionProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
    const [tier, setTier] = useState('');
    const [timeFrame, setTimeFrame] = useState<TypeTimeFrame>('');
    const [productTheme, setProductTheme] = useState('');
    const [sortPrice, setSortPrice] = useState<TypeSortPrice>('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const handleReset = useCallback(() => {
        setSearchTerm('');
        setPriceRange([0, 100]);
        setTier('');
        setTimeFrame('');
        setSortPrice('');
    }, []);

    const onSearchByTitle = useCallback(async () => {
        try {
            const products = await getAllProducts({
                q: debouncedSearchTerm,
            });
            setFilteredProducts(products);
        } catch (error) {
            console.error(error);
        }
    }, [debouncedSearchTerm, setFilteredProducts])

    const handleSearch = useCallback(async () => {
        try {
            const products = await getAllProducts({
                q: searchTerm,
                price_gte: priceRange[0],
                price_lte: priceRange[1],
                tier,
                theme: productTheme,
                timeFrame,
                sortPrice,
            });
            setFilteredProducts(products);
        } catch (error) {
            console.error(error);
        }
    }, [setFilteredProducts, searchTerm, priceRange, tier, productTheme, timeFrame, sortPrice]);

    useEffect(() => {
        if (debouncedSearchTerm !== '') {
            onSearchByTitle();
        }
    }, [debouncedSearchTerm, onSearchByTitle]);

    useEffect(() => {
        if (isResetFilter) {
            handleReset();
            setIsResetFilter(false)
        }
    }, [isResetFilter, handleReset, setIsResetFilter]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            minWidth: 370,
        }}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="  Quick search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: <SearchOutlined />,
                }}
                sx={{ mb: 1 }}
            />
            <Box sx={{
                display: { xs: 'none', sm: 'flex' },
                flexDirection: 'column', gap: 3

            }}>
                <Box>
                    <Typography color="text.primary" gutterBottom>
                        PRICE RANGE (ETH)
                    </Typography>
                    <CustomSlider
                        value={priceRange}
                        onChange={(_, newValue) => setPriceRange(newValue as number[])}
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                    />
                </Box>

                <Box>
                    <Typography color="text.secondary" gutterBottom>TIER</Typography>
                    <FormControl fullWidth>
                        <Select
                            value={tier}
                            onChange={(e) => setTier(e.target.value)}
                            sx={{
                                '&.Mui-focused': {
                                    borderColor: 'white',
                                },
                            }}

                        >
                            {PRODUCT_TIERS.map((tier) => (
                                <MenuItem key={tier} value={tier}>{tier}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box>
                    <Typography color="text.secondary" gutterBottom>THEME</Typography>
                    <FormControl fullWidth>
                        <Select
                            value={productTheme}
                            onChange={(e) => setProductTheme(e.target.value)}
                        >
                            {PRODUCT_THEMES.map((theme) => (
                                <MenuItem key={theme} value={theme}>{theme}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box>
                    <Typography color="text.secondary" gutterBottom>TIME FRAME</Typography>
                    <FormControl fullWidth>
                        <Select
                            value={timeFrame}
                            onChange={(e) => setTimeFrame(e.target.value)}
                        >
                            <MenuItem value="latest">Latest</MenuItem>
                            <MenuItem value="oldest">Oldest</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box>
                    <Typography color="text.secondary" gutterBottom>SORT BY PRICE</Typography>
                    <FormControl fullWidth>
                        <Select
                            value={sortPrice}
                            onChange={(e) => setSortPrice(e.target.value)}
                        >
                            <MenuItem value="asc">Low to High</MenuItem>
                            <MenuItem value="desc">High to Low</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={handleReset}
                        fullWidth
                        sx={{
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            '&:hover': {
                                borderColor: 'primary.light',
                            },
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        fullWidth
                    >
                        Search
                    </Button>
                </Box>
            </Box>
        </Box >
    );
};

export default FilterSection;
