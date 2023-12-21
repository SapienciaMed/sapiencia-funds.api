import { schema, rules } from "@ioc:Adonis/Core/Validator";
export const filterLegalizedSchema = schema.create({
  announcementId: schema.number([rules.required(), rules.unsigned()]),
});
