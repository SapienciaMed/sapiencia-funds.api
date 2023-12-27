import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Reglament from "./Reglament";

export default class Programs extends BaseModel {
  public static table = "PMA_PROGRAMA";
  @column({ isPrimary: true, columnName: "PMA_CODIGO", serializeAs: "id" })
  public id: number;
  @column({ columnName: "PMA_NOMBRE", serializeAs: "value" })
  public value: string;

  @hasMany(() => Reglament, {
    localKey: "id",
    foreignKey: "idProgram",
  })
  public reglaments: HasMany<typeof Reglament>;
}
