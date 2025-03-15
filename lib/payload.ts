import type { InitOptions } from "payload";
import config from "../payload.config";
import { getPayload } from "payload";

// Cache the Payload instance in development
let cachedPayload: any = null;

if (process.env.NODE_ENV === "production") {
  // In production, we create a new instance for each request
  cachedPayload = null;
}

export const getPayloadClient = async (options: Partial<InitOptions> = {}) => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET environment variable is missing");
  }

  if (cachedPayload) {
    return cachedPayload;
  }

  // Initialize Payload
  const payload = await getPayload({
    // Pass the config
    config,
    // Configure local API

    // Include any custom options
    ...options,
  });

  // Cache the Payload instance in development
  if (process.env.NODE_ENV === "development") {
    cachedPayload = payload;
  }

  return payload;
};
