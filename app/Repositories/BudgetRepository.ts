import { IPagingData } from "App/Utils/ApiResponses";
import { ICallBudget, ICallBudgetFilters } from "App/Interfaces/CallBudgetInterfaces";
// import CallBudget from "App/Models/Sapiencia/Callbudget";
import Database from "@ioc:Adonis/Lucid/Database";
import CallBudget from "App/Models/Sapiencia/Callbudget";


export interface IBudgetRepository {
  geCallBudgetFilter(
    filters: ICallBudgetFilters
  ): Promise<IPagingData<ICallBudget>>;
  geCallBudgetPaginate(
    filters: ICallBudgetFilters
  ): Promise<IPagingData<ICallBudget>>;

}

export default class BudgetRepository implements IBudgetRepository {
  constructor() { }

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



  public async geCallBudgetPaginate(filters: ICallBudgetFilters) {
    const { id_comuna, periodo } = filters;
    const idComunaArray = Array.isArray(id_comuna) ? id_comuna : [id_comuna];
  
    const query = `call AuroraPresupuestoComuna('${idComunaArray.join(",")}', ${periodo})`;
    console.log("************query", query);
  
    const result = await Database.connection("mysql_sapiencia").rawQuery(query);
  
    // Suponiendo que result contiene un arreglo de resultados
    const data = result[0];
  
    // Elimina el primer elemento del array, que contiene el subarreglo innecesario
    const cleanedData = data.shift();
  
    const { page, perPage } = filters;
  
    // Realiza la paginación manualmente
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedData = cleanedData.slice(start, end);
  
    const meta = {
      total: cleanedData.length,
      per_page: perPage,
      current_page: page,
      last_page: Math.ceil(cleanedData.length / perPage),
    };
    console.log("Pase por el PL")
    return { array: paginatedData as ICallBudget[], meta };
  }
  
}