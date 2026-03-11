/**
 * Job State Machine
 * Canonical states for job lifecycle
 */
export enum JobState {
    // Initial states
    CREATED = 'CREATED',
    NEGOTIATING = 'NEGOTIATING',
    AGREED = 'AGREED',

    // Payment states
    PAYMENT_PENDING = 'PAYMENT_PENDING',
    PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',

    // Execution states
    REQUESTED = 'REQUESTED',
    ASSIGNED = 'ASSIGNED',
    EN_ROUTE = 'EN_ROUTE',
    IN_PROGRESS = 'IN_PROGRESS',

    // Completion states
    COMPLETED = 'COMPLETED',
    SETTLED = 'SETTLED',

    // Terminal states
    CANCELLED = 'CANCELLED',
    CANCELLED_BY_CUSTOMER = 'CANCELLED_BY_CUSTOMER',
    CANCELLED_BY_DRIVER = 'CANCELLED_BY_DRIVER',
    CANCELLED_BY_OPS = 'CANCELLED_BY_OPS',
    FAILED = 'FAILED',
}

/**
 * Valid state transitions
 * Maps current state to allowed next states
 */
export const STATE_TRANSITIONS: Record<JobState, JobState[]> = {
    [JobState.CREATED]: [
        JobState.NEGOTIATING,
        JobState.CANCELLED,
        JobState.CANCELLED_BY_CUSTOMER,
        JobState.CANCELLED_BY_OPS,
    ],
    [JobState.NEGOTIATING]: [
        JobState.AGREED,
        JobState.CANCELLED,
        JobState.CANCELLED_BY_CUSTOMER,
        JobState.CANCELLED_BY_OPS,
    ],
    [JobState.AGREED]: [
        JobState.PAYMENT_PENDING,
        JobState.ASSIGNED, // Direct transition for cash payments
        JobState.CANCELLED,
        JobState.CANCELLED_BY_CUSTOMER,
        JobState.CANCELLED_BY_OPS,
    ],
    [JobState.PAYMENT_PENDING]: [
        JobState.PAYMENT_CONFIRMED,
        JobState.CANCELLED,
        JobState.CANCELLED_BY_CUSTOMER,
        JobState.CANCELLED_BY_OPS,
        JobState.FAILED,
    ],
    [JobState.PAYMENT_CONFIRMED]: [JobState.REQUESTED],
    [JobState.REQUESTED]: [
        JobState.ASSIGNED,
        JobState.CANCELLED,
        JobState.CANCELLED_BY_CUSTOMER,
        JobState.CANCELLED_BY_DRIVER,
        JobState.CANCELLED_BY_OPS,
    ],
    [JobState.ASSIGNED]: [
        JobState.EN_ROUTE,
        JobState.CANCELLED,
        JobState.CANCELLED_BY_CUSTOMER,
        JobState.CANCELLED_BY_DRIVER,
        JobState.CANCELLED_BY_OPS,
    ],
    [JobState.EN_ROUTE]: [
        JobState.IN_PROGRESS,
        JobState.CANCELLED,
        JobState.CANCELLED_BY_CUSTOMER,
        JobState.CANCELLED_BY_DRIVER,
        JobState.CANCELLED_BY_OPS,
    ],
    [JobState.IN_PROGRESS]: [JobState.COMPLETED, JobState.FAILED],
    [JobState.COMPLETED]: [JobState.SETTLED],
    [JobState.SETTLED]: [],
    [JobState.CANCELLED]: [],
    [JobState.CANCELLED_BY_CUSTOMER]: [],
    [JobState.CANCELLED_BY_DRIVER]: [],
    [JobState.CANCELLED_BY_OPS]: [],
    [JobState.FAILED]: [],
}

/**
 * Check if a state transition is valid
 */
export function isValidTransition(from: JobState, to: JobState): boolean {
    return STATE_TRANSITIONS[from]?.includes(to) ?? false
}

/**
 * Payment states
 */
export enum PaymentState {
    INITIATED = 'PAY_INITIATED',
    PENDING = 'PAY_PENDING',
    CONFIRMED = 'PAY_CONFIRMED',
    FAILED = 'PAY_FAILED',
    REFUNDED = 'PAY_REFUNDED',
}

/**
 * Payment method selected by customer
 */
export enum PaymentMethod {
    CASH = 'CASH',
    ECOCASH = 'ECOCASH',
    PESEPAY = 'PESEPAY',
}

/**
 * Payment provider types
 */
