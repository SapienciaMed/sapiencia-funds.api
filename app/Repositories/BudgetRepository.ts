import { IPagingData } from "App/Utils/ApiResponses";
import { ICallBudget, ICallBudgetFilters } from "App/Interfaces/CallBudgetInterfaces";
import CallBudget from "App/Models/Sapiencia/Callbudget";


export interface IBudgetRepository{
    geCallBudgetFilter(
        filters: ICallBudgetFilters
      ): Promise<IPagingData<ICallBudget>>;

}

export default class BudgetRepository implements IBudgetRepository{
  constructor() {}

  async geCallBudgetFilter(
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