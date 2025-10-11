"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, Spinner } from "@heroui/react";
import { FilterBar } from "../dashboard/FilterBar";
import { OEESummary } from "../dashboard/OEESummary";
import { SixBigLosses } from "../dashboard/SixBigLosses";
import { OEETrendChart } from "../dashboard/OEETrendChart";
import { ParetoCharts } from "../dashboard/ParetoCharts";
import { LossesDistribution } from "../dashboard/LossesDistribution";
import { PDFExportButton } from "../dashboard/PDFExportButton";
import { ErrorBoundary } from "../dashboard/ErrorBoundary";
import { APIEndpointsInfo } from "../dashboard/APIEndpointsInfo";

export function DashboardLayout() {
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-8 gap-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900">
                OEE Monitoring Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Overall Equipment Effectiveness Monitoring and Analysis
              </p>
            </div>
            <div className="flex gap-2 items-center flex-shrink-0">
              <PDFExportButton
                areaId={selectedArea}
                month={selectedMonth}
                year={selectedYear}
              />
            </div>
          </div>

          {/* Filter Bar */}
          <FilterBar
            selectedArea={selectedArea}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onAreaChange={setSelectedArea}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
          />

          {/* Main Content */}
          {selectedArea ? (
            <div id="dashboard-content" className="space-y-6">
              <OEESummary
                areaId={selectedArea}
                month={selectedMonth}
                year={selectedYear}
              />

              <OEETrendChart
                areaId={selectedArea}
                month={selectedMonth}
                year={selectedYear}
              />

              <LossesDistribution
                areaId={selectedArea}
                month={selectedMonth}
                year={selectedYear}
              />

              <SixBigLosses
                areaId={selectedArea}
                month={selectedMonth}
                year={selectedYear}
              />

              <ParetoCharts
                areaId={selectedArea}
                month={selectedMonth}
                year={selectedYear}
              />
            </div>
          ) : (
            <Card>
              <CardBody className="flex items-center justify-center py-16">
                <p className="text-lg text-gray-500">
                  Please select an area to view the dashboard
                </p>
              </CardBody>
            </Card>
          )}

          {/* API Documentation */}
          <APIEndpointsInfo />
        </div>
      </div>
    </ErrorBoundary>
  );
}