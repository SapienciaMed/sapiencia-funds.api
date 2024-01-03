import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CallFond extends BaseModel {

  public static table = "estados_creditos_historicos_sistematizacion";
  public static connection = "mysql_sapiencia";

  @column({ columnName: "id_fondo", serializeAs: "foundId" })
  public foundId: number;

  @column({  columnName: "id_convocatoria", serializeAs: "convocatoryId" })
  public convocatoryId: number;

  @column({  columnName: "convocatoria", serializeAs: "convocatory" })
  public convocatory: string;

  @column({  columnName: "id_usuario", serializeAs: "userId" })
  public userId: string;

  @column({  columnName: "documento", serializeAs: "document" })
  public document: string;

  @column({  columnName: "id_periodo", serializeAs: "periodId" })
  public periodId: number;

  @column({  columnName: "periodo", serializeAs: "period" })
  public period: string;

  @column({  columnName: "id_estado_general", serializeAs: "generalStateId" })
  public generalStateId: number;

  @column({  columnName: "estado_general", serializeAs: "generalState" })
  public generalState: string;

  @column({  columnName: "id_estado_periodo_renovado", serializeAs: "statusPeriodRenewId" })
  public statusPeriodRenewId: number;

  @column({  columnName: "estado_general", serializeAs: "statusPeriodRenew" })
  public statusPeriodRenew: string;

  @column({  columnName: "id_motivo_estado", serializeAs: "reasonStateId" })
  public reasonStateId: number;

  @column({  columnName: "motivo_estado", serializeAs: "reasonState" })
  public reasonState: string;

  @column({  columnName: "id_etapa_proceso", serializeAs: "stageProcessId" })
  public stageProcessId: number;

  @column({  columnName: "etapa_proceso", serializeAs: "stageProcess" })
  public stageProcess: string;

  @column({  columnName: "fecha_actualizacion", serializeAs: "updateDate" })
  public updateDate: string;

  @column({  columnName: "validador", serializeAs: "validator" })
  public validator: string;

  @column({  columnName: "radicado", serializeAs: "radicated" })
  public radicated: string;

  @column({  columnName: "fecha", serializeAs: "date" })
  public date: string;

}
