"use client";

import { Alert, Button } from "@heroui/react";
import { AlertTriangle, X } from "lucide-react";

interface ErrorAlertProps {
  error: string | null;
  onClose: () => void;
  retry?: () => void;
}

export function ErrorAlert({ error, onClose, retry }: ErrorAlertProps) {
  if (!error) return null;

  return (
    <Alert
      icon={<AlertTriangle className="h-4 w-4" />}
      color="danger"
      className="mb-4"
      endContent={
        <div className="flex gap-2">
          {retry && (
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={retry}
            >
              Retry
            </Button>
          )}
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onPress={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      }
    >
      <p>{error}</p>
    </Alert>
  );
}