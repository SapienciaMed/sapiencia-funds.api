import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class AuroraEfeRenovado extends BaseModel {
  public static table = "vw_aurora_efe_renovados";
  public static connection = "mysql_sapiencia";

  @column({ isPrimary: true, columnName: "id_usuario", serializeAs: "id" })
  public id: number;

  @column({  columnName: "periodo", serializeAs: "period" })
  public period: number;

  @column({  columnName: "Pseleccion", serializeAs: "pSelection" })
  public pSelection: string;
  
  @column({  columnName: "Documento", serializeAs: "document" })
  public number: string;
  
  @column({  columnName: "Nombre", serializeAs: "name" })
  public name: string;

  @column({  columnName: "Modalidad_beneficio", serializeAs: "modalityBenefit" })
  public modalityBenefit: string;

  @column({  columnName: "Periodo_Renovar", serializeAs: "renewPeriod" })
  public renewPeriod: number;

  @column({  columnName: "Semestre_o_nivel_a_renovar", serializeAs: "periodRenew" })
  public periodRenew: string;

  @column({  columnName: "Promedio_Acumulado", serializeAs: "accumulatedAverage" })
  public accumulatedAverage: string;

  @column({  columnName: "fecha_actualizacion", serializeAs: "dateUpdate" })
  public dateUpdate: string;
  
}