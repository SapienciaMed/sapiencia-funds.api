import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ActaValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({    
    numberProject: schema.number(),
    periodVigency: schema.number(),
    announcementInitial: schema.number(),
    salaryMin: schema.number(),
    costsExpenses: schema.number(),
    OperatorCommission: schema.number(),
    financialOperation: schema.number(),
    creationDate: schema.string(),
    idStatus: schema.number(),    
    items: schema.array().members(
      schema.object().members({     
        found: schema.string(),
        line: schema.string(),
        announcement: schema.string(),
        concept: schema.string(),
        costOperation: schema.string(),
        periods: schema.string(),
        subtotalVigency: schema.number(),
        costBillsOperation: schema.number(),
        net: schema.number(),
        financialOperatorCommission: schema.number(),
        resourcesCredit: schema.number(),
        program: schema.number(),
        idActa: schema.number(),        
      })
    )
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {};
}
