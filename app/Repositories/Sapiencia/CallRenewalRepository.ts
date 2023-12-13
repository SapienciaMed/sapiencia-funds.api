import { IPagingData } from "App/Utils/ApiResponses";
import { ICallRenewal, ICallRenewalFilters } from "App/Interfaces/CallRenewalInterface";
// import CallBudget from "App/Models/Sapiencia/Callbudget";
//import Database from "@ioc:Adonis/Lucid/Database";
import Renewal from "App/Models/Renewal";



export interface IRenewalRepository {
  createRenewal(
    renewal: ICallRenewal
  ): Promise<ICallRenewal>;
  geCallRenewalPaginate(
    filters: ICallRenewalFilters
  ): Promise<IPagingData<ICallRenewal>>;
  calculate(period: any): Promise<any>;
  getBeca(period: number): Promise<any>;
}

export default class RenewalRepository implements IRenewalRepository {
  constructor() { }

  async createRenewal(
    renewal: ICallRenewal
  ): Promise<ICallRenewal> {
    // Assuming 'period' and 'fund' uniquely identify a renewal record
    const existingRenewal = await Renewal.query()
      .where('period', renewal.period)
      .where('fund', renewal.fund)
      .first();

    if (existingRenewal) {
      // Update the existing record
      existingRenewal.merge(renewal);
      await existingRenewal.save();
      return existingRenewal.serialize() as ICallRenewal;
    } else {
      // Create a new record
      const newRenewal = new Renewal();
      newRenewal.fill(renewal);
      await newRenewal.save();
      return newRenewal.serialize() as ICallRenewal;
    }
  }




  /* async geCallRenewalPaginate(filters: ICallRenewalFilters): Promise<IPagingData<any>> {
    const res = Renewal.query();

    if (filters.period) {
      res.where("period", `${filters.period}`);
    }

    const workerMasterActivityPaginated = await res.paginate(
      filters.page,
      filters.perPage
    );

    const { data, meta } = workerMasterActivityPaginated.serialize();
    let dataArray = data ?? [];

    // Filtrar registros donde 'found' es 'Beca Mejores Bachilleres Legaliza'
    dataArray = dataArray.filter(item => item.fund !== 'Beca Mejores Bachilleres Legaliza');

    return {
      array: dataArray as ICallRenewal[],
      meta,
    };
  }
 */

  async geCallRenewalPaginate(filters: ICallRenewalFilters): Promise<IPagingData<any>> {
    const res = Renewal.query();
  
    if (filters.period) {
      res.where("period", `${filters.period}`);
    }
  
    const workerMasterActivityPaginated = await res.paginate(
      filters.page,
      filters.perPage
    );
  
    const { data, meta } = workerMasterActivityPaginated.serialize();
    let dataArray = data ?? [];
  
    // Filtrar registros donde 'fund' no es 'Beca Mejores Bachilleres Legaliza'
    dataArray = dataArray.filter(item => item.fund !== 'Beca Mejores Bachilleres Legaliza');
  
    // Calcular el porcentaje de 'enabled * 100 / renewed' para cada registro
    dataArray = dataArray.map(item => {
      if (item.renewed > 0) {
        const percentage = (item.enabled * 100) / item.renewed;
        return { ...item, percentage };
      } else {
        // Si 'renewed' es 0, evita la división por cero asignando un porcentaje de 0
        return { ...item, percentage: 0 };
      }
    });
  
    return {
      array: dataArray as ICallRenewal[],
      meta,
    };
  }
  
  async getBeca(period: number): Promise<any> {

    const query = Renewal.query();

    const res = query.where("period", period).where('fund', 'Beca Mejores Bachilleres Legaliza')

    return res


  }


  async calculate(period): Promise<{ sumEnabled: number, sumRenewed: number }> {
    // Obtener todos los registros para el periodo dado
    const records = await Renewal.query().where('RRP_PERIODO', period).whereNot('fund', 'Beca Mejores Bachilleres Legaliza');
    ;

    if (records && records.length > 0) {
      // Inicializa las sumas
      let sumEnabled = 0;
      let sumRenewed = 0;

      // Itera sobre los registros y suma los valores de 'enabled' y 'renewed'
      for (const record of records) {
        sumEnabled += record.enabled;
        sumRenewed += record.renewed;
      }

      // Retorna las sumas totales de 'enabled' y 'renewed'
      return { sumEnabled, sumRenewed };
    } else {
      // Retorna 0 para ambas sumas si no hay registros
      return { sumEnabled: 0, sumRenewed: 0 };
    }
  }





}