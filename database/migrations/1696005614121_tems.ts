import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ITM_ITEM'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      
      table.comment(
        "Tabla que almacena los items de los resultados de la votación en gestión territorial"
      )

      table
        .increments("ITM_CODIGO")
        .unsigned()
        .primary()
        .comment("llave primaria").notNullable();
      
      table.string("ITM_OBJETIVO_DIRECTO", 500).notNullable().comment(" ");
      table.string("ITM_PRODUCTO_CATALOGO_DNP", 20).notNullable().comment(" ");
      table.string("ITM_CODIGO_PRODUCTO_DNP", 20).notNullable().comment(" ");
      table.integer("ITM_CODPMA_PROGRAMA").notNullable().comment(" ");
      table.integer("ITM_CANTIDAD").notNullable().comment(" ");
      table.integer("ITM_COSTO_TOTAL").notNullable().comment(" ");
      table.integer("ITM_PORCENTAJE_123").notNullable().comment(" ");
      table.integer("ITM_PORCENTAJE_456").notNullable().comment(" ");
      // table.integer("ITM_CODRTV_RESULTADO_VOTACION").notNullable().comment(" ");
      table
        .integer("ITM_CODMTA_MAESTRO_ACTIVIDAD")
        .unsigned().references("MTA_CODIGO")
        .inTable("MTA_MAESTRO_ACTIVIDAD")
        .unsigned()
        .notNullable()
        .comment("Código de la actividad asociada al item FK(llave foranea de la actividad asociada al item)");
      
      
      
      table
        .integer("ITM_CODRTV_RESULTADO_VOTACION")
        .unsigned().references("RTV_CODIGO")
        .inTable("RTV_RESULTADO_VOTACION")
        .unsigned()
        .notNullable()
        .comment("Código del resultado de la votación asociado al item (FK llave foranea tbl resultado votación)");
      
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
