import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ProductsPage from '..';
import { PRODUCT_CATEGORIES } from '@/constants/products';
import { useFetch } from '../../../hooks';
import { TypeProduct, TypeProductCategory } from '@/types/products';
import { renderWithTheme } from '@/tests/utils';
import { MOCKED_AUTHOR, MOCK_INITIAL_PRODUCTS } from './testDataForProducts';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
        text: () => Promise.resolve(''),
    })
) as jest.Mock;

// Mock the hooks
jest.mock('../../../hooks', () => ({
    useFetch: jest.fn(),
    useDebounce: jest.fn().mockImplementation((value) => value)
}));

describe('ProductsPage', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders initial products correctly', async () => {
        renderWithTheme(<ProductsPage initialProductsData={MOCK_INITIAL_PRODUCTS} />);

        // Check if all initial products are rendered
        const productCards = await screen.getAllByTestId('product-card');
        expect(productCards).toHaveLength(MOCK_INITIAL_PRODUCTS.length);

        // Check if category chips are rendered
        PRODUCT_CATEGORIES.forEach(category => {
            expect(screen.getByText(category)).toBeVisible();
        });

        // check if the product cards has the correct info
        MOCK_INITIAL_PRODUCTS.forEach(product => {
            expect(screen.getByText(product.title)).toBeVisible();
            expect(screen.getByText(product.category)).toBeVisible();
            expect(screen.getByText(`${product.price.toFixed(2)} ETH`)).toBeVisible();
            expect(screen.getByText(`${product.author.firstName}_${product.author.lastName}`)).toBeVisible();
        });

        // Check if the item count is displayed correctly
        expect(screen.getByText(`Found: ${MOCK_INITIAL_PRODUCTS.length} items`)).toBeVisible();
    });

    it('handles filtering by Category Chip', async () => {
        const mockFetchedProducts: TypeProduct[] = [{
            id: 3,
            title: 'Product 3',
            category: PRODUCT_CATEGORIES[0],
            price: 200,
            isFavorite: false,
            createdAt: Date.now(),
            theme: 'light',
            tier: 'basic',
            imageId: 3,
            author: MOCKED_AUTHOR
        }];

        // Update mock for this specific test
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockFetchedProducts),
                text: () => Promise.resolve(''),
            })
        ) as jest.Mock;

        renderWithTheme(<ProductsPage initialProductsData={MOCK_INITIAL_PRODUCTS} />);

        // Click on a category chip
        const selectedCategory = screen.getByText(PRODUCT_CATEGORIES[0]);
        fireEvent.click(selectedCategory);

        // Wait for the products to update
        await waitFor(() => {
            expect(screen.getByText(mockFetchedProducts[0].title)).toBeVisible();
            const productCards = screen.getAllByTestId('product-card');
            expect(productCards).toHaveLength(mockFetchedProducts.length);
        });
    });

    it('handles load more functionality', async () => {
        const mockMoreProducts: TypeProduct[] = [{
            id: 4,
            title: 'Product 4',
            category: 'Electronics' as TypeProductCategory,
            price: 300,
            isFavorite: false,
            createdAt: Date.now(),
            theme: 'light',
            tier: 'basic',
            imageId: 4,
            author: MOCKED_AUTHOR
        }];

        (useFetch as jest.Mock).mockImplementation(() => ({
            data: mockMoreProducts,
            loading: false,
            error: null,
            fetchAction: jest.fn().mockResolvedValue(undefined)
        }));

        renderWithTheme(<ProductsPage initialProductsData={MOCK_INITIAL_PRODUCTS} />);

        // Click load more button
        const loadMoreButton = screen.getByText('Load more');
        fireEvent.click(loadMoreButton);

        // Wait for the products to update
        await waitFor(() => {
            const productCards = screen.getAllByTestId('product-card');
            expect(productCards).toHaveLength(MOCK_INITIAL_PRODUCTS.length + mockMoreProducts.length);
        });
    });

    it('displays error message when fetch fails', async () => {
        (useFetch as jest.Mock).mockImplementation(() => ({
            data: null,
            loading: false,
            error: new Error('Failed to fetch'),
            fetchAction: jest.fn().mockRejectedValue(undefined)
        }));

        // Update mock for this specific test
        global.fetch = jest.fn(() =>
            Promise.reject({
                ok: false,
                json: () => Promise.resolve(null),
                text: () => Promise.resolve(''),
            })
        ) as jest.Mock;

        renderWithTheme(<ProductsPage initialProductsData={MOCK_INITIAL_PRODUCTS} />);
        const loadMoreButton = screen.getByText('Load more');
        fireEvent.click(loadMoreButton);

        await waitFor(() => {
            // Check if error message is displayed
            expect(screen.getByText('Error fetching products, please retry')).toBeVisible();
        });

        // Check if retry button is present
        const retryButton = screen.getByText('Retry');
        expect(retryButton).toBeVisible();
    });
});
