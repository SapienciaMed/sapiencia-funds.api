import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import ResourcePrioritization from './ResourcePrioritization'

export default class ControlSelectStratum456Model extends BaseModel {
    public static table = "CFE_CONTROL_FINANCIERO_ESTRATOS456"

    @column({ isPrimary: true, columnName: "CFE_CODIGO", serializeAs: "id" })
    public id: number;
    @column({ columnName: "CFE_CODPPR_RECURSO_PRIORIZACION", serializeAs: "idResourcePrioritization" })
    public idResourcePrioritization: number;
    @column({ columnName: "CFE_CONVOCATORIA", serializeAs: "announcement" })
    public announcement: string;
    @column({ columnName: "CFE_VIGENCIA", serializeAs: "validity" })
    public validity: string;
    @column({ columnName: "CFE_RECURSO_DISPONIBLE", serializeAs: "resourceAvailable" })
    public resourceAvailable: number;
    @column({ columnName: "CFE_OTORGADO", serializeAs: "granted" })
    public granted: number;
    @column({ columnName: "CFE_LEGALIZADOS", serializeAs: "legalized" })
    public legalized: number;

    @belongsTo(() => ResourcePrioritization, {
        foreignKey: "idResourcePrioritization",
        localKey: "id",
    })
    public resourcePrioritization: BelongsTo<typeof ResourcePrioritization>
}