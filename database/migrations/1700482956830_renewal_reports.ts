import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'RRP_RENEWAL_REPORT'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena los reportes de renovación de control financiero Fondos");

      table
        .increments("RRP_CODIGO")
        .primary()
        .comment("llave primaria")
        .unique();
      table
        .string("RRP_PERIODO", 150)
        .notNullable()
        .comment("periodo del reporte de renovación");
      table
        .string("RRP_FONDO", 150)
        .notNullable()
        .comment("Fondo del reporte de renovación");
      table
        .integer("RRP_N_Habilitados")
        .notNullable()
        .comment("Número de habilitados del reporte de renovación");
      table
        .integer("RRP_N_Renovados")
        .notNullable()
        .comment("Número de renovados del reporte de renovación");
      table
        .string("RRP_PORCENTAJE",20)
        .notNullable()
        .comment("Porcentaje reporte de renovación");

      table
        .string("RRP_USUARIO_MODIFICO", 15)
        .comment(
          "Numero del documento del ultimo usuario que hizo una modificacion"
        );
      table
        .dateTime("RRP_FECHA_MODIFICO")
        .comment("Fecha y hora de la ultima modificacion");
      table
        .string("RRP_USUARIO_CREO", 15)
        .notNullable()
        .comment("Numero del documento del usuario que creo el registro");
      table
        .dateTime("RRP_FECHA_CREO")
        .notNullable()
        .comment("Fecha y hora de creacion del registro");
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
