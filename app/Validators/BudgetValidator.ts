import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";


export default class BudgetValidatorFilter {
    constructor(protected ctx: HttpContextContract) {}
    
    public schema = schema.create({
        id_comuna: schema.number(),
        periodo: schema.number(),
        page: schema.number(),
        perPage: schema.number(),
  });

  public messages: CustomMessages = { err: "error" };
} 