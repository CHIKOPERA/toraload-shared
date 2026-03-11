/**
 * Application-wide constants
 */

// Distance limits
export const DEFAULT_MAX_DISTANCE_KM = 40
export const MIN_DISTANCE_KM = 1

// Commission
export const DEFAULT_COMMISSION_RATE = 0.15 // 15%

// Timeouts (in minutes)
export const DEFAULT_PAYMENT_TIMEOUT = 10
export const DEFAULT_ASSIGNMENT_TIMEOUT = 15
export const DEFAULT_EN_ROUTE_TIMEOUT = 30
export const DEFAULT_COMPLETION_TIMEOUT = 240 // 4 hours

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// Zimbabwe specific
export const ZIMBABWE_COUNTRY_CODE = '+263'
export const ZIMBABWE_PHONE_REGEX = /^\+263\d{9}$/

// Currency
export const DEFAULT_CURRENCY = 'USD' // Zimbabwe uses USD
export const CURRENCY_SYMBOL = '$'

// File uploads
export const MAX_FILE_SIZE_MB = 10
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// Colors (from design spec)
export const COLORS = {
    background: '#0F172A',
    cardPanel: '#1E293B',
    primaryAccent: '#2DD4BF',
    secondaryAccent: '#FBBF24',
    success: '#22C55E',
    error: '#EF4444',
    mutedText: '#94A3B8',
    activeText: '#E5E7EB',
} as const
