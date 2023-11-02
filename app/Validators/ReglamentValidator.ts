import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export class ReglamentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional(),
    program: schema.string([rules.maxLength(60)]),
    initialPeriod: schema.string([rules.maxLength(60)]),
    openPeriod: schema.boolean(),
    endPeriod: schema.string.optional([rules.maxLength(60)]),
    theoreticalPercentage: schema.number(),
    applySocialService: schema.boolean(),
    socialServicePercentage: schema.number.optional(),
    socialServiceHours: schema.number.optional(),
    knowledgeTransferApply: schema.boolean(),
    knowledgeTransferPercentage: schema.number.optional(),
    knowledgeTransferHours: schema.number.optional(),
    gracePeriodApply: schema.boolean(),
    gracePeriodMonths: schema.number.optional(),
    gracePeriodApplication: schema.string.optional([rules.maxLength(60)]),
    continuousSuspensionApplies: schema.boolean(),
    continuosSuspencionQuantity: schema.number.optional(),
    applyDiscontinuousSuspension: schema.boolean(),
    discontinuousSuspensionQuantity: schema.number.optional(),
    applySpecialSuspensions: schema.boolean(),
    applySpecialSuspensionsQuantity: schema.number.optional(),
    extensionApply: schema.boolean(),
    extensionApplyQuantity: schema.number.optional(),
    applyCondonationPerformancePeriod: schema.boolean(),
    performancePeriod: schema.string.optional(),
    accomulatedIncomeCondonationApplies: schema.boolean(),
    accumulatedPerformance: schema.string.optional(),
    modifyUser: schema.string.optional(),
    modifyDate: schema.string.optional(),
    createUser: schema.string(),
    createDate: schema.string(),
  });

  public messages: CustomMessages = { err: "error" };
}
