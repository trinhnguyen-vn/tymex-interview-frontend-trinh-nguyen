import { useState, useCallback } from 'react';
import { TypeTimeFrame, TypeSortPrice } from '@/types/products';

interface FilterState {
    searchTerm: string;
    priceRange: number[];
    tier: string;
    timeFrame: TypeTimeFrame;
    productTheme: string;
    sortPrice: TypeSortPrice;
}

interface UseFilterReturn extends FilterState {
    setSearchTerm: (value: string) => void;
    setPriceRange: (value: number[]) => void;
    setTier: (value: string) => void;
    setTimeFrame: (value: TypeTimeFrame) => void;
    setProductTheme: (value: string) => void;
    setSortPrice: (value: TypeSortPrice) => void;
    resetFilters: () => void;
}

const initialFilterState: FilterState = {
    searchTerm: '',
    priceRange: [0, 100],
    tier: '',
    timeFrame: '',
    productTheme: '',
    sortPrice: '',
};

export const useFilterProducts = (): UseFilterReturn => {
    const [searchTerm, setSearchTerm] = useState<string>(initialFilterState.searchTerm);
    const [priceRange, setPriceRange] = useState<number[]>(initialFilterState.priceRange);
    const [tier, setTier] = useState<string>(initialFilterState.tier);
    const [timeFrame, setTimeFrame] = useState<TypeTimeFrame>(initialFilterState.timeFrame);
    const [productTheme, setProductTheme] = useState<string>(initialFilterState.productTheme);
    const [sortPrice, setSortPrice] = useState<TypeSortPrice>(initialFilterState.sortPrice);

    const resetFilters = useCallback(() => {
        setSearchTerm(initialFilterState.searchTerm);
        setPriceRange(initialFilterState.priceRange);
        setTier(initialFilterState.tier);
        setTimeFrame(initialFilterState.timeFrame);
        setProductTheme(initialFilterState.productTheme);
        setSortPrice(initialFilterState.sortPrice);
    }, []);

    return {
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
    };
}; 