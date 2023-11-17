import { IActaItems } from "./ActaItemsInterface";
import { ICitation } from "./CitationInterface";

export interface IActa {
    id?: number;
    lastId?: number;
    numberProject: number;
    periodVigency: number;
    announcementInitial: string;
    salaryMin: number;
    costsExpenses: number;
    OperatorCommission: number;
    financialOperation: number;
    creationDate?: string;
    idStatus: number;
    items: IActaItems[];
    citation?: ICitation[];
}