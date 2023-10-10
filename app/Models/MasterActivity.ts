import { DateTime } from "luxon";
import { BaseModel, HasOne, column, hasOne } from "@ioc:Adonis/Lucid/Orm";
import Env from "@ioc:Adonis/Core/Env";
import TypesProgram from "./TypeProgram"

export default class MasterActivity extends BaseModel {

    public static table = "MTA_MAESTRO_ACTIVIDAD";
    @column({isPrimary: true, columnName: "MTA_CODIGO", serializeAs: "id"})
    public id: number;

    @column({ columnName: "MTA_NOMBRE", serializeAs: "name" })
    public name: string;

    @column({ columnName: "MTA_VALOR", serializeAs: "totalValue" })
    public totalValue: number;

    @column({ columnName: "MTA_CODPMA_PROGRAMA", serializeAs: "codProgramCode" })
    public codProgramCode: number;

    @column({ columnName: "MTA_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "MTA_USUARIO_MODIFICO",
        serializeAs: "userModified",
      })
      public userModified: string;
    
    @column.dateTime({
        autoUpdate: true,
        columnName: "MTA_FECHA_MODIFICO",
        serializeAs: "dateModified",
        prepare: (value: DateTime) => new Date(value?.toJSDate()),
      })
      public dateModified: DateTime;
    
    @column({
        columnName: "MTA_USUARIO_CREO",
        serializeAs: "userCreate",
      })
      public userCreate: string | undefined = Env.get("USER_ID");
    
    @column.dateTime({
        autoCreate: true,
        columnName: "MTA_FECHA_CREO",
        serializeAs: "dateCreate",
        prepare: (value: DateTime) => new Date(value?.toJSDate()),
      })
      public dateCreate: DateTime;
    
    @hasOne(() => TypesProgram, {
        localKey: "codProgramCode",
        foreignKey: "id",
        serializeAs: "typesProgram",
    })
    public typesProgram: HasOne<typeof TypesProgram>;


}
