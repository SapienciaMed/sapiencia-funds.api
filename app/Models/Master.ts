import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
}


