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

  public async geCallBudgetFilter(filters: ICallBudgetFilters){
    const res = CallBudget.query();
    const {page,perPage,periodo,id_comuna} = filters
  
    if (id_comuna) {
      const idComunaArray = Array.isArray(filters.id_comuna) ? filters.id_comuna : [filters.id_comuna];
      res.whereIn("id_comuna", idComunaArray.map(String));
    }
  
    if (periodo) {
      res.where("periodo", filters.periodo);
    }
  
    const finalQuery = await res.paginate(page, perPage);
    const { data, meta } = finalQuery.serialize();
    return { array: data as ICallBudget[], meta };
  }
}