import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import ResourcePrioritization from './ResourcePrioritization'

export default class ControlSelectConsolidateModel extends BaseModel {
    public static table = "CFC_CONTROL_FINANCIERO_CONSOLIDADO"

    @column({ isPrimary: true, columnName: "CFC_CODIGO", serializeAs: "id" })
    public id: number;
    @column({ columnName: "CFC_CODPPR_RECURSO_PRIORIZACION", serializeAs: "idResourcePrioritization" })
    public idResourcePrioritization: number;
    @column({ columnName: "CFC_CONVOCATORIA", serializeAs: "announcement" })
    public announcement: string;
    @column({ columnName: "CFC_VIGENCIA", serializeAs: "validity" })
    public validity: string;
    @column({ columnName: "CFC_CONSOLIDADO_PRESELECIONADOS", serializeAs: "consolidatedPreselected" })
    public consolidatedPreselected: number;
    @column({ columnName: "CFC_CONSOLIDADO_RECURSO_DISPONIBLE", serializeAs: "consolidatedResourceAvailable" })
    public consolidatedResourceAvailable: number;
    @column({ columnName: "CFC_CONSOLIDADO_OTORGADO", serializeAs: "consolidatedGranted" })
    public consolidatedGranted: number;
    @column({ columnName: "CFC_CONSOLIDADO_LEGALIZADOS", serializeAs: "consolidatedLegalized" })
    public consolidatedLegalized: number;
    @column({ columnName: "CFC_CONSOLIDADO_RENDIMIENTOS_FINANCIEROS", serializeAs: "consolidatedFinancialReturns" })
    public consolidatedFinancialReturns: number;
    @column({ columnName: "CFC_CONSOLIDADO_CUPOS", serializeAs: "places" })
    public places: number;

    @belongsTo(() => ResourcePrioritization, {
        foreignKey: "idResourcePrioritization",
        localKey: "id",
    })
    public resourcePrioritization: BelongsTo<typeof ResourcePrioritization>
}