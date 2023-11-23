import { schema } from "@ioc:Adonis/Core/Validator";
export const controlSelectSchema = schema.create({
    noProject: schema.number(),
    validity: schema.string(),
    idControlSelect: schema.number(),
    valueConvocatoria: schema.string()

})