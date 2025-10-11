"use client";

import { Button, Tooltip } from "@heroui/react";
import { useState } from "react";
import { exportDashboardToPDF } from "@/app/lib/pdf-export";
import { FileDown } from "lucide-react";

interface PDFExportButtonProps {
  areaId: number | null;
  month: number;
  year: number;
}

export function PDFExportButton({
  areaId,
  month,
  year,
}: PDFExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    if (!areaId) {
      setError("Please select an area first");
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      const fileName = `OEE-Dashboard-${year}-${String(month).padStart(
        2,
        "0"
      )}.pdf`;
      await exportDashboardToPDF(fileName);
    } catch (err) {
      setError("Failed to export PDF. Please try again.");
      console.error("PDF export error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      {error && (
        <div className="text-sm text-red-600 mb-2">{error}</div>
      )}
      <Tooltip content="Download dashboard as PDF">
        <Button
          isIconOnly
          color="primary"
          variant="flat"
          onPress={handleExport}
          disabled={isExporting || !areaId}
          isLoading={isExporting}
          className="rounded-full"
        >
          <FileDown className="h-5 w-5" />
        </Button>
      </Tooltip>
    </>
  );
}