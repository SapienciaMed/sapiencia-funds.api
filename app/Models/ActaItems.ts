import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import TypesProgram from './TypeProgram';
import Acta from './Acta';

export default class ActaItems extends BaseModel {
  public static table = "IAA_ITEM_ACTA";

  @column({ isPrimary: true, columnName: "IAA_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "IAA_CODFONDO", serializeAs: "idFound" })
  public idFound: number;

  @column({ columnName: "IAA_CODLINEA", serializeAs: "idLine" })
  public idLine: number;

  @column({ columnName: "IAA_CODCONVOCATORIA", serializeAs: "idAnnouncement" })
  public idAnnouncement: number;

  @column({ columnName: "IAA_CODCONCEPTO", serializeAs: "idConcept" })
  public idConcept: number;

  @column({ columnName: "IAA_COSTO_PROMEDIO", serializeAs: "costOperation" })
  public costOperation: string;

  @column({ columnName: "IAA_PERIODO_1_2", serializeAs: "periods" })
  public periods: string;

  @column({ columnName: "IAA_SUBTOTAL_VIGENCIA", serializeAs: "subtotalVigency" })
  public subtotalVigency: number;

  @column({ columnName: "IAA_COSTOS_GASTOS_OPERACION", serializeAs: "costBillsOperation" })
  public costBillsOperation: number;

  @column({ columnName: "IAA_NETO", serializeAs: "net" })
  public net: number;

  @column({ columnName: "IAA_COMISION_OPERADOR_FINANCIERO", serializeAs: "financialOperatorCommission" })
  public financialOperatorCommission: number;

  @column({ columnName: "IAA_RECURSOS_CREDITO", serializeAs: "resourcesCredit" })
  public resourcesCredit: number;

  @column({ columnName: "IAA_CODPMA_PROGRAMA", serializeAs: "idProgram" })
  public idProgram: number;

  @column({ columnName: "IAA_CODATA_ACTA", serializeAs: "idActa" })
  public idActa: string;

  @belongsTo(() => TypesProgram, {
    foreignKey: 'program',
    localKey: 'id',
  })

  public typeProgram: BelongsTo<typeof TypesProgram>

  @belongsTo(() => Acta, {
    foreignKey: 'idActa',
    localKey: 'id',
  })
  public acta: BelongsTo<typeof Acta>

}
