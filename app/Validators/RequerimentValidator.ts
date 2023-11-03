import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export class RequerimentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional(),
    active: schema.boolean.optional(),
    codReglament: schema.number.optional(),
    percent: schema.number.optional(),
    description: schema.string([rules.maxLength(200)]),
  });

  public messages: CustomMessages = { err: "error" };
}
