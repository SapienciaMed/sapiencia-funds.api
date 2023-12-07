import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const createAbsorptionPercentageSchema = schema.create({
  announcementId: schema.number([rules.required(), rules.unsigned()]),
  communeFundId: schema.number([rules.required(), rules.unsigned()]),
  sceneryPercentage1: schema.number([rules.required(), rules.unsigned()]),
  sceneryPercentage2: schema.number([rules.required(), rules.unsigned()]),
  sceneryPercentage3: schema.number([rules.required(), rules.unsigned()]),
});
