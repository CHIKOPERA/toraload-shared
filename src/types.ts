import { JobState, EventType, PaymentState, DriverStatus, VehicleCategory } from './enums'

/**
 * Base event interface
 */
export interface BaseEvent {
    id: string
    type: EventType
    timestamp: Date
    actorId: string
    actorType: 'customer' | 'driver' | 'admin' | 'system'
    metadata?: Record<string, any>
}

/**
 * Job aggregate
 */
export interface Job {
    id: string
    customerId: string
    driverId?: string
    state: JobState
    pickupLocation: {
        latitude: number
        longitude: number
        address: string
    }
    dropoffLocation: {
        latitude: number
        longitude: number
        address: string
    }
    loadDescription: string
    estimatedWeight?: number
    specialInstructions?: string
    extraLifters?: number // 0-5 extra helpers
    requiredVehicleCategory?: VehicleCategory
    scheduledAt?: Date // null means immediate/ASAP
    agreedPrice?: number
    commissionAmount?: number
    distance?: number // km
    createdAt: Date
    updatedAt: Date
}

/**
 * Price proposal
 */
export interface PriceProposal {
    id: string
    jobId: string
    driverId: string
    proposedPrice: number
    estimatedDuration?: number
    notes?: string
    status: 'pending' | 'accepted' | 'rejected'
    createdAt: Date
}

/**
 * Payment aggregate
 */
export interface Payment {
    id: string
    jobId: string
    customerId: string
    amount: number
    provider: string
    state: PaymentState
    externalReference?: string
    phoneNumber: string
    createdAt: Date
    confirmedAt?: Date
}

/**
 * Driver profile
 */
export interface Driver {
    id: string
    userId: string
    email: string
    phone: string
    firstName: string
    lastName: string
    vehicleCategory: VehicleCategory
    vehicleType?: string // Optional legacy free-text
    vehicleRegistration: string
    licenseNumber: string
    status: DriverStatus
    city: string
    rating?: number
    completedJobs: number
    createdAt: Date
}

/**
 * Driver balance
 */
export interface DriverBalance {
    driverId: string
    availableBalance: number
    pendingBalance: number
    totalEarnings: number
    totalCommissions: number
    totalPayouts: number
    updatedAt: Date
}

/**
 * Customer profile
 */
export interface Customer {
    id: string
    userId: string
    email: string
    phone: string
    firstName: string
    lastName: string
    createdAt: Date
}

/**
 * Chat message (per-job conversation between customer and driver)
 */
export interface ChatMessage {
    id: string
    jobId: string
    senderId: string
    senderName: string
    senderRole: 'customer' | 'driver'
    content: string
    createdAt: string
}

/**
 * Ops action (audit log)
 */
export interface OpsAction {
    id: string
    adminId: string
    entityType: 'job' | 'payment' | 'driver' | 'customer' | 'driver_onboarding' | 'field_agent'
    entityId: string
    action: string
    reason: string
    details?: Record<string, any>
    createdAt: Date
}

export interface DriverOnboardingApplication {
    id: string
    clientDraftId: string
    fieldAgentUserId: string
    driverId?: string | null
    status: import('./enums').DriverOnboardingApplicationStatus
    firstName?: string | null
    lastName?: string | null
    phone?: string | null
    email?: string | null
    city?: string | null
    licenseNumber?: string | null
    licenseClass?: import('./enums').LicenseClass | null
    idType?: import('./enums').IdentityDocumentType | null
    vehicleRegistration?: string | null
    vehicleCategory?: VehicleCategory | null
    vehicleMake?: string | null
    vehicleModel?: string | null
    vehicleColor?: string | null
    vehicleCapacityTons?: number | null
    licenseSelfieUrl?: string | null
    idDocumentUrl?: string | null
    vehicleFrontPhotoUrl?: string | null
    vehicleBackPhotoUrl?: string | null
    consentAccepted: boolean
    phoneVerifiedAt?: string | null
    submittedAt?: string | null
    expiresAt: string
    createdAt: string
    updatedAt: string
}