export enum PaymentProvider {
    ECOCASH = 'ECOCASH',
    PESEPAY = 'PESEPAY',
    MOCK = 'MOCK', // For testing
}

/**
 * Driver availability status
 */
export enum DriverStatus {
    AVAILABLE = 'AVAILABLE',
    BUSY = 'BUSY',
    OFFLINE = 'OFFLINE',
    SUSPENDED = 'SUSPENDED',
}

/**
 * Driver license classes
 */
export enum LicenseClass {
    CLASS_2 = 'CLASS_2', // Bakkies, small trucks
    CLASS_4 = 'CLASS_4', // Small vehicles like D4D
}

/**
 * Driver verification status
 */
export enum VerificationStatus {
    PENDING = 'PENDING', // Default, documents not submitted
    DOCUMENTS_INCOMPLETE = 'DOCUMENTS_INCOMPLETE', // Partial submission
    SUBMITTED = 'SUBMITTED', // All docs uploaded, awaiting review
    APPROVED = 'APPROVED', // Verified by admin, can work
    REJECTED = 'REJECTED', // Failed verification
    RESUBMISSION_REQUIRED = 'RESUBMISSION_REQUIRED', // Need to upload again
}

/**
 * Document types for driver verification
 */
export enum DocumentType {
    LICENSE_SELFIE = 'LICENSE_SELFIE', // Selfie holding license
    ID_DOCUMENT = 'ID_DOCUMENT', // Passport or National ID
    VEHICLE_FRONT = 'VEHICLE_FRONT', // Front photo with plates
    VEHICLE_BACK = 'VEHICLE_BACK', // Back photo with plates
}

/**
 * User roles
 */
export enum UserRole {
    CUSTOMER = 'CUSTOMER',
    DRIVER = 'DRIVER',
    ADMIN = 'ADMIN',
}

/**
 * Event types for audit trail
 */
export enum EventType {
    // Job events
    JOB_CREATED = 'JOB_CREATED',
    JOB_NEGOTIATION_OPENED = 'JOB_NEGOTIATION_OPENED',
    PRICE_PROPOSED = 'PRICE_PROPOSED',
    PRICE_COUNTERED = 'PRICE_COUNTERED',
    PRICE_AGREED = 'PRICE_AGREED',
    PROPOSAL_WITHDRAWN = 'PROPOSAL_WITHDRAWN',
    PROPOSAL_AUTO_RETRACTED = 'PROPOSAL_AUTO_RETRACTED',
    DRIVER_SELECTED = 'DRIVER_SELECTED',
    DRIVER_ASSIGNED = 'DRIVER_ASSIGNED',
    DRIVER_EN_ROUTE = 'DRIVER_EN_ROUTE',
    JOB_STARTED = 'JOB_STARTED',
    JOB_COMPLETED = 'JOB_COMPLETED',
    JOB_CANCELLED = 'JOB_CANCELLED',
    JOB_FAILED = 'JOB_FAILED',
    JOB_SETTLED = 'JOB_SETTLED',

    // Payment events
    PAYMENT_INITIATED = 'PAYMENT_INITIATED',
    PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
    PAYMENT_FAILED = 'PAYMENT_FAILED',
    PAYMENT_REFUNDED = 'PAYMENT_REFUNDED',
    PAYOUT_SCHEDULED = 'PAYOUT_SCHEDULED',
    PAYOUT_COMPLETED = 'PAYOUT_COMPLETED',

    // Ops events
    OPS_STATE_OVERRIDE = 'OPS_STATE_OVERRIDE',
    OPS_REFUND_ISSUED = 'OPS_REFUND_ISSUED',
    OPS_NOTE_ADDED = 'OPS_NOTE_ADDED',
}

/**
 * Cancellation reasons
 */
export enum CancellationReason {
    CUSTOMER_REQUEST = 'CUSTOMER_REQUEST',
    DRIVER_UNAVAILABLE = 'DRIVER_UNAVAILABLE',
    PAYMENT_FAILED = 'PAYMENT_FAILED',
    NO_DRIVERS_AVAILABLE = 'NO_DRIVERS_AVAILABLE',
    CUSTOMER_NO_SHOW = 'CUSTOMER_NO_SHOW',
    DRIVER_NO_SHOW = 'DRIVER_NO_SHOW',
    SYSTEM_ERROR = 'SYSTEM_ERROR',
    OPS_INTERVENTION = 'OPS_INTERVENTION',
    OTHER = 'OTHER',
}

/**
 * Dispute reasons
 */
