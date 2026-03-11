import { z } from 'zod'
import {
    JobState,
    PaymentProvider,
    PaymentMethod,
    UserRole,
    DriverStatus,
    CancellationReason,
    DisputeReason,
    VehicleCategory,
    LicenseClass,
    VerificationStatus,
    DocumentType,
} from './enums'

/**
 * Location schema
 */
export const LocationSchema = z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    address: z.string().min(1),
    city: z.string().optional(),
    country: z.string().optional(),
})

export type Location = z.infer<typeof LocationSchema>

/**
 * Job creation schema
 */
export const CreateJobSchema = z.object({
    pickupLocation: LocationSchema,
    dropoffLocation: LocationSchema,
    loadDescription: z.string().min(10).max(500),
    estimatedWeight: z.number().positive().optional(),
    specialInstructions: z.string().max(1000).optional(),
    extraLifters: z.number().int().min(0).max(5).default(0),
    scheduledAt: z.string().datetime().optional(), // ISO 8601 datetime string
    paymentMethod: z.string().default('CASH'), // Accept any payment method code (CASH, ECOCASH, PZW211, etc.)
    requiredVehicleCategory: z.nativeEnum(VehicleCategory).default(VehicleCategory.MEDIUM_BAKKIE),
})

export type CreateJobInput = z.infer<typeof CreateJobSchema>

/**
 * Price proposal schema
 */
export const PriceProposalSchema = z.object({
    jobId: z.string().uuid(),
    proposedPrice: z.number().positive(),
    estimatedDuration: z.number().positive().optional(), // minutes
    notes: z.string().max(500).optional(),
})

export type PriceProposalInput = z.infer<typeof PriceProposalSchema>

/**
 * Payment initiation schema
 */
export const InitiatePaymentSchema = z.object({
    jobId: z.string().uuid(),
    amount: z.number().positive(),
    phoneNumber: z.string().regex(/^(\+263|0)\d{9}$/), // Accepts +263XXXXXXXXX or 0XXXXXXXXX
    provider: z.nativeEnum(PaymentProvider),
    paymentMethodCode: z.string().optional(), // Pesepay payment method code (e.g., 'PZW211')
})

export type InitiatePaymentInput = z.infer<typeof InitiatePaymentSchema>

/**
 * Location update schema
 */
export const LocationUpdateSchema = z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    accuracy: z.number().positive().optional(),
    timestamp: z.string().datetime(),
})

export type LocationUpdate = z.infer<typeof LocationUpdateSchema>

/**
 * Job completion schema
 */
export const CompleteJobSchema = z.object({
    jobId: z.string().uuid(),
    completionProofUrl: z.string().url(),
    notes: z.string().max(500).optional(),
})

export type CompleteJobInput = z.infer<typeof CompleteJobSchema>

/**
 * Cancellation schema
 */
export const CancelJobSchema = z.object({
    jobId: z.string().uuid(),
    reason: z.nativeEnum(CancellationReason),
    details: z.string().max(500).optional(),
})

export type CancelJobInput = z.infer<typeof CancelJobSchema>

/**
 * Driver registration schema
 */
export const RegisterDriverSchema = z
    .object({
        email: z
            .string()
            .transform((val) => (val?.trim() === '' ? undefined : val))
            .pipe(z.string().email().optional())
            .or(z.undefined()),
        password: z.string().min(8).max(128),
        phone: z
            .string()
            .transform((val) => (val?.trim() === '' ? undefined : val))
            .pipe(
                z
                    .string()
                    .regex(/^(\+263|0)\d{9}$/)
                    .optional()
            )
            .or(z.undefined()), // Accepts +263XXXXXXXXX or 0XXXXXXXXX
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        vehicleCategory: z.nativeEnum(VehicleCategory),
        vehicleType: z.string().optional(), // Optional free-text description
        vehicleRegistration: z.string().min(1),
        licenseNumber: z.string().min(1),
        city: z.string().min(1),
    })
    .refine((data) => data.email || data.phone, {
        message: 'Either email or phone number is required',
        path: ['email'],
    })

export type RegisterDriverInput = z.infer<typeof RegisterDriverSchema>

/**
 * Customer registration schema
 */
