'use client';

import React, { useCallback, useState } from 'react';
import {
    Box,
    Grid,
    CircularProgress,
    Chip,
    Button,
    useTheme,
} from '@mui/material';
import {

    TypeProduct,
    TypeProductCategory,
} from '@/types/products';
import { PRODUCT_CATEGORIES } from '@/constants/products';
import ProductCard from './ProductCard';
import FilterSection from './FilterSection';
const LIMIT = 20;
const CATEGORY_ALL = 'ALL';

const ProductsPage = ({ initialProductsData }: { initialProductsData: TypeProduct[] }) => {
    const [products, setProducts] = useState<TypeProduct[]>(initialProductsData);
    const [loading, setLoading] = useState(false);
    const theme = useTheme()
    const [filteredProducts, setFilteredProducts] = useState<TypeProduct[]>(initialProductsData);
    const [isCategorySelected, setIsCategorySelected] = useState<string>(CATEGORY_ALL);

    const [page, setPage] = useState(1);

    const onFilterByCategory = useCallback((category: TypeProductCategory) => {
        setIsCategorySelected(category);
        if (category === CATEGORY_ALL) { setFilteredProducts(products); return; }
        setFilteredProducts(products.filter((p) => p.category === category));
    }, [products])

    const handleLoadMore = useCallback(() => {
        setPage(page + 1);
        setLoading(true);
        fetch(`https://api.demo.cmoon.site/products?_page=${page}&_limit=${LIMIT}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts([...products, ...data]);
                onFilterByCategory(isCategorySelected);
                setLoading(false);
            });
    }, [isCategorySelected, onFilterByCategory, page, products])


    return (
        <Box sx={{ p: 3, pt: 10 }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 1, sm: 4 },
            }}>
                <FilterSection setFilteredProducts={setFilteredProducts} />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ pb: 5, display: 'flex', flexFlow: 'row wrap', gap: 1 }}>
                        {[CATEGORY_ALL, ...PRODUCT_CATEGORIES].map(cate =>
                            <Chip
                                key={cate}
                                label={cate}
                                onClick={() => onFilterByCategory(cate)}
                                sx={{
                                    color: '#fff',
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    background: isCategorySelected === cate ? theme.palette.primary.main : theme.palette.primary.light,
                                    padding: '1.5rem',
                                    '&:hover': {
                                        background: theme.palette.primary.main,
                                    },
                                }} />
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', flexFlow: 'row wrap', gap: 1, justifyContent: 'center', maxHeight: '90vh', overflow: 'auto' }}>
                        <Grid container spacing={2}>
                            <Box sx={{ display: 'flex', flexFlow: 'row wrap', gap: 1, justifyContent: 'center' }}>
                                {filteredProducts.map((product, idx) => (
                                    <ProductCard {...product} key={`${product.id}-${idx}`} />
                                ))}
                            </Box>
                        </Grid>
                        <Button variant="contained" color="primary" sx={{ mt: 4, width: 'fit-content', px: 10, py: 2, fontSize: '1.5rem' }} onClick={handleLoadMore}>Load more</Button>
                    </Box>
                </Box>
            </Box>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}
        </Box >
    );
}

export default ProductsPage;