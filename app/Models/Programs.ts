import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Programs extends BaseModel {
  public static table = "PMA_PROGRAMA";
  @column({ isPrimary: true, columnName: "PMA_CODIGO", serializeAs: "id" })
  public id: number;
  @column({ columnName: "PMA_NOMBRE", serializeAs: "value" })
  public value: string;
}