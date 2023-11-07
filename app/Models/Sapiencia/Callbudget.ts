import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'


export default class CallBudget extends BaseModel {
  public static table = "temp_control_presupuesto_comuna";
  public static connection = "mysql_sapiencia";

  @column({ isPrimary: true, columnName: "Id_comuna", serializeAs: "id_comuna" })
  public id_comuna: number;

  @column({  columnName: "presupuesto_comuna", serializeAs: "presupuesto_comuna" })
  public presupuesto_comuna: string;

  @column({  columnName: "acumulado_legali_comuna", serializeAs: "legaliza_comuna" })
  public legaliza_comuna: string;

  @column({  columnName: "restante_presupuesto_comuna", serializeAs: "restante_presupuesto" })
  public restante_presupuesto: string;

  @column({  columnName: "numero_usuarios_comuna", serializeAs: "usuarios_comuna" })
  public usuarios_comuna: string;

  @column({  columnName: "periodo", serializeAs: "periodo" })
  public periodo: string;

  @column({  columnName: "puntaje_corte", serializeAs: "puntaje_corte" })
  public puntaje_corte: string;

}
