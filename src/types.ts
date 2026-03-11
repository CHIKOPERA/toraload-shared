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
 * Ops action (audit log)
 */
export interface OpsAction {
    id: string
    adminId: string
    entityType: 'job' | 'payment' | 'driver' | 'customer'
    entityId: string
    action: string
    reason: string
    details?: Record<string, any>
    createdAt: Date
}
