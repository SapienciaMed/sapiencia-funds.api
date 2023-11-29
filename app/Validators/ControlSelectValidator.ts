import { schema } from "@ioc:Adonis/Core/Validator";
export const controlSelectSchema = schema.create({
    noProject: schema.number.optional(),
    validity: schema.string.optional(),
    idControlSelect: schema.number.optional(),
    idConvocatoria: schema.number.optional(),
    id_comuna: schema.number.optional(),
    perPage: schema.number.optional(),
    page: schema.number.optional(),
})