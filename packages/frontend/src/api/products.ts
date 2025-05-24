import { getApiHostUrl } from '@/utils';
import { TypeProductsResponse, TypeGetAllProductsParams } from '@/types';

export const getProductsApiEndpoint = (params: TypeGetAllProductsParams) => {
    const queryParams = new URLSearchParams();
    queryParams.set('_page', params.page?.toString() || '1');
    queryParams.set('_limit', params.limit?.toString() || '20');
    if (params.q) queryParams.set('q', params.q);
    if (params.price_gte) queryParams.set('price_gte', params.price_gte.toString());
    if (params.price_lte) queryParams.set('price_lte', params.price_lte.toString());
    if (params.tier) queryParams.set('tier', params.tier);
    if (params.theme) queryParams.set('theme', params.theme);
    if (params.timeFrame) queryParams.set('timeFrame', params.timeFrame);
    if (params.category) queryParams.set('category', params.category);
    // _sort=price&_order=desc
    if (params.sortPrice) {
        queryParams.set('_sort', 'price');
        queryParams.set('_order', params.sortPrice);
    }

    return `${getApiHostUrl()}/products?${queryParams.toString()}`;
}

export const getProductDetailsApiEndpoint = (id: string) => `${getApiHostUrl()}/products/${id}`;

export const getAllProducts = async (params: TypeGetAllProductsParams): Promise<TypeProductsResponse> => {
    const response = await fetch(getProductsApiEndpoint(params));
    const data = await response.json();
    return data;
};