export enum DisputeReason {
    INCOMPLETE_DELIVERY = 'INCOMPLETE_DELIVERY',
    DAMAGED_GOODS = 'DAMAGED_GOODS',
    WRONG_LOCATION = 'WRONG_LOCATION',
    EXCESSIVE_DELAY = 'EXCESSIVE_DELAY',
    UNPROFESSIONAL_BEHAVIOR = 'UNPROFESSIONAL_BEHAVIOR',
    PAYMENT_ISSUE = 'PAYMENT_ISSUE',
    OTHER = 'OTHER',
}

/**
 * Actor types for event tracking
 */
export enum ActorType {
    customer = 'customer',
    driver = 'driver',
    admin = 'admin',
    system = 'system',
}

/**
 * Vehicle categories for drivers and job requirements
 * Helps customers select appropriate vehicle and enables pricing differentiation
 */
export enum VehicleCategory {
    TINY_HELPER = 'TINY_HELPER',
    SMALL_BAKKIE = 'SMALL_BAKKIE',
    MEDIUM_BAKKIE = 'MEDIUM_BAKKIE',
    SMALL_TRUCK = 'SMALL_TRUCK',
    LARGE_TRUCK = 'LARGE_TRUCK',
}

/**
 * Vehicle category metadata with display info and capacity hints
 */
export interface VehicleCategoryInfo {
    id: VehicleCategory
    name: string
    description: string
    capacityHint: string
    exampleLoads: string[]
    icon: string // Emoji for quick visual identification
    sortOrder: number
    baseMultiplier: number // For future pricing calculations
}

/**
 * Complete information for each vehicle category
 */
export const VEHICLE_CATEGORIES: Record<VehicleCategory, VehicleCategoryInfo> = {
    [VehicleCategory.TINY_HELPER]: {
        id: VehicleCategory.TINY_HELPER,
        name: 'Tiny Helper',
        description: 'Car or small hatchback for quick deliveries',
        capacityHint: 'Up to 200kg',
        exampleLoads: ['Small appliance', 'A few boxes', 'Single item delivery'],
        icon: '🚗',
        sortOrder: 1,
        baseMultiplier: 0.7,
    },
    [VehicleCategory.SMALL_BAKKIE]: {
        id: VehicleCategory.SMALL_BAKKIE,
        name: 'Small Bakkie',
        description: 'Light pickup or half-ton bakkie',
        capacityHint: 'Up to 500kg',
        exampleLoads: ['Fridge + boxes', 'Single room items', 'Small furniture'],
        icon: '🛻',
        sortOrder: 2,
        baseMultiplier: 1.0,
    },
    [VehicleCategory.MEDIUM_BAKKIE]: {
        id: VehicleCategory.MEDIUM_BAKKIE,
        name: 'Medium Bakkie',
        description: 'Full-size bakkie or double cab',
        capacityHint: 'Up to 1 ton',
        exampleLoads: ['2 rooms + people', 'Multiple appliances', 'Bachelor pad move'],
        icon: '🚙',
        sortOrder: 3,
        baseMultiplier: 1.3,
    },
    [VehicleCategory.SMALL_TRUCK]: {
        id: VehicleCategory.SMALL_TRUCK,
        name: 'Small Truck',
        description: '2-3 ton truck with covered cargo area',
        capacityHint: '2-3 tons',
        exampleLoads: ['Apartment move', 'Office relocation', 'Large furniture set'],
        icon: '🚚',
        sortOrder: 4,
        baseMultiplier: 1.8,
    },
    [VehicleCategory.LARGE_TRUCK]: {
        id: VehicleCategory.LARGE_TRUCK,
        name: 'Large Truck',
        description: '5+ ton truck for major moves',
        capacityHint: '5+ tons',
        exampleLoads: ['Full house move', 'Commercial relocation', 'Bulk goods'],
        icon: '🚛',
        sortOrder: 5,
        baseMultiplier: 2.5,
    },
}

/**
 * Get sorted array of vehicle categories for UI display
 */
export function getVehicleCategoriesList(): VehicleCategoryInfo[] {
    return Object.values(VEHICLE_CATEGORIES).sort((a, b) => a.sortOrder - b.sortOrder)
}

/**
 * Check if a driver's vehicle can handle a required category
 * Larger vehicles can always handle smaller jobs
 */
export function canHandleCategory(
    driverCategory: VehicleCategory,
    requiredCategory: VehicleCategory
): boolean {
    const driverInfo = VEHICLE_CATEGORIES[driverCategory]
    const requiredInfo = VEHICLE_CATEGORIES[requiredCategory]
    return driverInfo.sortOrder >= requiredInfo.sortOrder
}
