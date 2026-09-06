import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limiting store (Token-bucket / Sliding window)
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Checks if an action by an identifier (e.g., IP or user key) exceeds allowed requests within a timeframe.
 * @param identifier Client IP address or key
 * @param maxLimit Maximum requests allowed in the window
 * @param windowMs Time window in milliseconds (default 60,000ms = 1 minute)
 */
export function checkRateLimit(
  identifier: string,
  maxLimit = 10,
  windowMs = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(identifier, newEntry);
    return { allowed: true, remaining: maxLimit - 1, resetTime: newEntry.resetTime };
  }

  if (entry.count < maxLimit) {
    entry.count += 1;
    return { allowed: true, remaining: maxLimit - entry.count, resetTime: entry.resetTime };
  }

  return { allowed: false, remaining: 0, resetTime: entry.resetTime };
}

/**
 * Generates a unique correlation/request ID for client error tracking without exposing server internals.
 */
export function generateCorrelationId(): string {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Creates a sanitized error response free of stack traces, internal paths, or database schemas.
 */
export function createSafeErrorResponse(
  message = 'An unexpected error occurred while processing your request.',
  status = 500,
  correlationId?: string
) {
  const id = correlationId || generateCorrelationId();
  return NextResponse.json(
    {
      error: {
        message,
        statusCode: status,
        correlationId: id,
        timestamp: new Date().toISOString(),
      },
    },
    {
      status,
      headers: {
        'X-Correlation-ID': id,
      },
    }
  );
}

/**
 * Validates request origin against allowed hostnames.
 */
export function getCorsHeaders(req: NextRequest): Record<string, string> {
  const origin = req.headers.get('origin');
  const appUrl = process.env.APP_URL;

  const allowedOrigins = [
    appUrl,
    'https://ais-dev-dqlst2g2ojwoun7iri2q3w-1035547944883.asia-southeast1.run.app',
    'https://ais-pre-dqlst2g2ojwoun7iri2q3w-1035547944883.asia-southeast1.run.app',
  ].filter(Boolean);

  const isAllowed = origin && (allowedOrigins.includes(origin) || origin.endsWith('.run.app'));

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : (allowedOrigins[0] || '*'),
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  };
}
