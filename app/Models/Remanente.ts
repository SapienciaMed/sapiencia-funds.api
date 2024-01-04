import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Remanente extends BaseModel {

  public static table = "ECO_EXCEDENTES_CONTRATOS";

  @column({ isPrimary: true, columnName: "ECO_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "ECO_CONVOCATORIA", serializeAs: "announcement" })
  public announcement: number;

  @column({ columnName: "ECO_LINEA_CREDITO", serializeAs: "creditLine" })
  public creditLine: string;

  @column({ columnName: "ECO_CONTRATO", serializeAs: "contract" })
  public contract: number;
  
  @column({ columnName: "ECO_NUMERO_BENEFICIOS", serializeAs: "numberOfBenefits" })
  public numberOfBenefits: number;
  
  @column({ columnName: "ECO_VALOR_INVERSIÓN_CONTRATO", serializeAs: "contractInvestmentValue" })
  public contractInvestmentValue: number;
  
  @column({ columnName: "ECO_VALOR_PROYECTADO", serializeAs: "projectedValue" })
  public projectedValue: number;
  
  @column({ columnName: "ECO_VALOR_COMPROMETIDO_PROYECTADO", serializeAs: "ProjectedCommittedValue" })
  public ProjectedCommittedValue: number;
  
  @column({ columnName: "ECO_VALOR_EXCEDENTE", serializeAs: "surplusValue" })
  public surplusValue: number;
  
  @column({ columnName: "ECO_GIRADO", serializeAs: "turned" })
  public turned: number;
  
  @column({ columnName: "ECO_PENDIENTE_POR_GIRAR_COMPROMETIDO", serializeAs: "pendingToBeTurnedCommitted" })
  public pendingToBeTurnedCommitted: number;
  
  @column({ columnName: "ECO_PENDIENTE_POR_GIRAR_PROYECTADO", serializeAs: "projectedSlopeToTurn" })
  public projectedSlopeToTurn: number;
  
  @column({ columnName: "ECO_RECURSOS_SIN_EJECUCIÓN", serializeAs: "resourcesWithoutExecution" })
  public resourcesWithoutExecution: number;

  @column({ columnName: "ECO_USUARIO_MODIFICO", serializeAs: "userModified" })
  public userModified: string;

  @column({ columnName: "ECO_FECHA_MODIFICO", serializeAs: "dateModified" })
  public dateModified: Date;

  @column({ columnName: "ECO_USUARIO_CREO", serializeAs: "userCreate" })
  public userCreate: string;

  @column({ columnName: "ECO_FECHA_CREO", serializeAs: "dateCreate" })
  public dateCreate: Date;





  /* @column({ columnName: "RMT_FIDUCIA", serializeAs: "trust" })
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
  public idProgram: number; */



}
