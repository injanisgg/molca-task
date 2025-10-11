"use client";

import { ReactNode, Component, ErrorInfo } from "react";
import { Card, CardBody, Button } from "@heroui/react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Card className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <CardBody className="gap-4">
            <p className="text-red-800 dark:text-red-200 font-semibold">
              Something went wrong
            </p>
            <p className="text-sm text-red-700 dark:text-red-300">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <Button color="danger" onPress={this.resetError}>
              Try Again
            </Button>
          </CardBody>
        </Card>
      );
    }

    return this.props.children;
  }
}