import { DateTime } from "luxon";
export type ILegalized = {
  id: number;
  announcementId: number;
  communeFundId: number;
  resource: number;
  fiduciaryId: number;
  order: number;
  userModified: string;
  updatedAt: DateTime;
};
export type ILegalizedPaginatedFilters = {
  announcementId: number;
};
export type ILegalizedItem = {
  communeFundId: number;
  resource: number;
  fiduciaryId: number;
  order: number;
  fiduciaryName: string;
};
