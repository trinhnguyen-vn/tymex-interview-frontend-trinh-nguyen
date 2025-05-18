export const LANGUAGES = [
    { value: 'en', label: 'English' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'fr', label: 'French' }
] as const;

export type TypeLanguageValue = typeof LANGUAGES[number]['value'];
