import { BaseModel, BelongsTo, belongsTo, column,  } from '@ioc:Adonis/Lucid/Orm'
import State from './State';

export default class Certificate extends BaseModel {

  public static table = "LMA_LISTADOS_MAESTROS";

  @column({ isPrimary: true, columnName: "ATA_CODIGO", serializeAs: "id" }) public id: number;

  @column({ columnName: "ATA_NUMERO_PROYECTO", serializeAs: "numberProject" })
  public numberProject: number;

  @column({ columnName: "ATA_PERIODO_VIGENCIA", serializeAs: "periodVigency" })
  public periodVigency: number;

  @column({ columnName: "ATA_CONVOCATORIA_INICIAL", serializeAs: "announcementInitial" })
  public announcementInitial: number;

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

}
