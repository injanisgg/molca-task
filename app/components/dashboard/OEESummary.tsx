"use client";

import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import { useOEESummary } from "@/app/lib/queries";
import { AlertCircle } from "lucide-react";

interface OEESummaryProps {
  areaId: number;
  month: number;
  year: number;
}

export function OEESummary({ areaId, month, year }: OEESummaryProps) {
  const { data: summary, isLoading, error } = useOEESummary(areaId, month, year);

  const metrics = summary
    ? [
        { label: "TEEP", value: summary.teep, unit: "%", color: 'text-emerald-500' },
        { label: "OEE", value: summary.oee, unit: "%", color: 'text-amber-500' },
        { label: "Utilization", value: summary.utilization, unit: "%", color: 'text-emerald-500' },
        { label: "Availability", value: summary.availability, unit: "%", color: 'text-emerald-500' },
        { label: "Performance", value: summary.performance, unit: "%", color: 'text-emerald-500' },
        { label: "Quality", value: summary.quality, unit: "%", color: 'text-emerald-500' },
        { label: "Achievement", value: summary.achivement, unit: "%", color: 'text-blue-500' },
      ]
    : [];

  return (
    <Card className="w-full">
      <CardBody>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="rounded-lg h-24" />
            ))}
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm font-semibold text-orange-800">
                No data available
              </p>
              <p className="text-xs text-orange-700">
                OEE data not found for Area {areaId}, {month}/{year}. Try selecting a different area or period.
              </p>
            </div>
          </div>
        ) : metrics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-4 text-center"
              >
                <p className="text-sm text-gray-600 font-semibold">
                  {metric.label}
                </p>
                <p className={`text-3xl font-bold ${metric.color} mt-2`}>
                  {metric.value}
                  <span className="text-lg">{metric.unit}</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No data available
          </p>
        )}
      </CardBody>
    </Card>
  );
}