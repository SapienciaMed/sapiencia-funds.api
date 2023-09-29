import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";


export default class CreateAndUpdateMasterActivityValidator {
    constructor(protected ctx: HttpContextContract) {}
    
    public schema = schema.create({
        id: schema.number.optional(),
        name: schema.string([rules.maxLength(20)]),
        totalValue: schema.number(),
        codProgramCode: schema.number(),
        description: schema.string.optional([rules.maxLength(500)]),
  });

  public messages: CustomMessages = { err: "error" };
} 