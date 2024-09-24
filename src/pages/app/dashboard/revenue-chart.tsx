import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
} from "recharts";
import colors from "tailwindcss/colors";
import { getDailyRevenueInPeriod } from "../../../api/get-daily-revenue-in-period";

export function RevenueChart() {
  const { data: dailyRevenuePeriod } = useQuery({
    queryKey: ["metrics", "daily-revenue-in-period"],
    queryFn: getDailyRevenueInPeriod,
  });

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      {dailyRevenuePeriod && (
        <CardContent>
          <ResponsiveContainer width={"100%"} height={240}>
            <LineChart data={dailyRevenuePeriod} style={{ fontSize: 12 }}>
              <XAxis
                dataKey={"date"}
                tickLine={false}
                axisLine={false}
                dy={16}
              />
              <YAxis
                width={80}
                stroke="#888"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Line
                type={"linear"}
                strokeWidth={2}
                dataKey={"receipt"}
                stroke={colors["violet"]["500"]}
              ></Line>
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      )}
    </Card>
  );
}
