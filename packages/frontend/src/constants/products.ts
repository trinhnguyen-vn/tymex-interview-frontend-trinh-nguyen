export const PRODUCT_TIERS = ['Premium', 'Deluxe', 'Basic'];

export const PRODUCT_THEMES = ['Halloween', 'Light', 'Dark', 'Colorful'];
export const PRODUCT_CATEGORIES = [
    'Mythic',
    'Epic',
    'Accessory',
    'Shoes',
    'Lower Body',
    'Upper Body',
    'Hat',
    'Rare',
    'Legendary',
];


export const GENDERS = ['Male', 'Female'];

export const ONLINE_STATUSES = ['idle', 'offline', 'online', 'busy'];
export const STATUS_COLORS: Record<typeof ONLINE_STATUSES[number], string> = {
    idle: 'lightblue',
    offline: 'lightgrey',
    online: 'lightgreen',
    busy: 'lightcoral',
};

export const PRODUCT_CATEGORIES_COLORS: Record<typeof PRODUCT_CATEGORIES[number], string> = {
    Mythic: 'linear-gradient(135deg,rgb(175, 125, 240) 0%,rgb(140, 181, 247) 100%)',
    Epic: 'linear-gradient(135deg,rgb(243, 138, 163) 0%,rgb(242, 160, 130) 100%)',
    Accessory: 'linear-gradient(135deg,rgb(151, 230, 177) 0%,rgb(134, 235, 217) 100%)',
    Shoes: 'linear-gradient(135deg,rgb(233, 176, 107) 0%,rgb(243, 228, 165) 100%)',
    'Lower Body': 'linear-gradient(135deg,rgb(230, 195, 97) 0%,rgb(249, 184, 152) 100%)',
    'Upper Body': 'linear-gradient(135deg, #00c6ff 0%,rgb(131, 175, 228) 100%)',
    Hat: 'linear-gradient(135deg,rgb(247, 124, 183) 0%,rgb(234, 176, 176) 100%)',
    Rare: 'linear-gradient(135deg,rgb(203, 156, 247) 0%,rgb(150, 195, 240) 100%)',
    Legendary: 'linear-gradient(135deg, #f7971e 0%,rgb(215, 199, 126) 100%)',
};


export const LIMIT = 20;
export const CATEGORY_ALL = 'ALL';

