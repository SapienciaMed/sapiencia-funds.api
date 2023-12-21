import { DateTime } from "luxon";
export type ILegalized = {
  id: number;
  announcementId: number;
  communeFundId: number;
  resource: number;
  fiduciaryId: number;
  order: number;
  updatedDate: DateTime;
  userModified: string;
  updatedAt: DateTime;
  userCreated: string;
  createdAt: DateTime;
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
