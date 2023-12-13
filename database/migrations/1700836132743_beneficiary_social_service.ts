import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "SSB_SERVICIOS_SOCIALES_BENEFICIARIO";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que almacena la carga de los beneficiarios que se van a consolidar"
      );

      table
        .increments("SSB_CODIGO")
        .unsigned()
        .primary()
        .comment("llave primaria");

      table
        .string("SSB_PERIODO_LEGALIZACION", 10)
        .notNullable()
        .comment("Periodo de legalización.");

      table
        .integer("SSB_CODBAC_BENEFICIARIO_CONSOLIDACION")
        .unsigned()
        .references("BAC_CODIGO")
        .inTable("BAC_BENEFICIARIOS_A_CONSOLIDAR")
        .unsigned()
        .notNullable()
        .withKeyName("ssb_bac_fk")
        .comment("Codigo de beneficiarios");
      table
        .integer("SSB_HORAS_COMPROMETIDAS")
        .notNullable()
        .defaultTo(0)
        .comment("Horas de servicio social comprometidas.");
      table
        .integer("SSB_HORAS_PRESTADAS")
        .notNullable()
        .defaultTo(0)
        .comment("Horas de servicio social prestadas.");
      table
        .integer("SSB_HORAS_PENDIENTES")
        .notNullable()
        .defaultTo(0)
        .comment("Horas de servicio social Pendientes.");
      table
        .boolean("SSB_ESTADO")
        .nullable()
        .comment(
          "Estado del servicio social, 1 para aprobado y 0 para rechazado"
        );
      table
        .string("SSB_OBSERVACION", 1000)
        .nullable()
        .comment("Observaciones al proceso de gestion de servicio social.");
      table
        .string("SSB_RUTA_DOCUMENTO_SOPORTE", 2000)
        .notNullable()
        .comment(
          "Rutas de documentos que soportan el servicio social por período."
        );
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

/* 

   table
        .integer("ATA_CODETO_CODIGO ")
        .unsigned().references("ETO_CODIGO ")
        .inTable("ETO_ESTADO")
        .unsigned()
        .notNullable()
        .comment("Valor del estado del acta FK(Tbl estados)");
*/
