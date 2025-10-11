"use client";

import { Select, SelectItem, Button, Card, CardBody } from "@heroui/react";
import { useAreas, useDateMetadata } from "@/app/lib/queries";
import type { Area, DateMetadata } from "@/app/lib/types";
import type { Selection } from "@react-types/shared";

interface FilterBarProps {
  selectedArea: number | null;
  selectedMonth: number;
  selectedYear: number;
  onAreaChange: (areaId: number) => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export function FilterBar({
  selectedArea,
  selectedMonth,
  selectedYear,
  onAreaChange,
  onMonthChange,
  onYearChange,
}: FilterBarProps) {
  const { data: areas = [], isLoading: areasLoading } = useAreas();
  const { data: monthsData = [] } = useDateMetadata("month");
  const { data: yearsData = [] } = useDateMetadata("year");

  const months = monthsData as DateMetadata[];
  const years = yearsData as number[];

  // Helper buat ambil 1 nilai dari keys
  const getFirstKeyValue = (keys: Selection): number | null => {
    if (keys === "all") return null;
    const val = Array.from(keys)[0];
    return typeof val === "string" ? parseInt(val, 10) : null;
  };

  // Find available selections to avoid warnings
  const availableArea = areas.find(a => a.id === selectedArea);
  const availableMonth = months.find(m => m.monthNumber === selectedMonth);
  const availableYear = years.find(y => y === selectedYear);

  return (
    <Card className="w-full">
      <CardBody className="gap-4">
        <h2 className="text-xl font-bold">Filter Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* === AREA SELECT === */}
          <Select
            label="Select Area"
            placeholder="Choose an area"
            selectedKeys={
              availableArea ? new Set([availableArea.id.toString()]) : new Set()
            }
            onSelectionChange={(keys) => {
              const val = getFirstKeyValue(keys);
              if (val !== null) onAreaChange(val);
            }}
            isDisabled={areasLoading}
          >
            {areas.map((area: Area) => (
              <SelectItem key={area.id.toString()} textValue={area.name}>{area.name}</SelectItem>
            ))}
          </Select>

          {/* === MONTH SELECT === */}
          <Select
            label="Select Month"
            placeholder="Choose a month"
            selectedKeys={
              availableMonth ? new Set([availableMonth.monthNumber.toString()]) : new Set()
            }
            onSelectionChange={(keys) => {
              const val = getFirstKeyValue(keys);
              if (val !== null) onMonthChange(val);
            }}
          >
            {months.map((m: DateMetadata) => (
              <SelectItem key={m.monthNumber.toString()} textValue={m.monthName}>
                {m.monthName}
              </SelectItem>
            ))}
          </Select>

          {/* === YEAR SELECT === */}
          <Select
            label="Select Year"
            placeholder="Choose a year"
            selectedKeys={
              availableYear ? new Set([availableYear.toString()]) : new Set()
            }
            onSelectionChange={(keys) => {
              const val = getFirstKeyValue(keys);
              if (val !== null) onYearChange(val);
            }}
          >
            {years.map((year: number) => (
              <SelectItem key={year.toString()} textValue={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </Select>

          {/* === APPLY BUTTON === */}
          <div className="flex items-end">
            <Button
              color="primary"
              className="w-full"
              disabled={!selectedArea}
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}