import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PMA_PROGRAMA'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena los programas de la gestión territorial");

      table.increments("PMA_CODIGO").primary();
      table
        .string("PMA_NOMBRE", 20)
        .notNullable()
        .comment("Nombre del programa");

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
