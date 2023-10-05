import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TypeMasterList extends BaseModel {

  public static table = "TLM_TIPO_LISTADOS_MAESTROS";

  @column({ isPrimary: true, columnName: "TLM_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "TLM_NOMBRE", serializeAs: "name" })
  public name: string;
}
