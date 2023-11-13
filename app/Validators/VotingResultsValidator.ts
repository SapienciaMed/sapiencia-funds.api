import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class VotingResultsValidator {
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
    communeNeighborhood: schema.number(),
    numberProject: schema.number(),
    validity: schema.string(),
    ideaProject: schema.string(),
    items: schema.array().members(
      schema.object().members({
        aimStraight: schema.string(),
        productCatalogueDnp: schema.string(),
        codProductgueDnp: schema.string(),
        codPmaProgram: schema.number(),
        codMtaTeacherActivity: schema.number(),
        amount: schema.number(),
        costTotal: schema.number(),
        percentage123: schema.number(),
        percentage456: schema.number(),        
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
