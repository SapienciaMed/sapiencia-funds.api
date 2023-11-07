import { IPagingData } from "App/Utils/ApiResponses";
import { ICallBudget, ICallBudgetFilters } from "App/Interfaces/CallBudgetInterfaces";
// import CallBudget from "App/Models/Sapiencia/Callbudget";
import Database from "@ioc:Adonis/Lucid/Database";


export interface IBudgetRepository {
  geCallBudgetFilter(
    filters: ICallBudgetFilters
  ): Promise<IPagingData<ICallBudget>>;

}

export default class BudgetRepository implements IBudgetRepository {
  constructor() { }

  public async geCallBudgetFilter(filters: ICallBudgetFilters) {
    // const res = CallBudget.query();
    const { page, perPage, periodo } = filters
    const idComunaArray = Array.isArray(filters.id_comuna) ? filters.id_comuna : [filters.id_comuna];

    const dataBd = await Database.connection("mysql_sapiencia").rawQuery(
      `select @@sql_mode mode_before_replacing;
      SET @@sql_mode = REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', '');
      select @@sql_mode mode_after_replacing;
      
      SELECT * FROM convocatoria_sapiencia.callg_control_presupuesto_comuna WHERE id_comuna IN = :id_comuna AND periodo = :periodo;`,
      {
        id_comuna: idComunaArray,
        periodo: periodo,
      }
    )

    const finalQuery = await dataBd.paginate(page, perPage);
    const { data, meta } = finalQuery.serialize();
    return { array: data as ICallBudget[], meta };
  }
}