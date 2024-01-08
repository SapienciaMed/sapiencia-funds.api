import { ISpinsBeneficiary } from "../Interfaces/SpinsBeneficiaryInterfaces";
import HistoricalGeneralTwists from "../Models/Dtf_financiera/HistoricalGeneralTwists";

export interface ISpinsBeneficiariesConsolidateRepository {
  spinsSearch1(body: ISpinsBeneficiary): Promise<any[] | null>;
  spinsSearch2(body: ISpinsBeneficiary): Promise<any[] | null>;
  spinsSearch3(body: ISpinsBeneficiary): Promise<any[] | null>;
}

export default class SpinsBeneficiariesConsolidateRepository
  implements ISpinsBeneficiariesConsolidateRepository
{
  constructor() {}

  async spinsSearch1(body: ISpinsBeneficiary): Promise<any[] | null> {
    //TODO: Aquí ira el procesamiento de la fuente 1 respectiva combinada con el modelo de BeneficiariesConsolidate
    //TODO: así como también el modelo de Sapiencia HistoricalCreditStatements (Sub carpeta Sapiencia de los modelos)
    console.log({ body });
    return ["Hola, fuente 1"];
  }

  async spinsSearch2(body: ISpinsBeneficiary): Promise<any[] | null> {
    console.log(body);
    const res = await HistoricalGeneralTwists.query().where("solicitud", 4);

    const infoRotatedValues = res.map((i) => {
      return {
        beneficiaryDocument: i.document,
        announcement: i.announcement,
        fiduciaryAssignment: i.fiduciaryAssignment,
        supportPaymentOrder: i.supportPaymentOrder,
        registrationPaymentOrder: i.registrationPaymentOrder,
        period: i.period,
        requestedDrafts: i.requestedDrafts,
        turnsMade: i.turnsMade,
        maintenanceConsignment: i.maintenanceConsignment,
        dedbitValue: i.dedbitValue,
        actualDebitValue: i.actualDebitValue,
        registrationLiquidationValue: i.registrationLiquidationValue,
        valueToPayTuition: i.valueToPayTuition,
        valueToPaySupport: i.valueToPaySupport,
        spinValue: i.spinValue,
        registrationDate: i.registrationDate,
        observation: i.observation,
        fund: i.fund,
        idCredito: i.newApplicationTrustee,
      };
    });

    return infoRotatedValues;
  }

  async spinsSearch3(body: ISpinsBeneficiary): Promise<any[] | null> {
    //TODO: Aquí ira el procesamiento de la fuente 3 respectiva combinada con el modelo de BeneficiariesConsolidate
    //TODO: así como también el modelo de Sapiencia HistoricalCreditStatements (Sub carpeta Sapiencia de los modelos)
    console.log({ body });
    return ["Hola, fuente 3"];
  }
}
