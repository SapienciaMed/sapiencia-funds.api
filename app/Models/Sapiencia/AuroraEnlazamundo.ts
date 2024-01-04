import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class AuroraEMRenovado extends BaseModel {
  public static table = "vw_aurora_enlazamundos_legalizados";
  public static connection = "mysql_sapiencia";

  @column({ isPrimary: true, columnName: "id_usuario", serializeAs: "id" })
  public id: number;

  @column({ columnName: "periodo", serializeAs: "period" })
  public period: number;

  @column({ columnName: "periodo_descripcion", serializeAs: "periodDetail" })
  public periodDetail: string;

  @column({ columnName: "Pseleccion", serializeAs: "pSelection" })
  public pSelection: string;

  @column({
    columnName: "Pseleccion_descripcion",
    serializeAs: "pSelectionDescription",
  })
  public pSelectionDescription: string;

  @column({ columnName: "id_fondo", serializeAs: "idFund" })
  public idFund: number;

  @column({ columnName: "Fondo", serializeAs: "fund" })
  public fund: String;

  @column({ columnName: "Documento", serializeAs: "document" })
  public document: string;

  @column({ columnName: "Nombre", serializeAs: "name" })
  public name: string;

  @column({ columnName: "correo", serializeAs: "email" })
  public email: string;

  @column({ columnName: "celular", serializeAs: "cellPhone" })
  public cellPhone: string;
  @column({ columnName: "fechaRgresoAntioquia", serializeAs: "returnDate" })
  public returnDate: string;
  @column({ columnName: "comuna", serializeAs: "commune" })
  public commune: number;
  @column({ columnName: "modalidad", serializeAs: "modality" })
  public modality: string;
  @column({ columnName: "puntaje", serializeAs: "score" })
  public score: number;
  @column({ columnName: "precio_dolar", serializeAs: "dollarPrice" })
  public dollarPrice: number;
  @column({ columnName: "valor_dolar", serializeAs: "dollarValue" })
  public dollarValue: number;
  @column({ columnName: "valor_pesos", serializeAs: "pesosValue" })
  public pesosValue: number;
  @column({ columnName: "periodo_calculado", serializeAs: "periodCalculate" })
  public periodCalculate: number;
  @column({ columnName: "observacion", serializeAs: "observation" })
  public observation: string;
  @column({ columnName: "fecha_calculo", serializeAs: "dateCalculation" })
  public dateCalculation: string;
  @column({ columnName: "idfiducia", serializeAs: "idTrust" })
  public idTrust: number;
  @column({ columnName: "orden", serializeAs: "order" })
  public order: number;
  @column({ columnName: "total_dias", serializeAs: "totalDays" })
  public totalDays: number;
}
