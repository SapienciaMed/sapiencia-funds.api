import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {

  protected tableName = 'EPP_ESTADOS_PROCESOS_PACC'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.comment(
        "Tabla que contiene los estados de los procesos del PACC"
      );

      table
        .increments("EPP_CODIGO")
        .unsigned()
        .primary()
        .comment("Llave primaria");

      table
        .string("EPP_DESCRIPCION", 100)
        .notNullable()
        .comment("Descripción del estado");

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
