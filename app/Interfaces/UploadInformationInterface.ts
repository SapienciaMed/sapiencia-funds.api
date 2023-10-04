import { DateTime } from "luxon";

export interface IUploadInformation {
    id?: number;
    commune: string
    validity: string;
    information:string;
    fileName?: string;
    dateUpload: DateTime;
    
}

export interface IUploadInformationFilters {
    id?: number;
    commune: string
    validity: string;
    information:string;
    page: number;
    perPage: number;
}