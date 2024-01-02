import { schema, rules } from "@ioc:Adonis/Core/Validator";

export const prioritizationSummaryFiltersSchema = schema.create({
  numberProject: schema.number([rules.required(), rules.unsigned()]),
  communeNeighborhood: schema
    .array([rules.required()])
    .members(schema.number()),
  validity: schema.string([rules.required()]),
  page: schema.number([rules.required(), rules.unsigned()]),
  perPage: schema.number([rules.required(), rules.unsigned()]),
});
