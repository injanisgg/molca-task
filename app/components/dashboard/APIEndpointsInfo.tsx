"use client";

import { Card, CardBody, CardHeader, Divider, Code } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function APIEndpointsInfo() {
  const [isOpen, setIsOpen] = useState(false);

  const endpoints = [
    {
      method: "GET",
      path: "/areas",
      description: "Get list of areas",
      params: "page=1&limit=10",
    },
    {
      method: "GET",
      path: "/lines",
      description: "Get list of lines",
      params: "page=1&limit=10",
    },
    {
      method: "GET",
      path: "/oees",
      description: "Get OEE summary",
      params: "areaId=1&month=1&year=2025",
    },
    {
      method: "GET",
      path: "/six-big-losses",
      description: "Get six big losses",
      params: "areaId=1&month=1&year=2025",
    },
    {
      method: "GET",
      path: "/oees/trend",
      description: "Get OEE trend",
      params: "areaId=1&month=1&year=2025&mode=area",
    },
    {
      method: "GET",
      path: "/losses",
      description: "Get losses data",
      params: "areaId=1&month=1&year=2025",
    },
    {
      method: "GET",
      path: "/pareto",
      description: "Get pareto data",
      params: "areaId=1&month=1&year=2025&kind=DOWNTIME",
    },
    {
      method: "GET",
      path: "/date/metadata",
      description: "Get date metadata",
      params: "mode=month|year",
    },
  ];

  return (
    <Card className="w-full bg-gray-50 dark:bg-gray-800">
      <CardHeader
        className="flex gap-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col flex-1">
          <p className="text-lg font-bold">API Documentation</p>
          <p className="text-small text-default-500">
            Available endpoints for this dashboard
          </p>
        </div>
        <ChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </CardHeader>

      {isOpen && (
        <>
          <Divider />
          <CardBody className="gap-4">
            {endpoints.map((endpoint, idx) => (
              <div key={idx} className="space-y-2 pb-4 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 text-xs font-bold text-white bg-blue-500 rounded">
                    {endpoint.method}
                  </span>
                  <Code>{endpoint.path}</Code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {endpoint.description}
                </p>
                <p className="text-xs text-gray-500">
                  <span className="font-semibold">Query:</span> {endpoint.params}
                </p>
              </div>
            ))}
          </CardBody>
        </>
      )}
    </Card>
  );
}