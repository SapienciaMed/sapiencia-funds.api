import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class TypesProgram extends BaseModel {
  public static table = "PMA_PROGRAMA";

  @column({ isPrimary: true, columnName: "PMA_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "PMA_NOMBRE", serializeAs: "name" })
  public name: string;
}
