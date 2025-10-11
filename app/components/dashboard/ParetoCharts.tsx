"use client";

import { Card, CardBody, CardHeader, Skeleton, Tabs, Tab } from "@heroui/react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { usePareto } from "@/app/lib/queries";
import { AlertCircle } from "lucide-react";

interface ParetoChartsProps {
  areaId: number;
  month: number;
  year: number;
}

type ParetoKind = "DOWNTIME" | "ACTION" | "SCHEDULE" | "QUALITY";

interface ParetoChartItem {
  reason: string;
  count: number;
  cumulative: number;
  cumulativePercent: number;
}

export function ParetoCharts({
  areaId,
  month,
  year,
}: ParetoChartsProps) {
  const kinds: ParetoKind[] = ["DOWNTIME", "ACTION", "SCHEDULE", "QUALITY"];
  const queries = kinds.map((kind) => ({
    kind,
    ...usePareto(areaId, month, year, kind),
  }));

  const transformToParetoData = (data: any[]): ParetoChartItem[] => {
    const aggregated: { [key: string]: number } = {};
    data.forEach((item) => {
      aggregated[item.reason] = (aggregated[item.reason] || 0) + parseFloat(item.duration);
    });

    const sorted = Object.entries(aggregated)
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const total = sorted.reduce((sum, item) => sum + item.count, 0);
    let cumulative = 0;

    return sorted.map((item) => {
      cumulative += item.count;
      return {
        ...item,
        cumulative,
        cumulativePercent: (cumulative / total) * 100,
      };
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-xl font-bold">Pareto Analysis</p>
          <p className="text-small text-default-500">
            80/20 analysis for different loss categories
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <Tabs
          aria-label="Pareto charts"
          className="w-full"
          color="primary"
        >
          {queries.map((query) => {
            const paretoData = transformToParetoData(query.data || []);
            return (
              <Tab key={query.kind} title={query.kind} className="w-full">
                {query.isLoading ? (
                  <Skeleton className="rounded-lg h-96 mt-4" />
                ) : query.error ? (
                  <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg mt-4">
                    <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-orange-800">
                        No data available
                      </p>
                      <p className="text-xs text-orange-700">
                        {query.kind} Pareto data not found for this period.
                      </p>
                    </div>
                  </div>
                ) : paretoData.length > 0 ? (
                  <ResponsiveContainer
                    width="100%"
                    height={400}
                    className="mt-4"
                  >
                    <BarChart data={paretoData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="reason"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        yAxisId="left"
                        stroke="#3b82f6"
                        label={{
                          value: "Duration (min)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#ef4444"
                        domain={[0, 100]}
                        label={{
                          value: "Cumulative %",
                          angle: 90,
                          position: "insideRight",
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #ccc",
                        }}
                      />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey="count"
                        fill="#3b82f6"
                        name="Duration (min)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="cumulativePercent"
                        stroke="#ef4444"
                        strokeWidth={2}
                        name="Cumulative %"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-gray-500 py-16 mt-4">
                    No data available
                  </p>
                )}
              </Tab>
            );
          })}
        </Tabs>
      </CardBody>
    </Card>
  );
}