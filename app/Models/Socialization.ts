import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Socialization extends BaseModel {
  public static table = "SIE_SOCIALIZACION_INFORMES_EJECUCION";
  @column({ isPrimary: true, columnName: "SIE_CODIGO", serializeAs: "id" })
  public id: number;
  @column({ columnName: "SIE_NUMERO_PROYECTO", serializeAs: "noProyect" })
  public noProyect: number;
  @column({ columnName: "SIE_CODIGO_COMUNA", serializeAs: "communeCode" })
  public communeCode: string;
  @column({ columnName: "SIE_FECHA", serializeAs: "socializationDate" })
  public socializationDate: any;
  @column({ columnName: "SIE_GRUPO_VALOR", serializeAs: "validity" })
  public validity: number;
  @column({ columnName: "SIE_GRUPO_VALOR", serializeAs: "valueGroup" })
  public valueGroup: string;
  @column({
    columnName: "SIE_RENDIMIENTO_FINANCIERO",
    serializeAs: "financialPerformance",
  })
  public financialPerformance: number;
  @column({
    columnName: "SIE_RECAUDOS_CARTERA",
    serializeAs: "portfolioCollections",
  })
  public portfolioCollections: number;
  @column({ columnName: "SIE_OBSERVACIONES", serializeAs: "description" })
  public description: string;
}
