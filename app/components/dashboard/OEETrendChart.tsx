"use client";

import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useOEETrend } from "@/app/lib/queries";
import { AlertCircle } from "lucide-react";

interface OEETrendChartProps {
  areaId: number;
  month: number;
  year: number;
}

export function OEETrendChart({
  areaId,
  month,
  year,
}: OEETrendChartProps) {
  const { data: trendData = [], isLoading, error } = useOEETrend(
    areaId,
    month,
    year,
    "area"
  );

  const chartData = trendData.map((item) => ({
    ...item,
    oee: parseFloat(item.oee),
  }));

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-xl font-bold">OEE Trend</p>
          <p className="text-small text-default-500">
            Daily OEE performance trend
          </p>
        </div>
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <Skeleton className="rounded-lg h-96" />
        ) : error ? (
          <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm font-semibold text-orange-800">
                No data available
              </p>
              <p className="text-xs text-orange-700">
                OEE Trend data not found for this period.
              </p>
            </div>
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                stroke="#888"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="#888"
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
                label={{ value: "OEE (%)", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="oee"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 6 }}
                name="OEE (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500 py-16">
            No trend data available
          </p>
        )}
      </CardBody>
    </Card>
  );
}