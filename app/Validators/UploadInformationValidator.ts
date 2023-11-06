import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";


export default class UploadInformationValidatorValidator {
    constructor(protected ctx: HttpContextContract) {}
    
    public schema = schema.create({
        id: schema.number.optional(),
        commune: schema.string([rules.maxLength(30)]),
        validity: schema.string([rules.maxLength(10)]),
        information: schema.string([rules.maxLength(30)]),
        fileName: schema.string.optional([rules.maxLength(50)]),
        dateUpload:schema.date.optional(),
  });

  public messages: CustomMessages = { err: "error" };
} 
