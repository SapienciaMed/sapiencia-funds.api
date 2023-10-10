import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";


export default class CreateMasterValidator {
    constructor(protected ctx: HttpContextContract) {}
    
    public schema = schema.create({
        id: schema.number.optional(),
        codtlmo: schema.number(),
        name: schema.string([rules.maxLength(100)]),        
        description: schema.string.optional([rules.maxLength(500)]),
  });

  public messages: CustomMessages = { err: "error" };
} 