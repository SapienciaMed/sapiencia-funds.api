import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MasterStatusPacc extends BaseModel {

  public static table = "EPP_ESTADOS_PROCESOS_PACC";

  @column({
    isPrimary: true,
    columnName: "EPP_CODIGO",
    serializeAs: "id" })
  public id: number;

  @column({
    columnName: "EPP_DESCRIPCION",
    serializeAs: "description" })
  public description: string;

}
