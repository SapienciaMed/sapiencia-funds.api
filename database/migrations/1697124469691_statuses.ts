import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ETO_ESTADO'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que almacena los estados principales de las actas"
      );

      table.increments('ETO_CODIGO ')
        .unsigned()
        .primary()
        .comment("llave primaria");

      table
        .string("ETO_NOMBRE", 30)
        .notNullable()
        .comment("Nombre del maestro");
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
