import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ActaValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    numberProject: schema.number(),
    periodVigency: schema.number(),
    announcementInitial: schema.string(),
    salaryMin: schema.number(),
    costsExpenses: schema.number(),
    OperatorCommission: schema.number(),
    financialOperation: schema.number(),
    idStatus: schema.number(),
    items: schema.array().members(
      schema.object().members({
        idFound: schema.number(),
        idLine: schema.number(),
        idAnnouncement: schema.number(),
        idConcept: schema.number(),
        costOperation: schema.string(),
        periods: schema.object().members({
          quantityPeriod1: schema.number.optional(),
          valuePeriod1: schema.number.optional(),
          quantityPeriod2: schema.number.optional(),
          valuePeriod2: schema.number.optional(),
        }),
        subtotalVigency: schema.number(),
        costBillsOperation: schema.number(),
        net: schema.number(),
        financialOperatorCommission: schema.number(),
        resourcesCredit: schema.number(),
        idProgram: schema.number(),
      })
    ),
    citation: schema.array.optional().members(
      schema.object().members({
        dateCitation: schema.string.optional(),
        timeCitation: schema.string.optional(),
        user: schema.string.optional(),
        status: schema.number.optional(),
        dateAprobation: schema.string.optional(),
        email: schema.string.optional(),
      })
    )
  });

  public messages: CustomMessages = {};
}
