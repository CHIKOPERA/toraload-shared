/**
 * WebSocket message types and interfaces
 * Shared between frontend and backend
 */

export enum WsMessageType {
    // Client -> Server
    SUBSCRIBE_JOB = 'SUBSCRIBE_JOB',
    UNSUBSCRIBE_JOB = 'UNSUBSCRIBE_JOB',
    SUBSCRIBE_DRIVER_JOBS = 'SUBSCRIBE_DRIVER_JOBS',
    DRIVER_LOCATION_UPDATE = 'DRIVER_LOCATION_UPDATE',

    // Server -> Client - Job Lifecycle
    JOB_UPDATED = 'JOB_UPDATED',
    NEW_JOB_AVAILABLE = 'NEW_JOB_AVAILABLE',
    JOB_STATE_CHANGED = 'JOB_STATE_CHANGED',
    JOB_CANCELLED_BY_CUSTOMER = 'JOB_CANCELLED_BY_CUSTOMER',
    JOB_CANCELLED_BY_DRIVER = 'JOB_CANCELLED_BY_DRIVER',
    JOB_DETAILS_UPDATED = 'JOB_DETAILS_UPDATED',

    // Server -> Client - Proposals
    NEW_PROPOSAL = 'NEW_PROPOSAL',
    PROPOSAL_ACCEPTED = 'PROPOSAL_ACCEPTED',
    PROPOSAL_REJECTED = 'PROPOSAL_REJECTED',
    PROPOSAL_WITHDRAWN = 'PROPOSAL_WITHDRAWN',
    PROPOSAL_COUNT_UPDATED = 'PROPOSAL_COUNT_UPDATED',

    // Server -> Client - Driver
    DRIVER_LOCATION = 'DRIVER_LOCATION',
    DRIVER_STATUS_CHANGED = 'DRIVER_STATUS_CHANGED',
    DRIVER_ARRIVED_PICKUP = 'DRIVER_ARRIVED_PICKUP',
    DRIVER_ARRIVED_DROPOFF = 'DRIVER_ARRIVED_DROPOFF',
    ETA_UPDATED = 'ETA_UPDATED',

    // Server -> Client - Payment
    PAYMENT_UPDATE = 'PAYMENT_UPDATE',
    PAYMENT_PROCESSING = 'PAYMENT_PROCESSING',
    PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
    PAYMENT_FAILED = 'PAYMENT_FAILED',

    // Common
    ERROR = 'ERROR',
    PING = 'PING',
    PONG = 'PONG',
}

/**
 * Base WebSocket message structure
 */
export interface WsMessage<T = unknown> {
    type: WsMessageType | string
    payload: T
    timestamp?: string
    sequence?: number // Global sequence number for ordering and gap detection
}

/**
 * Driver location update payload
 */
export interface DriverLocationPayload {
    driverId: string
    latitude: number
    longitude: number
    heading?: number
    speed?: number
    timestamp: string
}

/**
 * Job subscription payload
 */
export interface JobSubscriptionPayload {
    jobId: string
}

/**
 * Job state change payload
 */
export interface JobStateChangePayload {
    jobId: string
    previousState: string
    newState: string
    job: unknown // Use specific Job type when importing
}

/**
 * Proposal payload
 */
export interface ProposalPayload {
    proposalId: string
    jobId: string
    driverId: string
    proposedPrice: number
    estimatedDuration?: number
    notes?: string
    proposal?: any // Full proposal entity for incremental updates
}

/**
 * Payment update payload
 */
export interface PaymentUpdatePayload {
    paymentId: string
    jobId: string
    status: string
    amount: number
}

/**
 * Error payload
 */
export interface WsErrorPayload {
    message: string
    code?: string
}

/**
 * Job cancellation payload
 */
export interface JobCancellationPayload {
    jobId: string
    cancelledBy: string
    reason: string
    details?: string
    job?: any
}

/**
 * Job details updated payload
 */
export interface JobDetailsUpdatedPayload {
    jobId: string
    updates: Record<string, any>
    job?: any
}

/**
 * Proposal withdrawn payload
 */
export interface ProposalWithdrawnPayload {
    proposalId: string
    jobId: string
    driverId: string
}

/**
 * Proposal count payload
 */
