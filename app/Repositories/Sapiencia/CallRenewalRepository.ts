import { IPagingData } from "App/Utils/ApiResponses";
import { ICallRenewal, ICallRenewalFilters } from "App/Interfaces/CallRenewalInterface";
// import CallBudget from "App/Models/Sapiencia/Callbudget";
import Database from "@ioc:Adonis/Lucid/Database";



export interface IRenewalRepository {

  geCallRenewalPaginate(
    filters: ICallRenewalFilters
  ): Promise<IPagingData<ICallRenewal>>;

}

export default class RenewalRepository implements IRenewalRepository {
  constructor() { }

  public async geCallRenewalPaginate(filters: ICallRenewalFilters) {
    const { id_comuna, periodo } = filters;
    const idComunaArray = Array.isArray(id_comuna) ? id_comuna : [id_comuna];
  
    const query = `call AuroraPresupuestoComuna('${idComunaArray.join(",")}', ${periodo})`;
  
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
   
    return { array: paginatedData as ICallRenewal[], meta };
  }
  
}