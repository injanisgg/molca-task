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

export function handleAPIError(error: any): APIError {
  if (error.response) {
    return new APIError(
      error.response.status,
      error.response.data?.message || error.message || "An error occurred",
      error.config?.url
    );
  } else if (error.request) {
    return new APIError(0, "No response from server", error.config?.url);
  } else {
    return new APIError(0, error.message || "Unknown error occurred");
  }
}