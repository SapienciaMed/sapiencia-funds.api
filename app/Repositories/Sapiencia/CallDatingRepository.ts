import { IPagingData } from "App/Utils/ApiResponses";
import { ICallDating, ICallDatingFilters } from "App/Interfaces/CallDatingInterfaces";
import Database from "@ioc:Adonis/Lucid/Database";



export interface IDatingRepository {

  geCallDatingPaginate(
    filters: ICallDatingFilters
  ): Promise<IPagingData<ICallDating>>;

}

export default class DatingRepository implements IDatingRepository {
  constructor() { }

  public async geCallDatingPaginate(filters: ICallDatingFilters) {
    const { 
      //convocatoria, 
      programa 
    } = filters;
  
    const query = `call AuroraControlCitas('${programa}')`;
  
    const result = await Database.connection("mysql_sapiencia").rawQuery(query);
  
    // Suponiendo que result contiene un arreglo de resultados
    const data = result[0];
  
    // Extrae el subarreglo necesario sin modificar el original
    const cleanedData = data[0];
  
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
  
    return { array: paginatedData as ICallDating[], meta };
  }
  
  
}