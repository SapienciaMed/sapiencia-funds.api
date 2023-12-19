import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Remanente extends BaseModel {

  public static table = "RMT_REMANETES";

  @column({ isPrimary: true, columnName: "RMT_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "RMT_CONVOCATORIA", serializeAs: "announcement" })
  public announcement: number;

  @column({ columnName: "RMT_FIDUCIA", serializeAs: "trust" })
  public trust: number;
  
  @column({ columnName: "RMT_FONDO_COMUNA", serializeAs: "communityFund" })
  public communityFund: number;
  
  @column({ columnName: "RMT_RESTANTE", serializeAs: "remaining" })
  public remaining: number;
  
  @column({ columnName: "RMT_COSTO_PROMEDIO", serializeAs: "averageCost" })
  public averageCost: number;
  
  @column({ columnName: "RMT_CUPOS", serializeAs: "quotas" })
  public quotas: number;
  
  @column({ columnName: "RMT_RECURSO_CUPOS", serializeAs: "quotaResource" })
  public quotaResource: number;
  
  @column({ columnName: "RMT_RECIDUAL", serializeAs: "residual" })
  public residual: number;

  @column({ columnName: "RMT_USUARIO_MODIFICO", serializeAs: "userModified" })
  public userModified: string;

  @column({ columnName: "RMT_FECHA_MODIFICO", serializeAs: "dateModified" })
  public dateModified: Date;

  @column({ columnName: "RMT_USUARIO_CREO", serializeAs: "userCreate" })
  public userCreate: string;

  @column({ columnName: "RMT_FECHA_CREO", serializeAs: "dateCreate" })
  public dateCreate: Date;
  
  @column({ columnName: "RMT_CODPMA_PROGRAMA", serializeAs: "idProgram" })
  public idProgram: number;



}
