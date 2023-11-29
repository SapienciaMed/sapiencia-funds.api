import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'CFE_CONTROL_FINANCIERO_ESTRATOS123'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('CFE_CODIGO').primary().unsigned().comment("Llave primaria.")
      table.string("CFE_CONVOCATORIA", 10).notNullable().comment("Numero de la convocatoria")
      table.string("CFE_VIGENCIA", 10).comment("Vigencia del estrato 123")
      table.decimal("CFE_RECURSO_DISPONIBLE", 15, 2).comment("Recursos disponibles del estrato 123")
      table.decimal("CFE_OTORGADO", 15, 2).comment("valor otorgado del estrato 123")
      table.integer("CFE_LEGALIZADOS").comment("Cantidad de legalizados del estrato 123")
      table.integer("CFE_CODPPR_RECURSO_PRIORIZACION").unsigned() .notNullable().comment("Codigo del resultado de votacion (FK PRR)")
      table.foreign("CFE_CODPPR_RECURSO_PRIORIZACION", "FK_CFE_CODPPR").references("PRR_CODIGO").inTable("PRR_PRIORIZACION_RECURSOS")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
