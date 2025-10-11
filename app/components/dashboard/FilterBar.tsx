"use client";

import { Select, SelectItem, Button, Card, CardBody } from "@heroui/react";
import { PDFExportButton } from "./PDFExportButton";
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

  const getFirstKeyValue = (keys: Selection): number | null => {
    if (keys === "all") return null;
    const val = Array.from(keys)[0];
    return typeof val === "string" ? parseInt(val, 10) : null;
  };

  const availableArea = areas.find(a => a.id === selectedArea);
  const availableMonth = months.find(m => m.monthNumber === selectedMonth);
  const availableYear = years.find(y => y === selectedYear);

  return (
    <Card className="w-full p-1 border border-gray-200 rounded-lg px-5 py-3">
      <CardBody>
        <div className="flex justify-between px-2">
          <div className="grid grid-cols-1 md:grid-cols-[fit-content(100%)_1fr_1fr_1fr] gap-4">
            <h2 className="text-xl font-bold">Filter: </h2>
            {/* === YEAR SELECT === */}
            <Select
              label="Select Year"
              placeholder="Year"
              labelPlacement="outside"
              classNames={{
                trigger: "w-40 flex justify-between items-center text-left bg-gray-100 rounded-lg p-2",
                selectorIcon: "order-last ml-auto", 
                value: "text-left",
                listbox: "shadow-lg rounded-lg", 
              }}
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


            {/* === MONTH SELECT === */}
            <Select
              label="Select Month"
              placeholder="Month"
              selectedKeys={
                availableMonth ? new Set([availableMonth.monthNumber.toString()]) : new Set()
              }
              onSelectionChange={(keys) => {
                const val = getFirstKeyValue(keys);
                if (val !== null) onMonthChange(val);
              }}
              labelPlacement="outside"
              classNames={{
                trigger: "w-40 flex justify-between items-center text-left bg-gray-100 rounded-lg p-2",
                selectorIcon: "order-last ml-auto", 
                value: "text-left",
                listbox: "shadow-lg rounded-lg", 
              }}
            >
              {months.map((m: DateMetadata) => (
                <SelectItem key={m.monthNumber.toString()} textValue={m.monthName}>
                  {m.monthName}
                </SelectItem>
              ))}
            </Select>

            {/* === AREA SELECT === */}
            <Select
              label="Select Area"
              placeholder="Area"
              selectedKeys={
                availableArea ? new Set([availableArea.id.toString()]) : new Set()
              }
              onSelectionChange={(keys) => {
                const val = getFirstKeyValue(keys);
                if (val !== null) onAreaChange(val);
              }}
              isDisabled={areasLoading}
              labelPlacement="outside"
              classNames={{
                trigger: "w-40 flex justify-between items-center text-left bg-gray-100 rounded-lg p-2",
                selectorIcon: "order-last ml-auto", 
                value: "text-left",
                listbox: "shadow-lg rounded-lg", 
              }}
            >
              {areas.map((area: Area) => (
                <SelectItem key={area.id.toString()} textValue={area.name}>{area.name}</SelectItem>
              ))}
            </Select>

            {/* === APPLY BUTTON === */}
            {/* <div className="flex items-end">
              <Button
                color="primary"
                className="w-full"
                disabled={!selectedArea}
              >
                Apply Filter
              </Button>
            </div> */}
          </div>
          <PDFExportButton
            areaId={selectedArea}
            month={selectedMonth}
            year={selectedYear}
          />
        </div>
      </CardBody>
    </Card>
  );
}