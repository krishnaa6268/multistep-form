import { z } from 'zod';

export const step1Schema = z.object({
  fullName: z
    .string()
    .min(3, 'Full Name must be at least 3 characters')
    .max(50, 'Full Name must be less than 50 characters'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email('Invalid email address'),
  number: z.string().regex(/^\d{10}$/, 'Mobile number must be 10 digits'),
  gender: z.enum(['male', 'female', 'others'], { required_error: 'Please select your gender' }),
  country: z.string().min(1, 'Please select a country'),
});

export const step2Schema = z.object({
  bio: z.string().max(400, 'Bio cannot exceed 4 lines or 400 characters'),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of Birth must be in YYYY-MM-DD format'),
  pictureUrl: z.string().url('Invalid picture URL').optional(),
});

export const step3Schema = z.object({
  line1: z.string().min(1, 'Address Line 1 is required'),
  line2: z.string().min(1, 'Address Line 2 is required'),
  landmark: z.string().min(1, 'Landmark is required'),
  zip: z.string().regex(/^\d{6}$/, 'Zip Code must be exactly 6 digits'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
});
