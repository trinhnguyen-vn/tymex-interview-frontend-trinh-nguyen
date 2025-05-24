'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Grid,
    Chip,
    Button,
    useTheme,
    Typography,
} from '@mui/material';
import {

    TypeProduct,
    TypeProductCategory,
} from '@/types/products';
import { PRODUCT_CATEGORIES } from '@/constants/products';
import ProductCard from './ProductCard';
import FilterSection from './FilterSection';
import { CATEGORY_ALL, LIMIT } from '@/constants/products';
import { useFetch } from '@/hooks/useFetch';
import { getProductsApiEndpoint } from '@/api/products';
import Error from '@/components/Error';

const ProductsPage = ({ initialProductsData }: { initialProductsData: TypeProduct[] }) => {
    const theme = useTheme()
    const [filteredProducts, setFilteredProducts] = useState<TypeProduct[] | null>(initialProductsData);
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORY_ALL);
    const [isLoadingMoreMode, setIsLoadingMoreMode] = useState<boolean>(false);
    const [isResetFilter, setIsResetFilter] = useState<boolean>(false);

    const getProductApiUrl = useCallback(
        (category: TypeProductCategory, pageNumber: number = 1) => {
            return getProductsApiEndpoint({ page: pageNumber, limit: LIMIT, category })
        },
        []
    );

    const { data: fetchedProductsData, loading: isLoading, fetchAction: fetchProducts, error: errorFetchProducts } = useFetch<TypeProduct[]>(
        { url: getProductApiUrl(selectedCategory) },
    )

    // first time select category
    const onFilterByCategory = useCallback(async (category: TypeProductCategory) => {
        setIsLoadingMoreMode(false)
        setSelectedCategory(category);
        setIsResetFilter(true)
        await fetchProducts({ url: getProductApiUrl(category === CATEGORY_ALL ? '' : category) })

    }, [fetchProducts, getProductApiUrl])

    const handleLoadMore = useCallback(async () => {
        setIsLoadingMoreMode(true)
        setPage(page + 1);
        await fetchProducts({ url: getProductApiUrl(selectedCategory === CATEGORY_ALL ? '' : selectedCategory, page + 1) })
    }, [page, fetchProducts, getProductApiUrl, selectedCategory])

    useEffect(() => {
        if (!isLoadingMoreMode && selectedCategory === CATEGORY_ALL) {
            // keep the initial data
            setFilteredProducts(initialProductsData);
        } else if (isLoadingMoreMode) {
            setFilteredProducts((prev) => [...(prev || []), ...(fetchedProductsData || [])]); // append dara
        } else {
            setFilteredProducts(() => fetchedProductsData || []);
        }
    }, [fetchedProductsData, initialProductsData, selectedCategory, isLoadingMoreMode])

    return (
        <Box sx={{ p: 3, pt: 10 }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 1, sm: 4 },
            }}>
                <FilterSection setFilteredProducts={setFilteredProducts} isResetFilter={isResetFilter} setIsResetFilter={setIsResetFilter} />
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
                                    background: selectedCategory === cate ? theme.palette.primary.main : theme.palette.primary.light,
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
                                {filteredProducts?.map((product, idx) => (
                                    <ProductCard {...product} key={`${product.id}-${idx}`} />
                                ))}
                            </Box>
                        </Grid>
                    </Box>
                    {errorFetchProducts ? (<Error errorMessage={"Error fetching products, please retry"} retryAction={() => fetchProducts({ url: getProductApiUrl(selectedCategory) })} />)
                        : (<>
                            <Typography variant='body1' sx={{ mt: 3 }}>
                                Found: {filteredProducts?.length} items
                            </Typography>
                            <Button variant="contained" sx={{ mt: 3, width: 'fit-content', px: 10, py: 2, fontSize: '1.5rem' }} onClick={handleLoadMore} loadingIndicator="Loading…" loading={isLoading}>Load more</Button>
                        </>)} </Box>
            </Box>

        </Box >
    );
}

export default ProductsPage;