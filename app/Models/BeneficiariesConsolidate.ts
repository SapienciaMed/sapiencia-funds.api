import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import Programs from './Programs';
import Cut from './Cut';

export default class BeneficiariesConsolidate extends BaseModel {
  public static table = "BAC_BENEFICIARIOS_A_CONSOLIDAR";

  @column({ isPrimary: true,
            columnName: "BAC_CODIGO",
            serializeAs: "id" })
  public id: number

  @column.dateTime({ autoCreate: true,
                     columnName: "BAC_FECHA_CARGA",
                     serializeAs: "dateCarry" })
  public dateCarry: DateTime

  @column({ columnName: "BAC_FECHA_MARCACION", serializeAs: "dateMark" })
  public dateMark: Date;

  @column({ columnName: "BAC_CODPMA_PROGRAMA", serializeAs: "idProgram" })
  public idProgram: number;

  @column({ columnName: "BAC_CODPCRT_CORTE", serializeAs: "idCut" })
  public idCut: number;

  @column({ columnName: "BAC_NUMERO_DOCUMENTO", serializeAs: "numberDocument" })
  public numberDocument: string;

  @column({ columnName: "BAC_NUMERO_CREDITO", serializeAs: "creditNumber" })
  public creditNumber: number;

  @column({ columnName: "BAC_NUMERO_CONTRATO_FIDUCIARIO", serializeAs: "fiducyContractNumber" })
  public fiducyContractNumber: number;

  @column({ columnName: "BAC_PERIODO_LEGALIZACION", serializeAs: "legalPeriod" })
  public legalPeriod: string;

  @column({ columnName: "BAC_CANTIDAD_SUSPENCIONES_CONTINUAS", serializeAs: "countSuspendContinues" })
  public countSuspendContinues: number;

  @column({ columnName: "BAC_CANTIDAD_SUSPENCIONES_DISCONTINUAS", serializeAs: "countSuspendDiscontinues" })
  public countSuspendDiscontinues: number;

  @column({ columnName: "BAC_CANTIDAD_SUSPENCIONES_ESPECIALES", serializeAs: "countSuspendSpecials" })
  public countSuspendSpecials: number;

  @column({ columnName: "BAC_ESTADO_PROCESO", serializeAs: "statusProcess" })
  public statusProcess: string;

  @column({ columnName: "BAC_ESTADO_SAPIENCIA", serializeAs: "statusSapiencia" })
  public statusSapiencia: number;

  @column({ columnName: "BAC_CANTIDAD_SEMETRES_PROYECTADOS", serializeAs: "countSemesterProjected" })
  public countSemesterProjected: number;

  @column({ columnName: "BAC_CANTIDAD_GIROS", serializeAs: "countSpins" })
  public countSpins: number;

  @column({ columnName: "BAC_PERIODO_ULTIMO_GIRO", serializeAs: "periodUltimaeSpin" })
  public periodUltimaeSpin: string;

  @column({ columnName: "BAC_CANTIDAD_RENOVACIONES", serializeAs: "countRenew" })
  public countRenew: number;

  @hasOne(() => Programs, {
    localKey: "idProgram",
    foreignKey: "id",
    serializeAs: "programs",
  })
  public programs: HasOne<typeof Programs>;

  @hasOne(() => Cut, {
    localKey: "idCut",
    foreignKey: "id",
    serializeAs: "cuts",
  })
  public cuts: HasOne<typeof Cut>;

}

