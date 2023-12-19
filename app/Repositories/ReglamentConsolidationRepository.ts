import { ICallPeriodSapi, IReglamentConsolidation } from '../Interfaces/SapienciaGenericInterface';
import CallPeriod from '../Models/Sapiencia/CallPeriod';



export interface IReglamentConsolidationRepository {

  getPeriodsSapi(): Promise<ICallPeriodSapi[]>
  createReglament(data: any): Promise<IReglamentConsolidation | null>;

}

export default class ReglamentConsolidationRepository implements IReglamentConsolidationRepository {

  async getPeriodsSapi(): Promise<ICallPeriodSapi[]> {

    const getPeriods = await CallPeriod.query().orderBy('name', 'desc');
    const convertResult = getPeriods.map((i) => i.serialize() as ICallPeriodSapi);
    let arrayResult: ICallPeriodSapi[] = [];

    //* Vamos a realizar la conversión para el texto
    for (const iterConvert of convertResult) {

      const applySplit = iterConvert.name.split("-");
      const period: number = Number(applySplit[1]);
      let complementaryName: string = "";

      if( period === 1 ) complementaryName = `${iterConvert.name} (1 Enero a 30 de Junio)`;
      if( period === 2 ) complementaryName = `${iterConvert.name} (1 Julio a 31 de Diciembre)`;
      if( period !== 1 && period !== 2 ) complementaryName = `${iterConvert.name}`;

      const result: ICallPeriodSapi = {
        id: iterConvert.id,
        name: iterConvert.name,
        nameComplementary: complementaryName,
        minimumSalary: iterConvert.minimumSalary,
        status: iterConvert.status
      }

      arrayResult.push(result);

    }

    return arrayResult;

  }

  async createReglament(data: any): Promise<IReglamentConsolidation | null> {

    console.log({data});

    return null;

  }

}