export const RegisterCustomerSchema = z
    .object({
        email: z
            .string()
            .transform((val) => (val?.trim() === '' ? undefined : val))
            .pipe(z.string().email().optional())
            .or(z.undefined()),
        password: z.string().min(8).max(128),
        phone: z
            .string()
            .transform((val) => (val?.trim() === '' ? undefined : val))
            .pipe(
                z
                    .string()
                    .regex(/^(\+263|0)\d{9}$/)
                    .optional()
            )
            .or(z.undefined()), // Accepts +263XXXXXXXXX or 0XXXXXXXXX
        firstName: z.string().min(1),
        lastName: z.string().min(1),
    })
    .refine((data) => data.email || data.phone, {
        message: 'Either email or phone number is required',
        path: ['email'],
    })

export type RegisterCustomerInput = z.infer<typeof RegisterCustomerSchema>

/**
 * Login schema
 */
export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

export type LoginInput = z.infer<typeof LoginSchema>

/**
 * Phone-based login schema
 */
export const PhoneLoginSchema = z.object({
    phone: z.string().regex(/^(\+263|0)\d{9}$/),
    password: z.string().min(1),
})

export type PhoneLoginInput = z.infer<typeof PhoneLoginSchema>

/**
 * Phone verification schema
 */
export const VerifyPhoneSchema = z.object({
    userId: z.string(),
    code: z
        .string()
        .length(6)
        .regex(/^\d{6}$/),
})

export type VerifyPhoneInput = z.infer<typeof VerifyPhoneSchema>

/**
 * Resend verification code schema
 */
export const ResendCodeSchema = z.object({
    userId: z.string(),
})

export type ResendCodeInput = z.infer<typeof ResendCodeSchema>

/**
 * Region configuration schema
 */
export const RegionConfigSchema = z.object({
    country: z.string(),
    city: z.string(),
    currency: z.string(),
    maxDistance: z.number().positive(), // km
    commissionRate: z.number().min(0).max(1), // 0-1 (e.g., 0.15 = 15%)
    paymentProvider: z.nativeEnum(PaymentProvider),
    timeoutThresholds: z.object({
        paymentConfirmation: z.number().positive(), // minutes
        driverAssignment: z.number().positive(),
        driverEnRoute: z.number().positive(),
        jobCompletion: z.number().positive(),
    }),
})

export type RegionConfig = z.infer<typeof RegionConfigSchema>

/**
 * Driver onboarding - License upload schema
 */
export const UploadLicenseSchema = z.object({
    licenseSelfieUrl: z.string().url(),
    licenseClass: z.nativeEnum(LicenseClass),
    licenseNumber: z.string().min(1).optional(), // Optional if already provided during registration
})

export type UploadLicenseInput = z.infer<typeof UploadLicenseSchema>

/**
 * Driver onboarding - Identity upload schema
 */
export const UploadIdentitySchema = z.object({
    idDocumentUrl: z.string().url(),
    idType: z.enum(['PASSPORT', 'NATIONAL_ID']),
})

export type UploadIdentityInput = z.infer<typeof UploadIdentitySchema>

/**
 * Driver onboarding - Vehicle upload schema
 */
export const UploadVehicleSchema = z.object({
    vehicleFrontPhotoUrl: z.string().url(),
    vehicleBackPhotoUrl: z.string().url(),
    vehicleMake: z.string().min(2).max(50),
    vehicleModel: z.string().min(2).max(50),
    vehicleCapacityTons: z.number().min(0.5).max(10),
    vehicleCategory: z.nativeEnum(VehicleCategory),
})

export type UploadVehicleInput = z.infer<typeof UploadVehicleSchema>

/**
 * Driver onboarding - Submit for verification schema
 */
export const SubmitVerificationSchema = z.object({
    // All fields should already be uploaded, this just triggers final submission
    // Backend will validate that all required fields are present
})

export type SubmitVerificationInput = z.infer<typeof SubmitVerificationSchema>

/**
 * Admin review schema
 */
export const AdminReviewSchema = z.object({
    driverId: z.string().uuid(),
    status: z.enum(['APPROVED', 'REJECTED', 'RESUBMISSION_REQUIRED']),
    notes: z.string().min(1).max(1000).optional(),
})

export type AdminReviewInput = z.infer<typeof AdminReviewSchema>

/**
 * Get upload URL schema
 */
export const GetUploadUrlSchema = z.object({
    documentType: z.nativeEnum(DocumentType),
    fileName: z.string().min(1),
    contentType: z.string().regex(/^image\/(jpeg|jpg|png|webp)$/),
})

export type GetUploadUrlInput = z.infer<typeof GetUploadUrlSchema>
