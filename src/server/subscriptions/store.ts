import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export const STRIPE_CUSTOMER_ID_KV = {
  generateKey(userId: string) {
    return `user:${userId}:stiripe-customer-id`;
  },
  async get(userId: string) {
    return await redis.get<string>(this.generateKey(userId));
  },
  async set(userId: string, customerId: string) {
    await redis.set(this.generateKey(userId), customerId);
  },
};

export async function getStripeSubByUserId(userId: string) {
  const stripeCustomerId = await STRIPE_CUSTOMER_ID_KV.get(userId);
  console.log(
    "[Stripe][Get Sub] - Retrieved Stripe Customer ID:",
    stripeCustomerId,
  );
  if (!stripeCustomerId) {
    return null;
  }
  return stripeCustomerId;
}
