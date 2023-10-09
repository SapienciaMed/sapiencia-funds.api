import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Master from './Master';

export default class TypeMasterList extends BaseModel {

  public static table = "TLM_TIPO_LISTADOS_MAESTROS";

  @column({ isPrimary: true, columnName: "TLM_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "TLM_NOMBRE", serializeAs: "name" })
  public name: string;

  @hasMany(() => Master, {
    foreignKey: 'codtlmo', 
    localKey: 'id',        
  })
  public masters: HasMany<typeof Master>
}
