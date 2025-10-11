"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from "@heroui/react";
import { useSixBigLosses } from "@/app/lib/queries";
import { AlertCircle } from "lucide-react";

interface SixBigLossesProps {
  areaId: number;
  month: number;
  year: number;
}

export function SixBigLosses({ areaId, month, year }: SixBigLossesProps) {
  const { data: losses = [], isLoading, error } = useSixBigLosses(
    areaId,
    month,
    year
  );

  const getLossBadgeColor = (type: string) => {
    return type === "AVAILABILITY_LOSS" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800";
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-xl font-bold">Six Big Losses</p>
          <p className="text-small text-default-500">
            Top equipment losses and issues
          </p>
        </div>
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="rounded-lg h-12" />
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
                Six Big Losses data not found for this period.
              </p>
            </div>
          </div>
        ) : losses.length > 0 ? (
          <Table
            removeWrapper
            aria-label="Six Big Losses Table"
            className="overflow-x-auto"
          >
            <TableHeader>
              <TableColumn>Type</TableColumn>
              <TableColumn>Line Name</TableColumn>
              <TableColumn>Machine #</TableColumn>
              <TableColumn>Duration (min)</TableColumn>
              <TableColumn>Reason</TableColumn>
            </TableHeader>
            <TableBody>
              {losses.map((loss, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded text-sm font-semibold ${getLossBadgeColor(loss.type)}`}
                    >
                      {loss.type.replace(/_/g, " ")}
                    </span>
                  </TableCell>
                  <TableCell>{loss.lineName}</TableCell>
                  <TableCell className="font-semibold">
                    {loss.machineNumber}
                  </TableCell>
                  <TableCell>{loss.duration}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {loss.reason}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-gray-500">No losses recorded</p>
        )}
      </CardBody>
    </Card>
  );
}