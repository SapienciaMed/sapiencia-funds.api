import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'


export default class CallFond extends BaseModel {
  public static table = "fidu_fondo";
  public static connection = "mysql_sapiencia";

  @column({ isPrimary: true, columnName: "idfondo", serializeAs: "id" })
  public id: number;

  @column({  columnName: "nombrefondo", serializeAs: "name" })
  public name: string;

}
