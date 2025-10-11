export interface Area {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Line {
  id: number;
  areaId: number;
  code: string;
  name: string;
  category: "BULK" | "PACKAGE";
  createdAt: string;
  updatedAt: string;
}

export interface OEESummary {
  teep: string;
  oee: string;
  utilization: string;
  availability: string;
  performance: string;
  quality: string;
  achivement: string;
}

export interface SixBigLoss {
  type: "AVAILABILITY_LOSS" | "QUALITY_LOSS";
  duration: string;
  machineNumber: string;
  lineName: string;
  reason: string;
}

export interface OEETrend {
  date: string;
  oee: string;
}

export interface Loss {
  lossess: string;
  va: string;
  availability: string;
  schedule: string;
  performance: string;
  quality: string;
  totCalendarTime: number;
  totOeeLoss: number;
}

export interface ParetoItem {
  type: "DOWNTIME" | "ACTION" | "SCHEDULE" | "QUALITY";
  duration: string;
  machineNumber: string;
  reason: string;
  lineName: string;
}

export interface DateMetadata {
  monthNumber: number;
  monthName: string;
  monSlug: string;
}