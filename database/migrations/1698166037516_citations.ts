import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'CTA_CITACION_ACTA'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que almacena los estados principales de las actas"
      );
      table.increments('CTA_CODIGO ')
        .unsigned()
        .primary()
        .comment("llave primaria");
      //

      table
        .date("CTA_FECHA_CITA")
        .notNullable()
        .comment("Fecha de la cita");

      table
        .time("CTA_HORA")
        .notNullable()
        .comment("Hora de la cita");

      table
        .string("CTA_USER", 50)
        .notNullable()
        .comment("Nombre del usuario de la cita");

      table
        .bigint("CTA_ESTADO")
        .notNullable()
        .comment("Estado de la citación");

      table
        .date("CTA_FECHA_APROBADO")
        .nullable()
        .comment("Fecha en que se aprueba");

      table
        .string("CTA_CORREO_USER",25)
        .notNullable()
        .comment("Fecha en que se aprueba");

      table
        .integer("CTA_CODATA_CODIGO")
        .unsigned().references("ATA_CODIGO ")
        .inTable("ATA_ACTA")
        .unsigned()
        .notNullable()
        .comment("Acta a la que está asociada la cita (FK referencia de la tbl ATA_ACTA )");
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
