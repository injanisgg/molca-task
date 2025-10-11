"use client";

import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  PieLabelRenderProps
} from "recharts";
import { useLosses } from "@/app/lib/queries";
import { AlertCircle } from "lucide-react";

interface LossesDistributionProps {
  areaId: number;
  month: number;
  year: number;
}

const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6"];

export function LossesDistribution({
  areaId,
  month,
  year,
}: LossesDistributionProps) {
  const { data: lossesData, isLoading, error } = useLosses(areaId, month, year);

  const pieData = lossesData
    ? [
        { name: "Availability", value: parseFloat(lossesData.availability) },
        { name: "Performance", value: parseFloat(lossesData.performance) },
        { name: "Quality", value: parseFloat(lossesData.quality) },
        { name: "Schedule", value: parseFloat(lossesData.schedule) },
      ]
    : [];

  const pieData2 = lossesData
    ? [
        {
          name: "VA Operating Time",
          value: lossesData.totCalendarTime,
        },
        {
          name: "Losses",
          value: lossesData.totOeeLoss,
        },
      ]
    : [];

  const ErrorCard = () => (
    <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
      <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
      <div>
        <p className="text-sm font-semibold text-orange-800">
          No data available
        </p>
        <p className="text-xs text-orange-700">
          Losses distribution data not found for this period.
        </p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="w-full">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-lg font-bold">Calendar Time</p>
            <p className="text-small text-default-500">
              Calendar time vs OEE loss
            </p>
          </div>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <Skeleton className="rounded-lg h-96" />
          ) : error ? (
            <ErrorCard />
          ) : pieData2.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData2}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }: PieLabelRenderProps) => {
                    if (typeof value === "number") {
                      return `${name}: ${value.toFixed(2)}%`;
                    }
                    return name;
                  }}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 py-16">
              No time data available
            </p>
          )}
        </CardBody>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-lg font-bold">OEE Losses (%)</p>
            <p className="text-small text-default-500">
              Breakdown of losses by category
            </p>
          </div>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <Skeleton className="rounded-lg h-96" />
          ) : error ? (
            <ErrorCard />
          ) : pieData.length > 0 && pieData.some((d) => d.value > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }: PieLabelRenderProps) => {
                    if (typeof value === "number") {
                      return `${name}: ${value.toFixed(2)}%`;
                    }
                    return name;
                  }}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 py-16">
              No loss data available
            </p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}