export interface IAuroraEfe {
  id: number;
  period: number;
  periodDescription: string;
  pSelection: number;
  pSelectionDescription: string;
  idFund: number;
  fund: string;
  document: number;
  name: string;
  email: string;
  cellPhone: string;
  modalityBenefit: string;
  periodRenew: string;
  semesterLevelRenew: string;
  accumulatedAverage: string;
  dateUpdate: string;
}

export interface IAuroraEPM {
  id: number;
  period: number;
  periodDescription: string;
  pSelection: number;
  pSelectionDescription: string;
  idFund: number;
  fund: string;
  document: string;
  name: string;
  email: string;
  cellPhone: string;
  modalityBenefit: string;
  periodRenew: number;
  semesterLevelRenew: string;
  accumulatedAverage: string;
  performService: string;
  hoursServicePerform: string;
  operator: string;
}

export interface IAuroraPP {
  id: number;
  period: number;
  periodDescription: string;
  pSelection: number;
  pSelectionDescription: string;
  idFund: number;
  fund: string;
  document: string;
  name: string;
  email: string;
  cellPhone: string;
  communeBeneficiary: string;
  modalityBenefit: string;
  renewPeriod: number;
  periodRenew: string;
  accumulatedAverage: string;
  performServiceSocial: string;
  hoursServicePerform: string;
  operator: string;
}

export interface IAuroraFa {
  id: number;
  period: number;
  periodDescription: string;
  pSelection: number;
  pSelectionDescription: string;
  idFund: number;
  fund: string;
  document: string;
  name: string;
  email: string;
  cellPhone: string;
  modalityBenefit: string;
  renewPeriod: number;
  periodRenew: string;
  accumulatedAverage: string;
  dateUpdate: string;
}

export interface IAuroraEM {
  id: number;
  period: number;
  periodDetail: string;
  pSelection: string;
  pSelectionDescription: string;
  idFund: number;
  fund: String;
  document: string;
  name: string;
  email: string;
  cellPhone: string;
  returnDate: string;
  commune: number;
  modality: string;
  score: number;
  dollarPrice: number;
  dollarValue: number;
  pesosValue: number;
  periodCalculate: number;
  observation: string;
  dateCalculation: string;
  idTrust: number;
  order: number;
  totalDays: number;
}
