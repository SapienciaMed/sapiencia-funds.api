import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export class CutValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional(),
    name: schema.string([rules.maxLength(50)]),
    from: schema.string([rules.maxLength(60)]),
    until: schema.string([rules.maxLength(60)]),

    modifyUser: schema.string.optional(),
    modifyDate: schema.string.optional(),
    createUser: schema.string(),
    createDate: schema.string(),
  });

  public messages: CustomMessages = { err: "error" };
}
