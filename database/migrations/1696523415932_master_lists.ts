import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'LMA_LISTADOS_MAESTROS'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que contiene los tipos de listados maestros utilizados"
      );

      table.increments('LMA_CODIGO')
        .unsigned()
        .primary()
        .comment("llave primaria");

      table
        .integer("LMA_CODTLM")
        .unsigned().references("TLM_CODIGO")
        .inTable("TLM_TIPO_LISTADOS_MAESTROS")
        .unsigned()
        .notNullable()
        .comment("Codigo del tipo de maestro (FK TLM)");

      table
        .string("LMA_NOMBRE", 100)
        .notNullable()
        .comment("Nombre del maestro");

      table
        .string("LMA_DESCRIPCION", 500)
        .nullable()
        .comment("Descripcion");
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
