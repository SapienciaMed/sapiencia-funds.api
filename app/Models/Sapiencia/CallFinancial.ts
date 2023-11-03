import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'


export default class CallFinancial extends BaseModel {
  public static table = "temp_control_presupuesto_comuna";
  public static connection = "mysql_sapiencia";

  @column({ isPrimary: true, columnName: "id", serializeAs: "id_comuna" })
  public id_comuna: number;

  @column({  columnName: "", serializeAs: "contrato" })
  public contrato: string;

  @column({  columnName: "", serializeAs: "convocatoria" })
  public convocatoria: string;

  @column({  columnName: "", serializeAs: "valor_excedente" })
  public valor_excedente: string;

  @column({  columnName: "", serializeAs: "rendimiento_financiero" })
  public rendimiento_financiero: string;

  @column({  columnName: "", serializeAs: "recaudos_cartera" })
  public periodo: string;

  @column({  columnName: "", serializeAs: "recursos_no_ejecutados" })
  public recursos_no_ejecutados: string;

}
