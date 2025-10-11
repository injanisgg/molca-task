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

export const useAreas = () =>
  useQuery({
    queryKey: ["areas"],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<{ data: Area[] }>("/areas", {
          params: { page: 1, limit: 100 },
        });
        return data.data;
      } catch (error) {
        console.error("Failed to fetch areas:", error);
        throw error;
      }
    },
  });

export const useLines = () =>
  useQuery({
    queryKey: ["lines"],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<{ data: Line[] }>("/lines", {
          params: { page: 1, limit: 100 },
        });
        return data.data;
      } catch (error) {
        console.error("Failed to fetch lines:", error);
        throw error;
      }
    },
  });

export const useDateMetadata = (mode: "month" | "year" = "month") =>
  useQuery({
    queryKey: ["dateMetadata", mode],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<{ data: DateMetadata[] | number[] }>(
          "/date/metadata",
          { params: { mode } }
        );
        return data.data;
      } catch (error) {
        console.error("Failed to fetch date metadata:", error);
        throw error;
      }
    },
  });

export const useOEESummary = (areaId: number, month: number, year: number) =>
  useQuery({
    queryKey: ["oees", areaId, month, year],
    queryFn: async () => {
      try {
        console.log(
          `Fetching OEE Summary: areaId=${areaId}, month=${month}, year=${year}`
        );
        const { data } = await apiClient.get<{ data: OEESummary }>("/oees", {
          params: { areaId, month, year },
        });
        console.log("OEE Summary response:", data);
        return data.data;
      } catch (error: any) {
        console.error("Failed to fetch OEE Summary:", error.response?.data || error.message);
        throw error;
      }
    },
    enabled: !!areaId,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
    retryDelay: 1000,
  });

export const useSixBigLosses = (
  areaId: number,
  month: number,
  year: number
) =>
  useQuery({
    queryKey: ["sixBigLosses", areaId, month, year],
    queryFn: async () => {
      try {
        console.log(
          `Fetching Six Big Losses: areaId=${areaId}, month=${month}, year=${year}`
        );
        const { data } = await apiClient.get<{ data: SixBigLoss[] }>(
          "/six-big-losses",
          { params: { areaId, month, year } }
        );
        console.log("Six Big Losses response:", data);
        return data.data;
      } catch (error: any) {
        console.error(
          "Failed to fetch Six Big Losses:",
          error.response?.data || error.message
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

export const useOEETrend = (
  areaId: number,
  month: number,
  year: number,
  mode: "area" | "line" = "area"
) =>
  useQuery({
    queryKey: ["oeesTrend", areaId, month, year, mode],
    queryFn: async () => {
      try {
        console.log(
          `Fetching OEE Trend: areaId=${areaId}, month=${month}, year=${year}, mode=${mode}`
        );
        const { data } = await apiClient.get<{ data: OEETrend[] }>(
          "/oees/trend",
          { params: { areaId, month, year, mode } }
        );
        console.log("OEE Trend response:", data);
        return data.data;
      } catch (error: any) {
        console.error(
          "Failed to fetch OEE Trend:",
          error.response?.data || error.message
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

export const useLosses = (areaId: number, month: number, year: number) =>
  useQuery({
    queryKey: ["losses", areaId, month, year],
    queryFn: async () => {
      try {
        console.log(
          `Fetching Losses: areaId=${areaId}, month=${month}, year=${year}`
        );
        const { data } = await apiClient.get<{ data: Loss }>("/losses", {
          params: { areaId, month, year },
        });
        console.log("Losses response:", data);
        return data.data;
      } catch (error: any) {
        console.error(
          "Failed to fetch Losses:",
          error.response?.data || error.message
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

export const usePareto = (
  areaId: number,
  month: number,
  year: number,
  kind: "DOWNTIME" | "ACTION" | "SCHEDULE" | "QUALITY"
) =>
  useQuery({
    queryKey: ["pareto", areaId, month, year, kind],
    queryFn: async () => {
      try {
        console.log(
          `Fetching Pareto: areaId=${areaId}, month=${month}, year=${year}, kind=${kind}`
        );
        const { data } = await apiClient.get<{ data: ParetoItem[] }>(
          "/pareto",
          { params: { areaId, month, year, kind } }
        );
        console.log("Pareto response:", data);
        return data.data;
      } catch (error: any) {
        console.error(
          "Failed to fetch Pareto:",
          error.response?.data || error.message
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