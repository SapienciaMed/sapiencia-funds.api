import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RemnantValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({  
    remaining: schema.number(),
    averageCost: schema.number(),
    communityFund: schema.number(),
    quotas: schema.number(),
    quotaResource: schema.number(),
    residual: schema.number()   
  });

  public messages: CustomMessages = {};
}
