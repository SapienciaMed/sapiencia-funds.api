import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class GenericList extends BaseModel {
  public static table = "LGE_LISTADOS_GENERICOS";

  @column({ isPrimary: true, columnName: "LGE_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "LGE_AGRUPADOR", serializeAs: "group" })
  public group: string;

  @column({ columnName: "LGE_ELEMENTO_CODIGO", serializeAs: "elementCode" })
  public elementCode: string;

  @column({ columnName: "LGE_ELEMENTO_DESCRIPCION", serializeAs: "elementDescription" })
  public elementDescription: string;

  @column({ columnName: "LGE_CAMPOS_ADICIONALES", serializeAs: "extra" })
  public extra: JSON;
}
