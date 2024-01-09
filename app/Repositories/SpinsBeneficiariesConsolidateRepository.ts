import { ISpinsBeneficiary, ISearchInResource1 } from '../Interfaces/SpinsBeneficiaryInterfaces';
import HistoricalGeneralTwists from "../Models/Dtf_financiera/HistoricalGeneralTwists";
import BeneficiaryRenewTransfer from '../Models/Sapiencia/BeneficaryRenewTransfer';
import BeneficiariesConsolidate from '../Models/BeneficiariesConsolidate';

export interface ISpinsBeneficiariesConsolidateRepository {
  spinsSearch1(body: ISpinsBeneficiary): Promise<ISearchInResource1[] | null>;
  spinsSearch2(body: ISpinsBeneficiary): Promise<any[] | null>;
  spinsSearch3(body: ISpinsBeneficiary): Promise<any[] | null>;
}

export default class SpinsBeneficiariesConsolidateRepository implements ISpinsBeneficiariesConsolidateRepository {

  constructor() {}

  async spinsSearch1(body: ISpinsBeneficiary): Promise<ISearchInResource1[] | null> {

    const { page, perPage, userId } = body;
    const valuesForAdd: ISearchInResource1[] = [];

    const getBeneficiariesOfAurora = await BeneficiariesConsolidate.query();
    const idUser = getBeneficiariesOfAurora.map( ({ sapienciaUserCode }) => sapienciaUserCode );

    const searchInView = await BeneficiaryRenewTransfer
      .query()
      .whereIn("id", idUser);

    //Debo buscar el id crédito que está en la view vw_giros_general_historico_ies
    const getCreditId = await HistoricalGeneralTwists
      .query()
      .where("solicitud", idUser)
      .select("newApplicationTrustee")
      .limit(1);

    const creditIdUse: string = getCreditId[0].newApplicationTrustee ?? "";

    const infoRotatedValues1 = searchInView.map((res) => {

      const objConsolidation: ISearchInResource1 = {
        creditId: creditIdUse,
        fiducyContract: res.contractNumber ,
        legalPeriod: res.PeriodLegalization ,
        documentBeneficiary: res.document ,
        fundId: res.idFund ,
        fundName: res.fundName ,
        projectedSemesters: res.projectedSemesterNumber ,
        modality: res.modalityType ,
        periods: res.totalSemester ,
        enrollmentProjectecValue: res.projectedValueEnrollment ,
        sustentedProjectecValue: res.projectedValueSustenance ,
        semestersRenew: res.renewSemesterNumber ,
        enrollmentRenewValue: res.enrollmentRenewValue ,
        sustentedRenewValue: res.sustenanceRenewValue ,
        enrollmentSpinValue: res.enrollmentTransferValue ,
        sustentedSpinValue: res.sustenanceTransferValue ,
      }

      valuesForAdd.push(objConsolidation)

    })

    console.log({infoRotatedValues1});
    console.log({page});
    console.log({perPage});
    console.log({userId});

    //TODO-> Registrar en la tabla respectiva ...

    return valuesForAdd;

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
