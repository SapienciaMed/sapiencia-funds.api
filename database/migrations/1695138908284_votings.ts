import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'RTV_RESULTADO_VOTACION'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.comment(
        "Tabla que almacena los resultados de la votación en gestión territorial"
      )
      
      table
        .increments("RTV_CODIGO")
        .unsigned()
        .primary()
        .comment("llave primaria").notNullable();
      
      table.integer("RTV_COMUNA_BARRIO").notNullable().comment(" ");
      table.integer("RTV_NUMERO_PROYECTO").notNullable().comment(" ");
      table.string("RTV_VIGENCIA", 10).notNullable().comment(" ");
      table.string("RTV_IDEA_PROYECTO", 500).notNullable().comment(" ");

      table
        .integer("RTV_CODIGO")
        .unsigned().references("ITM_CODRTV_RESULTADO_VOTACION")
        .inTable("ITM_ITEM")
        .unsigned()
        .notNullable()
        .comment("Código del resultado de la votación asociado al item (FK llave foranea tbl resultado votación)");
      
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
