import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ControlSelectLegalization extends BaseModel {
    public static table = "CFL_CONTROL_FINANCIERO_LEGALIZATION"

    @column({ isPrimary: true, columnName: "CFL_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "CFL_PROGRAMA", serializeAs: "program" })
    public program: string;
    @column({ columnName: "CFL_CONVOCATORIA", serializeAs: "announcement" })
    public announcement: number;
    @column({ columnName: "CFl_RECURSO_DISPONIBLE", serializeAs: "Availableresources" })
    public Availableresources: number;
    @column({ columnName: "CFl_PRESELECIONADOS", serializeAs: "Preselected" })
    public Preselected: number;
    @column({ columnName: "CFl_OTORGADO", serializeAs: "Granted" })
    public Granted: number;
    @column({ columnName: "CFl_LEGALIZADOS", serializeAs: "Legalized" })
    public Legalized: number;
    @column({ columnName: "CFC_CUPOS", serializeAs: "places" })
    public places: number;

}