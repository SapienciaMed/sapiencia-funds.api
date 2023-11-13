import { IPagingData } from "App/Utils/ApiResponses";
import {
  IGroupedResults,
  IResourcePrioritizationFilters,
  ITotalsPrioritizationFilters,
} from "App/Interfaces/ResourcePrioritizationInterface";
import VotingResults from "App/Models/VotingResults";
import { IResourcePrioritization } from "../Interfaces/ResourcePrioritizationInterface";
import ResourcePrioritization from "App/Models/ResourcePrioritization";
import Item from "App/Models/Item";

export interface IResourcePrioritizationRepository {
  setResourcePrioritization(
    data: IResourcePrioritization
  ): Promise<IResourcePrioritization | null>;
  getTotalsWithoutPrioritization(
    filters: ITotalsPrioritizationFilters
  ): Promise<IGroupedResults>;
  getResourcePrioritizationTotals(
    filters: ITotalsPrioritizationFilters
  ): Promise<IResourcePrioritization | null>;
  getResourcePrioritizationPaginated(
    filters: IResourcePrioritizationFilters
  ): Promise<IPagingData<IGroupedResults>>;
  getPrioritizationsToReplace(
    filters: IResourcePrioritizationFilters,
    communeIds: number[]
  ): Promise<IResourcePrioritization[]>;
}

