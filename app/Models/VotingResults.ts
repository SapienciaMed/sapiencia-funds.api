import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class VotingResults extends BaseModel {
  public static table = "RVO_RESULTADOS_VOTACION";

  @column({ isPrimary: true, columnName: "RVO_CODIGO", serializeAs: "id" })
  public id: number;

}
