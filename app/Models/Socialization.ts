import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Socialization extends BaseModel {
  public static table = "SIE_SOCIALIZACION_INFORMES_EJECUCION";
  @column({ isPrimary: true, columnName: "SIE_CODIGO", serializeAs: "id" })
  public id: number;
}
