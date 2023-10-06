import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'MTA_MAESTRO_ACTIVIDAD'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena las actividades de la gestión territorial");
      
      table
        .increments("MTA_CODIGO")
        .primary()
        .comment("llave primaria")
        .unique();
      table
        .string("MTA_NOMBRE", 20)
        .notNullable()
        .comment("Nombre de la actividad.")
        .unique();
      table
        .integer("MTA_VALOR ")
        .notNullable()
        .comment("Valor de la actividad");


      
      table
        .integer("MTA_CODPMA_PROGRAMA")
        .unsigned().references("PMA_CODIGO")
        .inTable("PMA_PROGRAMA")
        .unsigned()
        .notNullable()
        .comment("Código del programa FK(llave foránea tbl programa)");

      table
        .string("MTA_DESCRIPCION", 500)
        .nullable()
        .comment("Descripción de la actividad.");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
