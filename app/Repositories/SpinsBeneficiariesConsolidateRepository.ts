import { ISpinsBeneficiary } from '../Interfaces/SpinsBeneficiaryInterfaces';

export interface ISpinsBeneficiariesConsolidateRepository {

  spinsSearch1(body: ISpinsBeneficiary): Promise<any[] | null>;
  spinsSearch2(body: ISpinsBeneficiary): Promise<any[] | null>;
  spinsSearch3(body: ISpinsBeneficiary): Promise<any[] | null>;

}

export default class SpinsBeneficiariesConsolidateRepository implements ISpinsBeneficiariesConsolidateRepository {

  constructor() {}

  async spinsSearch1(body: ISpinsBeneficiary): Promise<any[] | null> {

    //TODO: Aquí ira el procesamiento de la fuente 1 respectiva combinada con el modelo de BeneficiariesConsolidate
    //TODO: así como también el modelo de Sapiencia HistoricalCreditStatements (Sub carpeta Sapiencia de los modelos)
    console.log({body});
    return ["Hola, fuente 1"];

  }

  async spinsSearch2(body: ISpinsBeneficiary): Promise<any[] | null> {

    //TODO: Aquí ira el procesamiento de la fuente 2 respectiva combinada con el modelo de BeneficiariesConsolidate
    //TODO: así como también el modelo de Sapiencia HistoricalCreditStatements (Sub carpeta Sapiencia de los modelos)
    console.log({body});
    return ["Hola, fuente 2"];

  }

  async spinsSearch3(body: ISpinsBeneficiary): Promise<any[] | null> {

    //TODO: Aquí ira el procesamiento de la fuente 3 respectiva combinada con el modelo de BeneficiariesConsolidate
    //TODO: así como también el modelo de Sapiencia HistoricalCreditStatements (Sub carpeta Sapiencia de los modelos)
    console.log({body});
    return ["Hola, fuente 3"];

  }

}
