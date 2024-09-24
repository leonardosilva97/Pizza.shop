import { api } from "../lib/axios";

export type GetDailyOrdersAmountResponse = {
  date: number;
  receipt: number;
}[];

export async function getDailyRevenueInPeriod() {
  const response = await api.get<GetDailyOrdersAmountResponse>(
    "/metrics/daily-receipt-in-period",
  );

  return response.data;
}
