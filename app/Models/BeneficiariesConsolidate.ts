import { DateTime } from "luxon";
import { BaseModel, column, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm";
import Programs from "./Programs";
import Cut from "./Cut";
import MasterStatusPacc from './MasterStatusPacc';

export default class BeneficiariesConsolidate extends BaseModel {
  public static table = "BAC_BENEFICIARIOS_A_CONSOLIDAR";

  @column({
    isPrimary: true,
    columnName: "BAC_CODIGO",
    serializeAs: "id"
  })
  public id: number;

  @column.dateTime({
    autoCreate: true,
    columnName: "BAC_FECHA_CARGA",
    serializeAs: "dateCarry",
  })
  public dateCarry: DateTime;

  @column({
    columnName: "BAC_FECHA_MARCACION",
    serializeAs: "dateMark"
  })
  public dateMark: Date;

  @column({
    columnName: "BAC_CODPMA_PROGRAMA",
    serializeAs: "idProgram"
  })
  public idProgram: number;

  @column({
    columnName: "BAC_CODPCRT_CORTE",
    serializeAs: "idCut"
  })
  public idCut: number;

  @column({
    columnName: "BAC_NUMERO_DOCUMENTO",
    serializeAs: "numberDocument"
  })
  public numberDocument: string;

  @column({
    columnName: "BAC_NUMERO_CREDITO",
    serializeAs: "creditNumber"
  })
  public creditNumber: number;

  @column({
    columnName: "BAC_NUMERO_CONTRATO_FIDUCIARIO",
    serializeAs: "fiducyContractNumber",
  })
  public fiducyContractNumber: number;

  @column({
    columnName: "BAC_PERIODO_LEGALIZACION",
    serializeAs: "legalPeriod",
  })
  public legalPeriod: string;

  @column({
    columnName: "BAC_CANTIDAD_SUSPENCIONES_CONTINUAS",
    serializeAs: "countSuspendContinues",
  })
  public countSuspendContinues: number;

  @column({
    columnName: "BAC_CANTIDAD_SUSPENCIONES_DISCONTINUAS",
    serializeAs: "countSuspendDiscontinues",
  })
  public countSuspendDiscontinues: number;

  @column({
    columnName: "BAC_CANTIDAD_SUSPENCIONES_ESPECIALES",
    serializeAs: "countSuspendSpecials",
  })
  public countSuspendSpecials: number;

  @column({
    columnName: "BAC_CODEPP_ESTADO_PROCESO",
    serializeAs: "idStatusProcessPacc"
  })
  public idStatusProcessPacc: number;

  @column({
    columnName: "BAC_ESTADO_SAPIENCIA",
    serializeAs: "statusSapiencia",
  })
  public statusSapiencia: number;

  @column({
    columnName: "BAC_CANTIDAD_SEMETRES_PROYECTADOS",
    serializeAs: "countSemesterProjected",
  })
  public countSemesterProjected: number;

  @column({
    columnName: "BAC_GIROS_PROYECTADOS",
    serializeAs: "countSpinProjected",
  })
  public countSpinProjected: number;

  @column({
    columnName: "BAC_CANTIDAD_GIROS",
    serializeAs: "countSpins"
  })
  public countSpins: number;

  @column({
    columnName: "BAC_PERIODO_ULTIMO_GIRO",
    serializeAs: "periodUltimaeSpin",
  })
  public periodUltimaeSpin: string;

  @column({
    columnName: "BAC_CANTIDAD_RENOVACIONES",
    serializeAs: "countRenew",
  })
  public countRenew: number;

  @column({
    columnName: "BAC_FECHA_REGRESO_DEPARTAMENTO",
    serializeAs: "dateDepartmentReturn"
  })
  public dateDepartmentReturn: Date;

  @column({
    columnName: "BAC_FECHA_INGRESO",
    serializeAs: "dateIncome"
  })
  public dateIncome: Date;

  @column({
    columnName: "BAC_PERIODO_GRACIA",
    serializeAs: "gracePeriod"
  })
  public gracePeriod: string;

  @column({
    columnName: "BAC_INICIO_PERIODO_GRACIA",
    serializeAs: "dateInitialGracePeriod"
  })
  public dateInitialGracePeriod: Date;

  @column({
    columnName: "BAC_FIN_PERIODO_GRACIA",
    serializeAs: "dateEndGracePeriod"
  })
  public dateEndGracePeriod: Date;

  //----------------------------------------------------------------------------- 24/11/2023
  //------ //TODO: Revisar (Más adelante no deberíamos tomar los datos de acá)//
  //------ //TODO: Se supone que esto vendrá de otras vistas que proporcione Sapiencia
  //----------------------------------------------------------------------------------------

  @column({
    columnName: "BAC_NOMBRES",
    serializeAs: "fullName",
  })
  public fullName: string;

  @column({
    columnName: "BAC_CORREO",
    serializeAs: "email",
  })
  public email: string;

  @column({
    columnName: "BAC_NRO_CONTACTO",
    serializeAs: "contactNumber",
  })
  public contactNumber: string;

  @column({
    columnName: "BAC_MOTIVO",
    serializeAs: "reason",
  })
  public reason: string;

  @column({
    columnName: "BAC_CARACTERIZACION",
    serializeAs: "characterization",
  })
  public characterization: string;

  @column({
    columnName: "BAC_RESPONSABLE_ACTUAL",
    serializeAs: "currentManager",
  })
  public currentManager: string;

  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------

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

  @hasOne(() => MasterStatusPacc, {
    localKey: "idStatusProcessPacc",
    foreignKey: "id",
    serializeAs: "statusPacc",
  })
  public statusPacc: HasOne<typeof MasterStatusPacc>;

}
