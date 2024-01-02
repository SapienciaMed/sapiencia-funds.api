import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ItemValidators {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    aimStraight: schema.string(),
    productCatalogueDnp: schema.string(),
    codProductgueDnp: schema.string(),
    codPmaProgram: schema.number(),
    codMtaTeacherActivity: schema.number(),
    amount: schema.number(),
    costTotal: schema.number(),
    percentage123: schema.number(),
    percentage456: schema.number(),
    codRtVotingResult: schema.number(),
  });

  public messages: CustomMessages = {};
}

export const filterVotingSchema = schema.create({
  communeNeighborhood: schema
    .array([rules.required()])
    .members(schema.number()),
  numberProject: schema.number.optional([rules.unsigned()]),
  validity: schema.string([rules.required()]),
  ideaProject: schema.string.optional(),
  page: schema.number.optional([rules.unsigned()]),
  perPage: schema.number.optional([rules.unsigned()]),
});

export const filterTotalVotingSchema = schema.create({
  communeNeighborhood: schema
    .array([rules.required()])
    .members(schema.number()),
  numberProject: schema.number.optional([rules.unsigned()]),
  validity: schema.string([rules.required()]),
  ideaProject: schema.string.optional(),
});
