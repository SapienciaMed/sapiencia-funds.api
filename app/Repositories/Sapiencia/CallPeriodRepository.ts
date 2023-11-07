import { ICallBudget, ICallBudgetFilters } from "App/Interfaces/CallBudgetInterfaces";
import { ICallPeriod } from "App/Interfaces/CallPeriodInterfaces";
import CallPeriod from "App/Models/Sapiencia/CallPeriod";
import CallBudget from "App/Models/Sapiencia/Callbudget";
import { IPagingData } from "App/Utils/ApiResponses";


export interface ICallPeriodRepository {
  getAllCallPeriod(): Promise<ICallPeriod[]>;
  getAllCallBudget(): Promise<ICallBudget[]>;
  geCallBudgetPaginate(
    filters: ICallBudgetFilters
  ): Promise<IPagingData<ICallBudget>>;
}

export default class CallPeriodRepository implements ICallPeriodRepository {
  constructor() {}

  async getAllCallPeriod(): Promise<ICallPeriod[]> {
    const res = await CallPeriod.query();

    return res.map((i) => i.serialize() as ICallPeriod);
  }
  async getAllCallBudget(): Promise<ICallBudget[]> {
    const res = await CallBudget.query().distinct('Id_comuna');

    return res.map((i) => i.serialize() as ICallBudget);
  }

  async geCallBudgetPaginate(
    filters: ICallBudgetFilters
  ): Promise<IPagingData<ICallBudget>> {
    const res = CallBudget.query();
  
    if (filters.id_comuna) {
      const idComunaArray = Array.isArray(filters.id_comuna) ? filters.id_comuna : [filters.id_comuna];
      res.whereIn("id_comuna", idComunaArray.map(String));
    }
  
    if (filters.periodo) {
      res.where("periodo", filters.periodo);
    }
  
    const workerMasterActivityPaginated = await res.paginate(
      filters.page,
      filters.perPage
    );
  
    const { data, meta } = workerMasterActivityPaginated.serialize();
    const dataArray = data ?? [];
  
    return {
      array: dataArray as ICallBudget[],
      meta,
    };
  }
  

}
