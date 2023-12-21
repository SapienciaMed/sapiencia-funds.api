import { schema, rules } from "@ioc:Adonis/Core/Validator";
export const filterLegalizedSchema = schema.create({
  announcementId: schema.number([rules.required(), rules.unsigned()]),
});
export const updateLegalizedSchema = schema.create({
  announcementId: schema.number([rules.required(), rules.unsigned()]),
  communeFundId: schema.number([rules.required(), rules.unsigned()]),
  resource: schema.number([rules.required(), rules.unsigned()]),
  fiduciaryId: schema.number([rules.required(), rules.unsigned()]),
  order: schema.number([rules.required(), rules.unsigned()]),
});
