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
        { label: "TEEP", value: summary.teep, unit: "%" },
        { label: "OEE", value: summary.oee, unit: "%" },
        { label: "Utilization", value: summary.utilization, unit: "%" },
        { label: "Availability", value: summary.availability, unit: "%" },
        { label: "Performance", value: summary.performance, unit: "%" },
        { label: "Quality", value: summary.quality, unit: "%" },
        { label: "Achievement", value: summary.achivement, unit: "%" },
      ]
    : [];

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-xl font-bold">OEE Summary</p>
          <p className="text-small text-default-500">
            Overall Equipment Effectiveness Metrics
          </p>
        </div>
      </CardHeader>
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
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center"
              >
                <p className="text-sm text-gray-600 font-semibold">
                  {metric.label}
                </p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
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