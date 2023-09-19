import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class VotingResults extends BaseModel {
  public static table = "RVO_RESULTADOS_VOTACION";

  @column({ isPrimary: true, columnName: "RTV_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "RTV_COMUNA_BARRIO", serializeAs: "communeNeighborhood" })
  public communeNeighborhood: number;

  @column({ columnName: "RTV_NUMERO_PROYECTO", serializeAs: "numberProject" })
  public numberProject: number;

  @column({ columnName: "RTV_VIGENCIA", serializeAs: "validity" })
  public validity: string;

  @column({ columnName: "RTV_IDEA_PROYECTO", serializeAs: "ideaProject" })
  public ideaProject: string;

}
