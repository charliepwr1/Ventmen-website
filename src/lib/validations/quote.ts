import { z } from "zod";

export const quoteContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[\d\s\-()]+$/,
      "Please enter a valid phone number"
    ),
  address: z
    .string()
    .min(5, "Please enter a valid address")
    .max(200, "Address is too long"),
});

export const quoteDataSchema = z.object({
  // Step 1
  houseType: z.enum(["apartment", "townhome", "detached"]),
  vents: z.number().min(1).max(100),
  furnaces: z.number().min(1).max(5),
  // Step 2
  hasAC: z.boolean(),
  hasHRV: z.boolean(),
  dryerVentLocation: z.enum(["none", "ground", "second-floor", "rooftop"]),
  hasHumidifier: z.boolean(),
  hasCentralVac: z.boolean(),
  // Step 3
  package: z.enum(["standard", "deepclean"]),
  wantsHRV: z.boolean(),
  wantsSanitizing: z.boolean(),
  wantsDryerVent: z.boolean(),
  wantsHumidifier: z.boolean(),
  wantsCentralVac: z.boolean(),
  // Step 4
  timeframe: z.enum(["asap", "this-week", "next-week", "flexible", ""]),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
});

export const quoteSubmissionSchema = quoteDataSchema.extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(5, "Please enter a valid address"),
  timeframe: z.enum(["asap", "this-week", "next-week", "flexible"]),
});

export type QuoteContactFormData = z.infer<typeof quoteContactSchema>;
export type QuoteSubmissionData = z.infer<typeof quoteSubmissionSchema>;
