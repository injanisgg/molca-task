import { useQuery } from "@tanstack/react-query";
import apiClient from "./api";
import type {
  Area,
  Line,
  OEESummary,
  SixBigLoss,
  OEETrend,
  Loss,
  ParetoItem,
  DateMetadata,
} from "./types";

// === Helper untuk parsing error ===
function parseAPIError(error: unknown): string {
  if (error instanceof Error) return error.message;

  if (typeof error === "object" && error !== null && "message" in error) {
    return (error as { message: string }).message;
  }

  return "Unknown error occurred";
}

// === useAreas ===
export const useAreas = () =>
  useQuery<Area[], Error>({
    queryKey: ["areas"],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<{ data: Area[] }>("/areas", {
          params: { page: 1, limit: 100 },
        });
        return data.data;
      } catch (error: unknown) {
        console.error("Failed to fetch areas:", parseAPIError(error));
        throw error;
      }
    },
  });

// === useLines ===
export const useLines = () =>
  useQuery<Line[], Error>({
    queryKey: ["lines"],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<{ data: Line[] }>("/lines", {
          params: { page: 1, limit: 100 },
        });
        return data.data;
      } catch (error: unknown) {
        console.error("Failed to fetch lines:", parseAPIError(error));
        throw error;
      }
    },
  });

// === useDateMetadata ===
export const useDateMetadata = (mode: "month" | "year" = "month") =>
  useQuery<DateMetadata[] | number[], Error>({
    queryKey: ["dateMetadata", mode],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<{ data: DateMetadata[] | number[] }>(
          "/date/metadata",
          { params: { mode } }
        );
        return data.data;
      } catch (error: unknown) {
        console.error("Failed to fetch date metadata:", parseAPIError(error));
        throw error;
      }
    },
  });

// === useOEESummary ===
export const useOEESummary = (areaId: number, month: number, year: number) =>
  useQuery<OEESummary, Error>({
    queryKey: ["oees", areaId, month, year],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<{ data: OEESummary }>("/oees", {
          params: { areaId, month, year },
        });
        return data.data;
      } catch (error: unknown) {
        console.error(
          "Failed to fetch OEE Summary:",
          parseAPIError(error)
        );
        throw error;
      }
    },
    enabled: !!areaId,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 1,
    retryDelay: 1000,
  });

// === useSixBigLosses ===
export const useSixBigLosses = (areaId: number, month: number, year: number) =>
  useQuery<SixBigLoss[], Error>({
    queryKey: ["sixBigLosses", areaId, month, year],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<{ data: SixBigLoss[] }>(
          "/six-big-losses",
          { params: { areaId, month, year } }
        );
        return data.data;
      } catch (error: unknown) {
        console.error(
          "Failed to fetch Six Big Losses:",
          parseAPIError(error)
        );
        throw error;
      }
    },
    enabled: !!areaId,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 1,
    retryDelay: 1000,
  });

// === useOEETrend ===
export const useOEETrend = (
  areaId: number,
  month: number,
  year: number,
  mode: "area" | "line" = "area"
) =>
  useQuery<OEETrend[], Error>({
    queryKey: ["oeesTrend", areaId, month, year, mode],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<{ data: OEETrend[] }>("/oees/trend", {
          params: { areaId, month, year, mode },
        });
        return data.data;
      } catch (error: unknown) {
        console.error(
          "Failed to fetch OEE Trend:",
          parseAPIError(error)
        );
        throw error;
      }
    },
    enabled: !!areaId,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 1,
    retryDelay: 1000,
  });

// === useLosses ===
export const useLosses = (areaId: number, month: number, year: number) =>
  useQuery<Loss, Error>({
    queryKey: ["losses", areaId, month, year],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<{ data: Loss }>("/losses", {
          params: { areaId, month, year },
        });
        return data.data;
      } catch (error: unknown) {
        console.error(
          "Failed to fetch Losses:",
          parseAPIError(error)
        );
        throw error;
      }
    },
    enabled: !!areaId,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 1,
    retryDelay: 1000,
  });

// === usePareto ===
export const usePareto = (
  areaId: number,
  month: number,
  year: number,
  kind: "DOWNTIME" | "ACTION" | "SCHEDULE" | "QUALITY"
) =>
  useQuery<ParetoItem[], Error>({
    queryKey: ["pareto", areaId, month, year, kind],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<{ data: ParetoItem[] }>("/pareto", {
          params: { areaId, month, year, kind },
        });
        return data.data;
      } catch (error: unknown) {
        console.error(
          "Failed to fetch Pareto:",
          parseAPIError(error)
        );
        throw error;
      }
    },
    enabled: !!areaId,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 1,
    retryDelay: 1000,
  });