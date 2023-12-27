import { BaseModel, column, hasMany, hasOne, HasOne, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Programs from './Programs';
import Requeriment from './Requeriment';

export default class Reglament extends BaseModel {

  public static table = "RCO_REGLAMENTOS_CONDONACION";

  @column({
    isPrimary: true,
    columnName: "RCO_CODIGO",
    serializeAs: "id"
  })
  public id: number;

  @column({
    columnName: "RCO_CODPMA_PROGRAMA",
    serializeAs: "idProgram"
  })
  public idProgram: number;

  @column({
    columnName: "RCO_PERIODO_INICIAL",
    serializeAs: "initialPeriod"
  })
  public initialPeriod: string;

  @column({
    columnName: "RCO_PERIODO_INICIAL_NUMERICO",
    serializeAs: "initialPeriodNumber"
  })
  public initialPeriodNumber: number;

  @column({
    columnName: "RCO_PERIODO_ABIERTO",
    serializeAs: "isOpenPeriod"
  })
  public isOpenPeriod: boolean;

  @column({
    columnName: "RCO_PERIODO_FINAL",
    serializeAs: "endPeriod"
  })
  public endPeriod: string;

  @column({
    columnName: "RCO_PERIODO_FINAL_NUMERICO",
    serializeAs: "endPeriodNumber"
  })
  public endPeriodNumber: number;

  @column({
    columnName: "RCO_APLICA_PORCENTAJE_TEORICO",
    serializeAs: "applyTheoreticalSemiannualPercent",
  })
  public applyTheoreticalSemiannualPercent: boolean;

  @column({
    columnName: "RCO_PORCENTAJE_TEORICO",
    serializeAs: "theoreticalPercentage",
  })
  public theoreticalSemiannualPercent: number;

  @column({
    columnName: "RCO_APLICA_PORCENTAJE_RENDIMIENTO_ACADEMICO",
    serializeAs: "applyAcademicPerformancePercent",
  })
  public applyAcademicPerformancePercent: boolean;

  @column({
    columnName: "RCO_PORCENTAJE_RENDIMIENTO_ACADEMICO",
    serializeAs: "academicPerformancePercent",
  })
  public academicPerformancePercent: number;

  @column({
    columnName: "RCO_APLICA_PORCENTAJE_REQUISITOS",
    serializeAs: "applyRequirementsPercent",
  })
  public applyRequirementsPercent: boolean;

  @column({
    columnName: "RCO_PORCENTAJE_REQUISITOS",
    serializeAs: "requirementsPercent",
  })
  public requirementsPercent: number;

  @column({
    columnName: "RCO_APLICA_SERVICIO_SOCIAL",
    serializeAs: "applySocialService",
  })
  public applySocialService: boolean;

  @column({
    columnName: "RCO_SERVICO_SOCIAL_PORCENTAJE",
    serializeAs: "socialServicePercent",
  })
  public socialServicePercent: number;

  @column({
    columnName: "RCO_SERVICIO_SOCIAL_HORAS",
    serializeAs: "socialServiceHours",
  })
  public socialServiceHours: number;

  @column({
    columnName: "RCO_SERVICIO_SOCIAL_TIPO_CONDONACION",
    serializeAs: "socialServiceCondonationType",
  })
  public socialServiceCondonationType: string;

  @column({
    columnName: "RCO_SERVICIO_SOCIAL_CONDONACION",
    serializeAs: "socialServiceCondonationPercent",
  })
  public socialServiceCondonationPercent: string;

  @column({
    columnName: "RCO_APLICA_TRANSFERENCIA_CONOCIMIENTO",
    serializeAs: "applyKnowledgeTransfer",
  })
  public applyKnowledgeTransfer: boolean;

  @column({
    columnName: "RCO_TRANSFERENCIA_CONOCIMIENTO_PORCENTAJE",
    serializeAs: "knowledgeTransferPercent",
  })
  public knowledgeTransferPercent: number;

  @column({
    columnName: "RCO_TRANSFERENCIA_CONOCIMIENTO_HORAS",
    serializeAs: "knowledgeTransferHours",
  })
  public knowledgeTransferHours: number;

  @column({
    columnName: "RCO_TRANSFERENCIA_CONOCIMIENTO_TIPO_CONDONACION",
    serializeAs: "knowledgeTransferCondonationType",
  })
  public knowledgeTransferCondonationType: string;

  @column({
    columnName: "RCO_TRANSFERENCIA_CONOCIMIENTO_CONDONACION",
    serializeAs: "knowledgeTransferCondonationPercent",
  })
  public knowledgeTransferCondonationPercent: string;

  @column({
    columnName: "RCO_APLICA_PERIODO_GRACIA",
    serializeAs: "applyGracePeriod",
  })
  public applyGracePeriod: boolean;

  @column({
    columnName: "RCO_PERIODO_GRACIA_MESES",
    serializeAs: "gracePeriodMonths",
  })
  public gracePeriodMonths: number;

  @column({
    columnName: "RCO_PERIODO_GRACIA_APLICACION",
    serializeAs: "graceDateApplication",
  })
  public graceDateApplication: string;

  @column({
    columnName: "RCO_APLICA_SUSPENCION_CONTINUA",
    serializeAs: "applyContinuousSuspension",
  })
  public applyContinuousSuspension: boolean;

  @column({
    columnName: "RCO_SUSPENCION_CONTINUA_CANTIDAD",
    serializeAs: "continuosSuspencionQuantity",
  })
  public continuosSuspencionQuantity: number;

  @column({
    columnName: "RCO_APLICA_SUSPENCION_DISCONTINUA",
    serializeAs: "applyDiscontinuousSuspension",
  })
  public applyDiscontinuousSuspension: boolean;

  @column({
    columnName: "RCO_SUSPENCION_DISCONTINUA_CANTIDAD",
    serializeAs: "discontinuousSuspensionQuantity",
  })
  public discontinuousSuspensionQuantity: number;

  @column({
    columnName: "RCO_APLICA_SUSPENCION_ESPECIAL",
    serializeAs: "applySpecialSuspensions",
  })
  public applySpecialSuspensions: boolean;

  @column({
    columnName: "RCO_SUSPENCION_ESPECIAL_CANTIDAD",
    serializeAs: "specialSuspensionsQuantity",
  })
  public specialSuspensionsQuantity: number;

  @column({
    columnName: "RCO_APLICA_PRORROGA",
    serializeAs: "applyExtension",
  })
  public applyExtension: boolean;

  @column({
    columnName: "RCO_PRORROGA_CANTIDAD",
    serializeAs: "extensionQuantity",
  })
  public extensionQuantity: number;

  @column({
    columnName: "RCO_APLICA_CODONACION_RENDIMEINTO_PERIODO",
    serializeAs: "applyCondonationPerformancePeriod",
  })
  public applyCondonationPerformancePeriod: boolean;

  @column({
    columnName: "RCO_RENDIMIENTO_PERIODO",
    serializeAs: "performancePeriodStructure",
  })
  public performancePeriodStructure: string; //IPerformanceStructure

  @column({
    columnName: "RCO_APLICA_CODONACION_RENDIMEINTO_ACUMULADO",
    serializeAs: "applyAccomulatedIncomeCondonation",
  })
  public applyAccomulatedIncomeCondonation: boolean;

  @column({
    columnName: "RCO_RENDIMEINTO_ACUMULADO",
    serializeAs: "accumulatedPerformanceDataTable",
  })
  public accumulatedPerformanceDataTable: string; //IPerformanceStructure

  @column({
    columnName: "RCO_USUARIO_MODIFICO",
    serializeAs: "modifyUser",
  })
  public modifyUser: string;

  @column({
    columnName: "RCO_FECHA_MODIFICO",
    serializeAs: "modifyDate",
  })
  public modifyDate: Date;

  @column({
    columnName: "RCO_USUARIO_CREO",
    serializeAs: "createUser",
  })
  public createUser: string;

  @column({
    columnName: "RCO_FECHA_CREO",
    serializeAs: "createDate",
  })
  public createDate: Date;

  //Relaciones.

  @hasOne(() => Programs, {
    localKey: "idProgram",
    foreignKey: "id",
    serializeAs: "programs",
  })
  public programs: HasOne<typeof Programs>;

  @hasMany(() => Requeriment, {
    foreignKey: "codReglament",
    serializeAs: "requirements",
  })
  public requirements: HasMany<typeof Requeriment>;

}
