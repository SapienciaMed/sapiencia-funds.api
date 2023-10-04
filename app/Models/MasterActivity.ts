import { BaseModel, HasOne, column, hasOne } from "@ioc:Adonis/Lucid/Orm";
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
    
    @hasOne(() => TypesProgram, {
        localKey: "codProgramCode",
        foreignKey: "id",
        serializeAs: "typesProgram",
    })
    public typesProgram: HasOne<typeof TypesProgram>;


}
