import { BaseModel, HasOne, column, hasOne } from "@ioc:Adonis/Lucid/Orm";
import MasterActivity from "./MasterActivity";
import Programs from "./Programs";
import VotingResults from "./VotingResults";

export default class Item extends BaseModel {
  public static table = "ITM_ITEM";

  @column({ isPrimary: true, columnName: "ITM_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "ITM_OBJETIVO_DIRECTO", serializeAs: "aimStraight" })
  public aimStraight: string;

  @column({
    columnName: "ITM_PRODUCTO_CATALOGO_DNP",
    serializeAs: "productCatalogueDnp",
  })
  public productCatalogueDnp: string;

  @column({
    columnName: "ITM_CODIGO_PRODUCTO_DNP",
    serializeAs: "codProductgueDnp",
  })
  public codProductgueDnp: string;

  @column({ columnName: "ITM_CODPMA_PROGRAMA", serializeAs: "codPmaProgram" })
  public codPmaProgram: number;

  @column({
    columnName: "ITM_CODMTA_MAESTRO_ACTIVIDAD",
    serializeAs: "codMtaTeacherActivity",
  })
  public codMtaTeacherActivity: number;

  @column({ columnName: "ITM_CANTIDAD", serializeAs: "amount" })
  public amount: number;

  @column({ columnName: "ITM_COSTO_TOTAL", serializeAs: "costTotal" })
  public costTotal: number;

  @column({ columnName: "ITM_PORCENTAJE_123", serializeAs: "percentage123" })
  public percentage123: number;

  @column({ columnName: "ITM_PORCENTAJE_456", serializeAs: "percentage456" })
  public percentage456: number;

  @column({
    columnName: "ITM_CODRTV_RESULTADO_VOTACION",
    serializeAs: "codRtVotingResult",
  })
  public codRtVotingResult: number;



  @hasOne(() => MasterActivity, {
    localKey: "codMtaTeacherActivity",
    foreignKey: "id",
    serializeAs: "activity",
  })
  public activity: HasOne<typeof MasterActivity>;

  @hasOne(() => Programs, {
    localKey: "codPmaProgram",
    foreignKey: "id",
    serializeAs: "program",
  })
  public program: HasOne<typeof Programs>;

  @hasOne(() => VotingResults, {
    localKey: "codRtVotingResult",
    foreignKey: "id",
    serializeAs: "votingResult",
  })
  public votingResult: HasOne<typeof VotingResults>;
}
