export const ORDERTYPE = {
  PICKUP: "Pickup",
  DELIVERY: "Delivery"
} as const;

export type OrderType = typeof ORDERTYPE[keyof typeof ORDERTYPE];