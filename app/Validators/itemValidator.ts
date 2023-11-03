import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ItemValidators {
  constructor(protected ctx: HttpContextContract) {}
 
  public schema = schema.create({    
    aimStraight: schema.string(),
    productCatalogueDnp: schema.string(),
    codProductgueDnp: schema.string(),
    codPmaProgram: schema.number(),
    codMtaTeacherActivity: schema.number(),
    amount: schema.string(),
    costTotal: schema.string(),
    percentage123: schema.string(),
    percentage456: schema.string(),  
    codRtVotingResult: schema.string(),      
   
  });

  
  public messages: CustomMessages = {};
}




