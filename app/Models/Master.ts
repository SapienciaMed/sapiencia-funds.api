import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import TypeMasterList from './TypeMasterList'

export default class Master extends BaseModel {

  public static table = "LMA_LISTADOS_MAESTROS";

  @column({ isPrimary: true, columnName: "LMA_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "LMA_CODTLM", serializeAs: "codtlmo" })
  public codtlmo: number;

  @column({ columnName: "LMA_NOMBRE", serializeAs: "name" })
  public name: string;

  @column({ columnName: "LMA_DESCRIPCION", serializeAs: "description" })
  public description: string;

  @belongsTo(() => TypeMasterList, {
    foreignKey: 'codtlmo', 
    localKey: 'id',        
  })
  public typeMasterList: BelongsTo<typeof TypeMasterList>
}


