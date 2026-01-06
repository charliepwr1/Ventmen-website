"use server";

import { quoteSubmissionSchema } from "@/lib/validations";
import { calculateQuotePrice } from "@/lib/utils/pricing";
import type { QuoteData } from "@/types";

export interface QuoteSubmissionResult {
  success: boolean;
  message: string;
  quoteId?: string;
}

export async function submitQuote(
  data: QuoteData
): Promise<QuoteSubmissionResult> {
  try {
    // Validate the submission data
    const validatedData = quoteSubmissionSchema.safeParse(data);

    if (!validatedData.success) {
      const errorMessages = validatedData.error.issues
        .map((issue) => issue.message)
        .join(", ");
      return {
        success: false,
        message: `Validation failed: ${errorMessages}`,
      };
    }

    // Calculate the final price server-side (security: don't trust client price)
    const calculatedPrice = calculateQuotePrice(validatedData.data);

    // Generate a quote ID
    const quoteId = `QT-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation email to customer
    // 3. Send notification email to business
    // 4. Integrate with CRM/scheduling system

    console.log("Quote submitted:", {
      quoteId,
      ...validatedData.data,
      calculatedPrice,
      submittedAt: new Date().toISOString(),
    });

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      message: "Quote submitted successfully! We'll be in touch within 24 hours.",
      quoteId,
    };
  } catch (error) {
    console.error("Quote submission error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again or call us directly.",
    };
  }
}
