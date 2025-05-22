import { PRODUCT_TIERS, ONLINE_STATUSES, GENDERS, PRODUCT_THEMES, PRODUCT_CATEGORIES } from "@/constants/products";

export type TypeProductTier = typeof PRODUCT_TIERS[number];
export type TypeProductTheme = typeof PRODUCT_THEMES[number];
export type TypeProductGender = typeof GENDERS[number];
export type TypeProductCategory = typeof PRODUCT_CATEGORIES[number];
export type TypeGender = typeof GENDERS[number];
export type TypeOnlineStatus = typeof ONLINE_STATUSES[number];

export type TypeAuthor = {
    firstName: string;
    lastName: string;
    email: string;
    gender: TypeGender;
    avatar: string;
    onlineStatus: TypeOnlineStatus;
};

export type TypeProduct = {
    id: number;
    title: string;
    category: TypeProductCategory;
    price: number;
    isFavorite: boolean;
    createdAt: number;
    theme: TypeProductTheme;
    tier: TypeProductTier;
    imageId: number;
    author: TypeAuthor;
}

export type TypeProductsResponse = TypeProduct[]
export type TypeTimeFrame = "today" | "thisWeek" | "thisMonth" | "allTime" | ''
export type TypeSortPrice = "asc" | "desc" | ''
export type TypeGetAllProductsParams = { page?: number, limit?: number, q?: string, category?: TypeProductCategory, price_gte?: number, price_lte?: number, tier?: TypeProductTier, theme?: TypeProductTheme, timeFrame?: TypeTimeFrame, sortPrice?: TypeSortPrice }


