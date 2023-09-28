import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import MasterActivity from './MasterActivity';

export default class Item extends BaseModel {

  public static table = "ITM_ITEM";

  @column({ isPrimary: true, columnName: "ITM_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "ITM_OBJETIVO_DIRECTO", serializeAs: "aimStraight" })
  public aimStraight: number;

  @column({ columnName: "ITM_PRODUCTO_CATALOGO_DNP", serializeAs: "productCatalogueDnp" })
  public productCatalogueDnp: number;

  @column({ columnName: "ITM_CODPMA_PROGRAMA", serializeAs: "codPmaProgram" })
  public codPmaProgram: string;

  @column({ columnName: "ITM_CODMTA_MAESTRO_ACTIVIDAD", serializeAs: "codMtaTeacherActivity" })
  public codMtaTeacherActivity: string;

  @column({ columnName: "ITM_CANTIDAD", serializeAs: "amount" })
  public amount: string;

  @column({ columnName: "ITM_COSTO_TOTAL", serializeAs: "costTotal" })
  public costTotal: string;
  
  @column({ columnName: "ITM_PORCENTAJE_123", serializeAs: "percentage123" })
  public percentage123: string;
  
  @column({ columnName: "ITM_PORCENTAJE_456", serializeAs: "percentage456" })
  public percentage456: string;

  @column({ columnName: "ITM_CODRTV_RESULTADO_VOTACION", serializeAs: "codRtVotingResult" })
  public codRtVotingResult: string;

  @hasOne(() => MasterActivity, {
    localKey: "codMtaTeacherActivity",
    foreignKey: "id",
    serializeAs: "activiti",
  })
    
  public activiti: HasOne<typeof MasterActivity>;

}
