import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RemnantValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({  
    remaining: schema.number(),
    averageCost: schema.number(),
   
  });

  public messages: CustomMessages = {};
}
