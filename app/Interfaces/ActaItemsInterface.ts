export interface IActaItems {
    id?: number;
    idFound: number;
    idLine: number;
    idAnnouncement?: number;
    idConcept: number;
    costOperation: string;
    periods?: {
        valuePeriod1?:number,
        valuePeriod2?:number,
        quantityPeriod1?:number,
        quantityPeriod2?:number,
    };
    subtotalVigency: number;
    costBillsOperation: number;
    net: number;
    financialOperatorCommission: number;
    resourcesCredit: number;
    idProgram: number;
    idActa?: number;
}