export interface ProposalCountPayload {
    jobId: string
    totalProposals: number
}

/**
 * Driver status change payload
 */
export interface DriverStatusChangePayload {
    driverId: string
    status: string
    jobId?: string
}

/**
 * Driver arrived payload
 */
export interface DriverArrivedPayload {
    jobId: string
    driverId: string
    location: 'pickup' | 'dropoff'
    timestamp: string
}

/**
 * ETA update payload
 */
export interface ETAUpdatePayload {
    jobId: string
    estimatedArrival: string
    remainingDistance?: number
    remainingDuration?: number
}

/**
 * Payment processing payload
 */
export interface PaymentProcessingPayload {
    jobId: string
    paymentMethod: string
    amount: number
}

/**
 * Payment completed payload
 */
export interface PaymentCompletedPayload {
    jobId: string
    transactionId: string
    amount: number
}

/**
 * Payment failed payload
 */
export interface PaymentFailedPayload {
    jobId: string
    error: string
    retryable: boolean
}

// Discriminated union types for type-safe message handling
export type WsClientMessage =
    | (WsMessage<JobSubscriptionPayload> & { type: WsMessageType.SUBSCRIBE_JOB })
    | (WsMessage<JobSubscriptionPayload> & { type: WsMessageType.UNSUBSCRIBE_JOB })
    | (WsMessage<Record<string, never>> & { type: WsMessageType.SUBSCRIBE_DRIVER_JOBS })
    | (WsMessage<DriverLocationPayload> & { type: WsMessageType.DRIVER_LOCATION_UPDATE })
    | (WsMessage<Record<string, never>> & { type: WsMessageType.PING })

export type WsServerMessage =
    // Job Lifecycle
    | (WsMessage<unknown> & { type: WsMessageType.JOB_UPDATED })
    | (WsMessage<unknown> & { type: WsMessageType.NEW_JOB_AVAILABLE })
    | (WsMessage<JobStateChangePayload> & { type: WsMessageType.JOB_STATE_CHANGED })
    | (WsMessage<JobCancellationPayload> & { type: WsMessageType.JOB_CANCELLED_BY_CUSTOMER })
    | (WsMessage<JobCancellationPayload> & { type: WsMessageType.JOB_CANCELLED_BY_DRIVER })
    | (WsMessage<JobDetailsUpdatedPayload> & { type: WsMessageType.JOB_DETAILS_UPDATED })
    // Proposals
    | (WsMessage<ProposalPayload> & { type: WsMessageType.NEW_PROPOSAL })
    | (WsMessage<ProposalPayload> & { type: WsMessageType.PROPOSAL_ACCEPTED })
    | (WsMessage<ProposalPayload> & { type: WsMessageType.PROPOSAL_REJECTED })
    | (WsMessage<ProposalWithdrawnPayload> & { type: WsMessageType.PROPOSAL_WITHDRAWN })
    | (WsMessage<ProposalCountPayload> & { type: WsMessageType.PROPOSAL_COUNT_UPDATED })
    // Driver
    | (WsMessage<DriverLocationPayload> & { type: WsMessageType.DRIVER_LOCATION })
    | (WsMessage<DriverStatusChangePayload> & { type: WsMessageType.DRIVER_STATUS_CHANGED })
    | (WsMessage<DriverArrivedPayload> & { type: WsMessageType.DRIVER_ARRIVED_PICKUP })
    | (WsMessage<DriverArrivedPayload> & { type: WsMessageType.DRIVER_ARRIVED_DROPOFF })
    | (WsMessage<ETAUpdatePayload> & { type: WsMessageType.ETA_UPDATED })
    // Payment
    | (WsMessage<PaymentUpdatePayload> & { type: WsMessageType.PAYMENT_UPDATE })
    | (WsMessage<PaymentProcessingPayload> & { type: WsMessageType.PAYMENT_PROCESSING })
    | (WsMessage<PaymentCompletedPayload> & { type: WsMessageType.PAYMENT_COMPLETED })
    | (WsMessage<PaymentFailedPayload> & { type: WsMessageType.PAYMENT_FAILED })
    // Common
    | (WsMessage<WsErrorPayload> & { type: WsMessageType.ERROR })
    | (WsMessage<Record<string, never>> & { type: WsMessageType.PONG })
