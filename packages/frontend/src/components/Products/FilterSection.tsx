import { useCallback, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { getAllProducts } from '@/api/products';
import { useFilterProducts } from '@/hooks/useFilterProducts';
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
import { TypeProduct } from '@/types';
import { MAIN_COLOR } from '@/styles';

const CustomSlider = styled(Slider)({
    height: 8,
    '& .MuiSlider-track': {
        background: MAIN_COLOR,
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

interface FilterSectionProps {
    setFilteredProducts: (products: TypeProduct[] | null) => void;
    isResetFilter: boolean;
    setIsResetFilter: (value: boolean) => void;
    resetFilterByCategory: () => void;
}

const FilterSection = ({ setFilteredProducts, isResetFilter, setIsResetFilter, resetFilterByCategory }: FilterSectionProps) => {
    const {
        searchTerm,
        priceRange,
        tier,
        timeFrame,
        productTheme,
        sortPrice,
        setSearchTerm,
        setPriceRange,
        setTier,
        setTimeFrame,
        setProductTheme,
        setSortPrice,
        resetFilters,
    } = useFilterProducts();
    const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

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
            resetFilterByCategory()
            setFilteredProducts(products);
        } catch (error) {
            console.error(error);
        }
    }, [setFilteredProducts, resetFilterByCategory, searchTerm, priceRange, tier, productTheme, timeFrame, sortPrice]);

    useEffect(() => {
        if (debouncedSearchTerm !== "") {
            onSearchByTitle();
            // reset filter by Category Chip when using FilterSection box
            resetFilterByCategory()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, onSearchByTitle]);

    // reset Filter params when select category chip
    useEffect(() => {
        if (isResetFilter) {
            resetFilters();
            setIsResetFilter(false);
        }
    }, [isResetFilter, resetFilters, setIsResetFilter]);

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
                        onClick={resetFilters}
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
