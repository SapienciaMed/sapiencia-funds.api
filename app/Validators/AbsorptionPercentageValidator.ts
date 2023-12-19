import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const createAbsorptionPercentageSchema = schema.create({
  announcementId: schema.number([rules.required(), rules.unsigned()]),
  communeFundId: schema.number([rules.required(), rules.unsigned()]),
  sceneryPercentage1: schema.number([rules.required(), rules.unsigned()]),
  sceneryPercentage2: schema.number([rules.required(), rules.unsigned()]),
  sceneryPercentage3: schema.number([rules.required(), rules.unsigned()]),
});
export const filterAbsorptionPercentageSchema = schema.create({
  announcementId: schema.number([rules.required(), rules.unsigned()]),
  page: schema.number([rules.required(), rules.unsigned()]),
  perPage: schema.number([rules.required(), rules.unsigned()]),
});
export const updateAbsorptionPercentageSchema = schema.create({
  announcementId: schema.number.optional([rules.unsigned()]),
  communeFundId: schema.number.optional([
    rules.requiredIfExistsAny([
      "sceneryPercentage1",
      "sceneryPercentage2",
      "sceneryPercentage3",
    ]),
    rules.unsigned(),
  ]),
  sceneryPercentage1: schema.number.optional([
    rules.requiredIfExists("communeFundId"),
    rules.unsigned(),
  ]),
  sceneryPercentage2: schema.number.optional([
    rules.requiredIfExists("communeFundId"),
    rules.unsigned(),
  ]),
  sceneryPercentage3: schema.number.optional([
    rules.requiredIfExists("communeFundId"),
    rules.unsigned(),
  ]),
});
