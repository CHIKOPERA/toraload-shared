/**
 * Pesepay Payment Method Constants
 * Payment method codes for Zimbabwe payment providers
 */

export const PESEPAY_PAYMENT_METHODS = {
    // Ecocash
    ECOCASH_USD: 'PZW211',
    ECOCASH_ZWL: 'PZW111',

    // Innbucks
    INNBUCKS: 'PZW212',

    // OneMoney
    ONEMONEY: 'PZW213',
} as const

export type PesepayPaymentMethodCode =
    (typeof PESEPAY_PAYMENT_METHODS)[keyof typeof PESEPAY_PAYMENT_METHODS]

/**
 * Display information for each payment method
 */
export const PAYMENT_METHOD_INFO = {
    [PESEPAY_PAYMENT_METHODS.ECOCASH_USD]: {
        name: 'EcoCash USD',
        code: PESEPAY_PAYMENT_METHODS.ECOCASH_USD,
        currency: 'USD',
        icon: '💵',
        description: 'Pay with EcoCash using USD',
    },
    [PESEPAY_PAYMENT_METHODS.ECOCASH_ZWL]: {
        name: 'EcoCash ZWL',
        code: PESEPAY_PAYMENT_METHODS.ECOCASH_ZWL,
        currency: 'ZWL',
        icon: '💰',
        description: 'Pay with EcoCash using ZWL',
    },
    [PESEPAY_PAYMENT_METHODS.INNBUCKS]: {
        name: 'Innbucks',
        code: PESEPAY_PAYMENT_METHODS.INNBUCKS,
        currency: 'USD',
        icon: '🏦',
        description: 'Pay with Innbucks',
    },
    [PESEPAY_PAYMENT_METHODS.ONEMONEY]: {
        name: 'OneMoney',
        code: PESEPAY_PAYMENT_METHODS.ONEMONEY,
        currency: 'USD',
        icon: '📱',
        description: 'Pay with OneMoney',
    },
} as const

/**
 * Get payment method info by code
 */
export function getPaymentMethodInfo(code: string) {
    return PAYMENT_METHOD_INFO[code as PesepayPaymentMethodCode]
}

/**
 * Get all available payment methods
 */
export function getAvailablePaymentMethods() {
    return Object.values(PAYMENT_METHOD_INFO)
}

/**
 * Get payment provider from payment method code
 * Maps specific payment method codes to their provider
 */
export function getProviderFromPaymentMethod(paymentMethodCode: string): string {
    // Pesepay codes start with PZW
    if (paymentMethodCode.startsWith('PZW') || paymentMethodCode.startsWith('pzw')) {
        return 'PESEPAY'
    }

    // Direct payment methods
    if (paymentMethodCode === 'CASH') {
        return 'CASH'
    }

    if (paymentMethodCode === 'ECOCASH') {
        return 'ECOCASH'
    }

    // Default to PESEPAY for unknown codes
    return 'PESEPAY'
}

/**
 * Check if payment method code requires Pesepay provider
 */
export function isPesepayPaymentMethod(paymentMethodCode: string): boolean {
    return paymentMethodCode.startsWith('PZW') || paymentMethodCode.startsWith('pzw')
}