export default class ResourcePrioritizationRepository
  implements IResourcePrioritizationRepository
{
  constructor() {}

  async setResourcePrioritization(
    data: IResourcePrioritization
  ): Promise<IResourcePrioritization | null> {
    if (data.id) {
      const toUpdate = await ResourcePrioritization.find(data.id);

      if (!toUpdate) {
        return null;
      }

      toUpdate.fill({
        ...toUpdate,
        ...data,
        dateModified: new Date(Date.now()),
        userModified: process.env.CURRENT_USER_DOCUMENT,
      });

      await toUpdate.save();

      return toUpdate.serialize() as IResourcePrioritization;
    } else {
      const res = await ResourcePrioritization.query()
        .where("validity", data.validity)
        .andWhere("programId", data.programId)
        .andWhere("projectNumber", data.projectNumber)
        .andWhere("communeId", data.communeId);

      if (res.length > 0) {
        return null;
      }

      const toCreate = new ResourcePrioritization();

      toCreate.fill({
        ...data,
        dateCreate: new Date(Date.now()),
        userCreate: process.env.CURRENT_USER_DOCUMENT,
      });
      await toCreate.save();

      return toCreate.serialize() as IResourcePrioritization;
    }
  }

  async getTotalsWithoutPrioritization(
    filters: IResourcePrioritizationFilters
  ): Promise<IGroupedResults> {
    const query = Item.query()
      .join(
        "RTV_RESULTADO_VOTACION",
        "RTV_CODIGO",
        "ITM_CODRTV_RESULTADO_VOTACION"
      )
      .sum("ITM_COSTO_TOTAL as value")
      .sum("ITM_CANTIDAD as places")
      .where("RTV_VIGENCIA", filters.validity)
      .andWhere("ITM_CODPMA_PROGRAMA", filters.programId)
      .andWhere("RTV_NUMERO_PROYECTO", filters.projectNumber)
      .andWhereNotExists((q) =>
        q
          .from("PRR_PRIORIZACION_RECURSOS")
          .where("PRR_VIGENCIA", filters.validity)
          .andWhere("PRR_CODPMA_PROGRAMA", filters.programId)
          .andWhere("PRR_NUMERO_PROYECTO", filters.projectNumber)
          .andWhereRaw("PRR_COMUNA = RTV_COMUNA_BARRIO")
      );

    const res = await query;

    return {
      places: res.length > 0 ? Number(res[0].$extras.places) : 0,
      value: res.length > 0 ? Number(res[0].$extras.value) : 0,
      programId: 0,
      total456: 0,
      total123: 0,
      communeId: 0,
    };
  }

  async getResourcePrioritizationTotals(
    filters: IResourcePrioritizationFilters
  ): Promise<IResourcePrioritization | null> {
    const query = ResourcePrioritization.query()
      .sum("PRR_VALOR as value")
      .sum("PRR_CUPOS as places")
      .sum("PRR_COSTO_PROMEDIO as averageCost")
      .sum("PRR_TASA_GENERAL as generalRate")
      .sum("PRR_VALOR_BRUTO as grossValue")
      .sum("PRR_COSTOS_GASTOS_DE_OPERACION as operatingCostAndExpense")
      .sum("PRR_RENDIMIENTOS_FINANCIEROS as financialPerformances")
      .sum("PRR_RECURSO_DEL_BALANCE as balanceResources")
      .sum("PRR_RECURSO_PARA_CREDITO as resourceForCredit")
      .sum("PRR_COMISION_OPERADOR_FINANCIERO_ACTA as operatorCommissionAct")
      .sum(
        "PRR_COMISION_OPERADOR_FINANCIERO_BALANCE as operatorCommissionBalance"
      )
      .sum("PRR_COMISION_OPERADOR_FINANCIERO as operatorCommission")
      .where("PRR_VIGENCIA", filters.validity)
      .andWhere("PRR_CODPMA_PROGRAMA", filters.programId)
      .andWhere("PRR_NUMERO_PROYECTO", filters.projectNumber);
    const res = await query;

    return res.length > 0 && res[0].$extras.value != null
      ? ({
          // en la sumatoria adonis esta retornando tipo text
          value: Number(res[0].$extras.value),
          places: Number(res[0].$extras.places),
          averageCost: Number(res[0].$extras.averageCost),
          generalRate: Number(res[0].$extras.generalRate),
          operatingCostAndExpense: Number(
            res[0].$extras.operatingCostAndExpense
          ),
          grossValue: Number(res[0].$extras.grossValue),
          financialPerformances: Number(res[0].$extras.financialPerformances),
          balanceResources: Number(res[0].$extras.balanceResources),
          operatorCommissionAct: Number(res[0].$extras.operatorCommissionAct),
          operatorCommissionBalance: Number(
            res[0].$extras.operatorCommissionBalance
          ),
          operatorCommission: Number(res[0].$extras.operatorCommission),
          resourceForCredit: Number(res[0].$extras.resourceForCredit),
        } as IResourcePrioritization)
      : null;
  }

  async getResourcePrioritizationPaginated(
    filters: IResourcePrioritizationFilters
  ): Promise<IPagingData<IGroupedResults>> {
    const query = VotingResults.query()
      .joinRaw(
        `join (select (ITM_COSTO_TOTAL  * (ITM_PORCENTAJE_123 / 100)) as TOTAL_123 
          ,(ITM_COSTO_TOTAL  * (ITM_PORCENTAJE_456 / 100)) as TOTAL_456 ,ITM_ITEM.*  
          from ITM_ITEM) as x on x.ITM_CODRTV_RESULTADO_VOTACION  = RTV_CODIGO`
      )
      .groupBy(["RTV_COMUNA_BARRIO", "ITM_CODPMA_PROGRAMA"])
      .select(
        "RTV_COMUNA_BARRIO as communeId",
        "ITM_CODPMA_PROGRAMA as programId"
      )
      .sum("ITM_COSTO_TOTAL as value")
      .sum("ITM_CANTIDAD as places")
      .sum("TOTAL_123 as total123")
      .sum("TOTAL_456 as total456")
      .where("RTV_VIGENCIA", filters.validity)
      .andWhere("ITM_CODPMA_PROGRAMA", filters.programId)
      .andWhere("RTV_NUMERO_PROYECTO", filters.projectNumber);

    const res = await query.paginate(filters.page, filters.perPage);

    const { meta } = res.serialize();

    return {
      array: res.map((i) => {
        return {
          communeId: Number(i.$extras.communeId),
          places: Number(i.$extras.places),
          programId: Number(i.$extras.programId),
          total123: Number(i.$extras.total123),
          total456: Number(i.$extras.total456),
          value: Number(i.$extras.value),
        };
      }) as IGroupedResults[],
      meta,
    };
  }

  async getPrioritizationsToReplace(
    filters: IResourcePrioritizationFilters,
    communeIds: number[]
  ): Promise<IResourcePrioritization[]> {
    const res = await ResourcePrioritization.query()
      .where("validity", filters.validity)
      .andWhere("programId", filters.programId)
      .andWhere("projectNumber", filters.projectNumber)
      .andWhereIn("communeId", communeIds);

    return res.map((i) => i.serialize() as IResourcePrioritization);
  }
}
