import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany  } from '@ioc:Adonis/Lucid/Orm'
import State from './State';
import ActaItems from './ActaItems';
import Citation from './Citation';

export default class Acta extends BaseModel {

  public static table = "ATA_ACTA";

  @column({ isPrimary: true, columnName: "ATA_CODIGO", serializeAs: "id" }) public id: number;

  @column({ columnName: "ATA_NUMERO_PROYECTO", serializeAs: "numberProject" })
  public numberProject: number;

  @column({ columnName: "ATA_PERIODO_VIGENCIA", serializeAs: "periodVigency" })
  public periodVigency: number;

  @column({ columnName: "ATA_CONVOCATORIA_INICIAL", serializeAs: "announcementInitial" })
  public announcementInitial: string;

  @column({ columnName: "ATA_SALARIO_MINIMO", serializeAs: "salaryMin" })
  public salaryMin: number;

  @column({ columnName: "ATA_COSTOSGASTOS_OPERACION_LOGISTICA", serializeAs: "costsExpenses" })
  public costsExpenses: number;

  @column({ columnName: "ATA_COMISION_OPERADOR_FINANCIERO", serializeAs: "OperatorCommission" })
  public OperatorCommission: number;

  @column({ columnName: "ATA_OPERACION_FINANCIERA_MB", serializeAs: "financialOperation" })
  public financialOperation: number;

  @column({ columnName: "ATA_FECHA_CREACION", serializeAs: "creationDate" })
  public creationDate: string;

  @column({ columnName: "ATA_CODETO_CODIGO", serializeAs: "idStatus" })
  public idStatus: number; 


  @belongsTo(() => State, {
    foreignKey: 'idStatus', 
    localKey: 'id',        
  })
  public typeMasterList: BelongsTo<typeof State>

  @hasMany(() => ActaItems, {
    localKey: "id",
    foreignKey: "idActa",
    serializeAs: "items",
  })
  public items: HasMany<typeof ActaItems>;

  @hasMany(() => Citation, {
    localKey: "id",
    foreignKey: "idActa",
    serializeAs: "citation",
  })
  public citation: HasMany<typeof Citation>;
}
