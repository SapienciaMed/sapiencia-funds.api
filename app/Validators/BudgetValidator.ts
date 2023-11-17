import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";


export default class BudgetValidatorFilter {
    constructor(protected ctx: HttpContextContract) {}
    
    public schema = schema.create({
      page: schema.number([rules.required(), rules.unsigned()]),
      perPage: schema.number([rules.required(), rules.unsigned()]),
      id_comuna: schema.string(),
      periodo: schema.number(),
  });

  public messages: CustomMessages = { err: "error" };
} 