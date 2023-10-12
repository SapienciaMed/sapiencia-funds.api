import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Item from "./Item";

export default class VotingResults extends BaseModel {
  public static table = "RTV_RESULTADO_VOTACION";

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

  @hasMany(() => Item, {
    localKey: "id",
    foreignKey: "codRtVotingResult",
    serializeAs: "items",
  })
  public items: HasMany<typeof Item>;

}
