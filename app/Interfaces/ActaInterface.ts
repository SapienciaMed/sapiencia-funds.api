import { IActaItems } from "./ActaItemsInterface";

export interface IActa {
    id?: number;
    numberProject: number;
    periodVigency: number;
    announcementInitial: number;
    salaryMin: number;
    costsExpenses: number;
    OperatorCommission: number;
    financialOperation: number;
    creationDate: string;
    idStatus: number;
    items: IActaItems[];
}