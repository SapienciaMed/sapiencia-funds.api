import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RenewalUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    enabled: schema.number()      
  });

  public messages: CustomMessages = {};
}