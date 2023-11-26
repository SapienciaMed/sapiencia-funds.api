import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";


export default class RenewalValidator {
    constructor(protected ctx: HttpContextContract) {}
    
    public schema = schema.create({

      period: schema.string(),
      fund:schema.string(),
      enabled:schema.number(),
      renewed:schema.number(),
      percentage:schema.string(),

  });

  public messages: CustomMessages = { err: "error" };
}