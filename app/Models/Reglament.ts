import { BaseModel, HasOne, column, hasOne } from "@ioc:Adonis/Lucid/Orm";
import Programs from "./Programs";

export default class Reglament extends BaseModel {
  public static table = "RCO_REGLAMENTOS_CONDONACION";
  @column({ isPrimary: true, columnName: "RCO_CODIGO", serializeAs: "id" })
  public id: number;
  @column({ columnName: "RCO_CODPMA_PROGRAMA", serializeAs: "program" })
  public program: number;
  @column({ columnName: "RCO_PERIODO_INICIAL", serializeAs: "initialPeriod" })
  public initialPeriod: string;
  @column({ columnName: "RCO_PERIODO_ABIERTO", serializeAs: "isOpenPeriod" })
  public isOpenPeriod: boolean;
  @column({ columnName: "RCO_PERIODO_FINAL", serializeAs: "endPeriod" })
  public endPeriod: string;
  @column({
    columnName: "RCO_PORCENTAJE_TEORICO",
    serializeAs: "theoreticalPercentage",
  })
  public theoreticalPercentage: number;
  @column({
    columnName: "RCO_APLICA_SERVICIO_SOCIAL",
    serializeAs: "applySocialService",
  })
  public applySocialService: boolean;
  @column({
    columnName: "RCO_SERVICO_SOCIAL_PORCENTAJE",
    serializeAs: "socialServicePercentage",
  })
  public socialServicePercentage: number;
  @column({
    columnName: "RCO_SERVICIO_SOCIAL_HORAS",
    serializeAs: "socialServiceHours",
  })
  public socialServiceHours: number;
  @column({
    columnName: "RCO_APLICA_TRANSFERENCIA_CONOCIMIENTO",
    serializeAs: "knowledgeTransferApply",
  })
  public knowledgeTransferApply: boolean;
  @column({
    columnName: "RCO_TRANSFERENCIA_CONOCIMIENTO_PORCENTAJE",
    serializeAs: "knowledgeTransferPercentage",
  })
  public knowledgeTransferPercentage: number;
  @column({
    columnName: "RCO_TRANSFERENCIA_CONOCIMIENTO_HORAS",
    serializeAs: "knowledgeTransferHours",
  })
  public knowledgeTransferHours: number;
  @column({
    columnName: "RCO_APLICA_PERIODO_GRACIA",
    serializeAs: "gracePeriodApply",
  })
  public gracePeriodApply: boolean;
  @column({
    columnName: "RCO_PERIODO_GRACIA_MESES",
    serializeAs: "gracePeriodMonths",
  })
  public gracePeriodMonths: number;
  @column({
    columnName: "RCO_PERIODO_GRACIA_APLICACION",
    serializeAs: "gracePeriodApplication",
  })
  public gracePeriodApplication: string;
  @column({
    columnName: "RCO_APLICA_SUSPENCION_CONTINUA",
    serializeAs: "continuousSuspensionApplies",
  })
  public continuousSuspensionApplies: boolean;
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
    serializeAs: "applySpecialSuspensionsQuantity",
  })
  public applySpecialSuspensionsQuantity: number;
  @column({
    columnName: "RCO_APLICA_PRORROGA",
    serializeAs: "extensionApply",
  })
  public extensionApply: boolean;
  @column({
    columnName: "RCO_PRORROGA_CANTIDAD",
    serializeAs: "extensionApplyQuantity",
  })
  public extensionApplyQuantity: number;
  @column({
    columnName: "RCO_APLICA_CODONACION_RENDIMEINTO_PERIODO",
    serializeAs: "applyCondonationPerformancePeriod",
  })
  public applyCondonationPerformancePeriod: boolean;
  @column({
    columnName: "RCO_RENDIMIENTO_PERIODO",
    serializeAs: "performancePeriod",
  })
  public performancePeriod: string;
  @column({
    columnName: "RCO_APLICA_CODONACION_RENDIMEINTO_ACUMULADO",
    serializeAs: "accomulatedIncomeCondonationApplies",
  })
  public accomulatedIncomeCondonationApplies: boolean;
  @column({
    columnName: "RCO_RENDIMEINTO_ACUMULADO",
    serializeAs: "accumulatedPerformance",
  })
  public accumulatedPerformance: string;
  @column({
    columnName: "RCO_USUARIO_MODIFICO",
    serializeAs: "modifyUser",
  })
  public modifyUser: string;
  @column({
    columnName: "RCO_FECHA_MODIFICO",
    serializeAs: "modifyDate",
  })
  public modifyDate: string;
  @column({
    columnName: "RCO_USUARIO_CREO",
    serializeAs: "createUser",
  })
  public createUser: string;
  @column({
    columnName: "RCO_FECHA_CREO",
    serializeAs: "createDate",
  })
  public createDate: string;

  @hasOne(() => Programs, {
    localKey: "program",
    foreignKey: "id",
  })
  public programs: HasOne<typeof Programs>;
}
