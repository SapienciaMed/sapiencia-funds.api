import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'


export default class CallBudget extends BaseModel {
  public static table = "temp_control_presupuesto_comuna";
  public static connection = "mysql_sapiencia";

  @column({ isPrimary: true, columnName: "Id_comuna", serializeAs: "id_comuna" })
  public id_comuna: number;

  @column({  columnName: "periodo", serializeAs: "periodo" })
  public periodo: string;

}
