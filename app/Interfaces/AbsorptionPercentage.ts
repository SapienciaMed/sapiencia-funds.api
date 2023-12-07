import { DateTime } from "luxon";
export type IAbsorptionPercentaje = {
  id: number;
  announcementId: number;
  communeFundId: number;
  resource: number;
  sceneryPercentage1: number;
  sceneryPercentage2: number;
  sceneryPercentage3: number;
  sceneryValue1: number;
  sceneryValue2: number;
  sceneryValue3: number;
  userModified: string;
  updatedAt: DateTime;
  userCreated: string;
  createdAt: DateTime;
};
export type IAbsortionPercentageCreateSchema = {
  announcementId: number;
  communeFundId: number;
  sceneryPercentage1: number;
  sceneryPercentage2: number;
  sceneryPercentage3: number;
};
export type IAbsortionPercentageUpdateSchema =
  Partial<IAbsortionPercentageCreateSchema>;
export type IAbsortionPercentageFullCreateSchema = {
  announcementId: number;
  communeFundId: number;
  resource: number;
  sceneryPercentage1: number;
  sceneryPercentage2: number;
  sceneryPercentage3: number;
  sceneryValue1: number;
  sceneryValue2: number;
  sceneryValue3: number;
  userCreated: string;
};
export type ICommuneResource = {
  comuna: number;
  recurso: string;
};
export type IAbsortionPercentagePaginatedFilters = {
  announcementId?: number;
  page: number;
  perPage: number;
};
export type IAbsortionPercentagePayload = {
  announcementId?: number;
  communeFundId?: number;
  resource?: number;
  sceneryPercentage1?: number;
  sceneryPercentage2?: number;
  sceneryPercentage3?: number;
  sceneryValue1?: number;
  sceneryValue2?: number;
  sceneryValue3?: number;
  userModified: string;
};
