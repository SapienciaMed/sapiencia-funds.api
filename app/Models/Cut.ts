import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Cut extends BaseModel {
  public static table = "CRT_CORTES";
  @column({ isPrimary: true, columnName: "CRT_CODIGO", serializeAs: "id" })
  public id: number;
  @column({ columnName: "CRT_NOMBRE", serializeAs: "name" })
  public name: string;
  @column({ columnName: "CRT_DESDE", serializeAs: "from" })
  public from: string;
  @column({ columnName: "CRT_HASTA", serializeAs: "until" })
  public until: string;

  @column({
    columnName: "CRT_USUARIO_MODIFICO",
    serializeAs: "modifyUser",
  })
  public modifyUser: string;
  @column({
    columnName: "CRT_FECHA_MODIFICO",
    serializeAs: "modifyDate",
  })
  public modifyDate: string;
  @column({
    columnName: "CRT_USUARIO_CREO",
    serializeAs: "createUser",
  })
  public createUser: string;
  @column({
    columnName: "CRT_FECHA_CREO",
    serializeAs: "createDate",
  })
  public createDate: string;
}
