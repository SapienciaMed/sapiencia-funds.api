import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import ResourcePrioritization from './ResourcePrioritization'

export default class ControlSelectModel extends BaseModel {
    public static table = "CFV_CONTROL_FINANCIERO_VOTACION"

    @column({ isPrimary: true, columnName: "CFV_CODIGO", serializeAs: "id" })
    public id: number;
    @column({ columnName: "CFV_CODPPR_RECURSO_PRIORIZACION", serializeAs: "idResourcePrioritization" })
    public idResourcePrioritization: number;
    @column({ columnName: "CFV_CONVOCATORIA", serializeAs: "announcement" })
    public announcement: string;
    @column({ columnName: "CFV_CONSOLIDADO_PRESELECIONADOS", serializeAs: "consolidatedPreselected" })
    public consolidatedPreselected: number;
    @column({ columnName: "CFV_CONSOLIDADO_RECURSO_DISPONIBLE", serializeAs: "consolidatedResourceAvailable" })
    public consolidatedResourceAvailable: number;
    @column({ columnName: "CFV_CONSOLIDADO_OTORGADO", serializeAs: "consolidatedGranted" })
    public consolidatedGranted: number;
    @column({ columnName: "CFV_CONSOLIDADO_LEGALIZADOS", serializeAs: "consolidatedLegalized" })
    public consolidatedLegalized: number;
    @column({ columnName: "CFV_CONSOLIDADO_RENDIMIENTOS_FINANCIEROS", serializeAs: "consolidatedFinancialReturns" })
    public consolidatedFinancialReturns: number;
    @column({ columnName: "CFV_ESTRATO123_RECURSO_DISPONIBLE", serializeAs: "Stratum123ResourceAvailable" })
    public Stratum123ResourceAvailable: number;
    @column({ columnName: "CFV_ESTRATO123_OTORGADO", serializeAs: "Stratum123Granted" })
    public Stratum123Granted: number;
    @column({ columnName: "CFV_ESTRATO123_LEGALIZADOS", serializeAs: "Stratum123Legalized" })
    public Stratum123Legalized: number;
    @column({ columnName: "CFV_ESTRATO456_RECURSO_DISPONIBLE", serializeAs: "Stratum456ResourceAvailable" })
    public Stratum456ResourceAvailable: number;
    @column({ columnName: "CFV_ESTRATO456_OTORGADO", serializeAs: "Stratum456Granted" })
    public Stratum456Granted: number;
    @column({ columnName: "CFV_ESTRATO456_LEGALIZADOS", serializeAs: "Stratum456Legalized" })
    public Stratum456Legalized: number;

    @belongsTo(() => ResourcePrioritization, {
        foreignKey: "idResourcePrioritization",
        localKey: "id",
    })
    public resourcePrioritization: BelongsTo<typeof ResourcePrioritization>
}