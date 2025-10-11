import { AxiosError } from "axios";

export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public endpoint?: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

export function handleAPIError(error: unknown): APIError {
  if (error instanceof Error) {
    return new APIError(0, error.message);
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    return new APIError(0, (error as { message: string }).message);
  }

  return new APIError(0, "Unknown error occurred");
}