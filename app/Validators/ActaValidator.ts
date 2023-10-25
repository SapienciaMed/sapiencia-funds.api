import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ActaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({    
    numberProject: schema.number(),
    periodVigency: schema.number(),
    announcementInitial: schema.number(),
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
    citation: schema.array().members(
      schema.object().members({
        dateCitation: schema.string(),
        timeCitation: schema.string(),
        user: schema.string(),
        status: schema.number(),        
        dateAprobation: schema.string.optional(),
        email: schema.string(),
      })
    )
  });

  public messages: CustomMessages = {};
}
