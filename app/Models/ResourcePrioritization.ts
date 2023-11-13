import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ResourcePrioritization extends BaseModel {
  public static table = "PRR_PRIORIZACION_RECURSOS";
  @column({ isPrimary: true, columnName: "PRR_CODIGO", serializeAs: "id" })
  public id: number;
  @column({ columnName: "PRR_CODPMA_PROGRAMA", serializeAs: "programId" })
  public programId: number;
  @column({ columnName: "PRR_NUMERO_PROYECTO", serializeAs: "projectNumber" })
  public projectNumber: number;
  @column({ columnName: "PRR_VIGENCIA", serializeAs: "validity" })
  public validity: number;
  @column({ columnName: "PRR_COMUNA", serializeAs: "communeId" })
  public communeId: number;
  @column({ columnName: "PRR_ESTRATO_123", serializeAs: "total123" })
  public total123: number;
  @column({ columnName: "PRR_ESTRATO_456", serializeAs: "total456" })
  public total456: number;
  @column({ columnName: "PRR_VALOR", serializeAs: "value" })
  public value: number;
  @column({ columnName: "PRR_CUPOS", serializeAs: "places" })
  public places: number;
  @column({ columnName: "PRR_COSTO_PROMEDIO", serializeAs: "averageCost" })
  public averageCost: number;
  @column({ columnName: "PRR_TASA_GENERAL", serializeAs: "generalRate" })
  public generalRate: number;
  @column({ columnName: "PRR_VALOR_BRUTO", serializeAs: "grossValue" })
  public grossValue: number;
  @column({ columnName: "PRR_COSTOS_GASTOS_DE_OPERACION", serializeAs: "operatingCostAndExpense" })
  public operatingCostAndExpense: number;
  @column({ columnName: "PRR_RENDIMIENTOS_FINANCIEROS", serializeAs: "financialPerformances" })
  public financialPerformances: number;
  @column({ columnName: "PRR_RECURSO_DEL_BALANCE", serializeAs: "balanceResources" })
  public balanceResources: number;
  @column({ columnName: "PRR_COMISION_OPERADOR_FINANCIERO_ACTA", serializeAs: "operatorCommissionAct" })
  public operatorCommissionAct: number;
  @column({ columnName: "PRR_COMISION_OPERADOR_FINANCIERO_BALANCE", serializeAs: "operatorCommissionBalance" })
  public operatorCommissionBalance: number;
  @column({ columnName: "PRR_COMISION_OPERADOR_FINANCIERO", serializeAs: "operatorCommission" })
  public operatorCommission: number;
  @column({ columnName: "PRR_RECURSO_PARA_CREDITO", serializeAs: "resourceForCredit" })
  public resourceForCredit: number;
  @column({ columnName: "PRR_USUARIO_MODIFICO", serializeAs: "userModified" })
  public userModified: string;
  @column({ columnName: "PRR_FECHA_MODIFICO", serializeAs: "dateModified" })
  public dateModified: Date;
  @column({ columnName: "PRR_USUARIO_CREO", serializeAs: "userCreate" })
  public userCreate: string;
  @column({ columnName: "PRR_FECHA_CREO", serializeAs: "dateCreate" })
  public dateCreate: Date;
}






