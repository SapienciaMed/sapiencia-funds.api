import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class AuroraEpmRenovado extends BaseModel {
  public static table = "vw_aurora_epm_renovados";
  public static connection = "mysql_sapiencia";

  @column({ isPrimary: true, columnName: "id_usuario", serializeAs: "id" })
  public id: number;

  @column({ columnName: "periodo", serializeAs: "period" })
  public period: number;

  @column({ columnName: "periodo_detalle", serializeAs: "periodDetail" })
  public periodDetail: string;

  @column({ columnName: "Pseleccion", serializeAs: "pSelection" })
  public pSelection: number;

  @column({ columnName: "Documento", serializeAs: "document" })
  public document: string;

  @column({ columnName: "Nombre", serializeAs: "name" })
  public name: string;

  @column({ columnName: "Modalidad_beneficio", serializeAs: "modalityBenefit" })
  public modalityBenefit: string;

  @column({ columnName: "Periodo_renovar", serializeAs: "periodRenew" })
  public periodRenew: number;

  @column({
    columnName: "Semestre_o_nivel_a_renovar",
    serializeAs: "semesterLevelRenew",
  })
  public semesterLevelRenew: string;

  @column({
    columnName: "Promedio_Acumulado",
    serializeAs: "accumulatedAverage",
  })
  public accumulatedAverage: string;

  @column({
    columnName: "Realiza_servicio_social",
    serializeAs: "performServiceSocial",
  })
  public performService: string;

  @column({  columnName: "Total_horas_servicio_social", serializeAs: "hoursServicePerform" })
  public hoursServicePerform: string;

  @column({ columnName: "Operador", serializeAs: "operator" })
  public operator: string;
}
