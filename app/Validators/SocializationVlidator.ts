import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export class SocializationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional(),
    noProyect: schema.number(),
    communeCode: schema.string([rules.maxLength(10)]),
    socializationDate: schema.string(),
    validity: schema.number(),
    valueGroup: schema.string([rules.maxLength(5)]),
    financialPerformance: schema.number(),
    portfolioCollections: schema.number(),
    description: schema.string.optional([rules.maxLength(500)]),
  });

  public messages: CustomMessages = { err: "error" };
}

export class SocializationUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional(),
    socializationDate: schema.string(),
    valueGroup: schema.string([rules.maxLength(5)]),
    financialPerformance: schema.number(),
    portfolioCollections: schema.number(),
    description: schema.string.optional([rules.maxLength(500)]),
  });

  public messages: CustomMessages = { err: "error" };
}
