
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class AuroraPpRenovado extends BaseModel {
  public static table = "vw_aurora_PP_renovados";
  public static connection = "mysql_sapiencia";

  @column({ isPrimary: true, columnName: "id_usuario", serializeAs: "id" })
  public id: number;

  @column({  columnName: "Periodo", serializeAs: "period" })
  public period: number;

  @column({  columnName: "Pseleccion", serializeAs: "pSelection" })
  public pSelection: string;
  
  @column({  columnName: "Documento", serializeAs: "document" })
  public number: string;
  
  @column({  columnName: "Nombre", serializeAs: "name" })
  public name: string;
  
  @column({  columnName: "Comuna_beneficiario", serializeAs: "communeBeneficiary" })
  public communeBeneficiary: string;
  
  @column({  columnName: "Modalidad_beneficio", serializeAs: "modalityBenefit" })
  public modalityBenefit: string;

  @column({  columnName: "Periodo_Renovar", serializeAs: "periodRenew" })
  public periodRenew: number;

  @column({  columnName: "Semestre_o_nivel_a_renovar", serializeAs: "semesterLevelRenew" })
  public semesterLevelRenew: string;

  @column({  columnName: "Promedio_Acumulado", serializeAs: "accumulatedAverage" })
  public accumulatedAverage: string;

  @column({  columnName: "Realizo_servicio", serializeAs: "performService" })
  public performService: string;

  @column({  columnName: "Horas_servicio_realizo", serializeAs: "hoursServicePerform" })
  public hoursServicePerform: string;

  @column({  columnName: "operador", serializeAs: "operator" })
  public operator: string;

}


