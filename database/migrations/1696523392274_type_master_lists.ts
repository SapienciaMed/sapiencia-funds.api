import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'TLM_TIPO_LISTADOS_MAESTROS'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que contiene los tipos de listados maestros utilizados"
      );

      table
        .increments("TLM_CODIGO")
        .unsigned()
        .primary()
        .comment("llave primaria");
      table
        .string("TLM_NOMBRE", 50)
        .notNullable()
        .comment("Nombre del maestro");

    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
