import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ServiceSocialBeneficiary extends BaseModel {
  public static table = "SSB_SERVICIOS_SOCIALES_BENEFICIARIO";

  @column({ isPrimary: true, columnName: "SSB_CODIGO", serializeAs: "id" }) 
  public id: number;

  @column({ columnName: "SSB_PERIODO_LEGALIZACION", serializeAs: "legalizationPeriod" })
  public legalizationPeriod: string;

  @column({ columnName: "SSB_CODBAC_BENEFICIARIO_CONSOLIDACION", serializeAs: "consolidationBeneficiary" })
  public consolidationBeneficiary: number;

  @column({ columnName: "SSB_HORAS_PRESTADAS", serializeAs: "hoursBorrowed" })
  public hoursBorrowed: number;

  @column({ columnName: "SSB_RUTA_DOCUMENTO_SOPORTE", serializeAs: "supportDocumentRoute" })
  public supportDocumentRoute: string;
}
