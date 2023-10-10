import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'MTA_MAESTRO_ACTIVIDAD'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena las actividades de la gestión territorial");
      
      table
        .increments("MTA_CODIGO")
        .primary()
        .comment("llave primaria");

      table
        .string("MTA_NOMBRE", 20)
        .notNullable()
        .comment("Nombre de la actividad.");

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

        table
        .string("MTA_USUARIO_MODIFICO", 15)
        .comment(
          "Numero del documento del ultimo usuario que hizo una modificacion"
        );
      table
        .dateTime("MTA_FECHA_MODIFICO")
        .comment("Fecha y hora de la ultima modificacion");
      table
        .string("MTA_USUARIO_CREO", 15)
        .notNullable()
        .comment("Numero del documento del usuario que creo el registro");
      table
        .dateTime("MTA_FECHA_CREO")
        .notNullable()
        .comment("Fecha y hora de creacion del registro");

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
