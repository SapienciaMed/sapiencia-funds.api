import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {

  protected tableName = 'TRC_TRANSFERENCIA_CONOCIMIENTO_CONSOLIDADO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.comment("Tabla que contiene la información consolidada de transferencia de conocimiento.");

      table
        .increments("TRC_CODIGO")
        .unsigned()
        .primary()
        .comment("Llave primaria");

      table
        .integer("TRC_BENEFICIARIO")
        .notNullable()
        .unsigned()
        // .references("BAC_CODIGO")
        // .inTable("BAC_BENEFICIARIOS_A_CONSOLIDAR")
        .comment("Codigo del Beneficiario (FK BAC)");

      table
        .integer("TRC_REF_REGLAMENTO")
        .notNullable()
        // .unsigned()
        // .references("RCO_CODIGO")
        // .inTable("RCO_REGLAMENTOS_CONDONACION")
        .comment("Codigo del Reglamento (FK REC)");

      table
        .integer("TRC_HORAS_COMPROMETIDAS")
        .notNullable()
        .comment("Horas comprometidas (Viene desde el reglamento)");

      table
        .integer("TRC_HORAS_REALIZADAS")
        .notNullable()
        .comment("Horas realizadas");

      table
        .integer("TRC_HORAS_PENDIENTES")
        .notNullable()
        .comment("Horas pendientes");

      table
        .integer("TRC_PORCENTAJE_TRANSFERENCIA")
        .notNullable()
        .comment("Porcentaje aplicado transferencia");

      table
        .boolean("TRC_ESTADO")
        .notNullable()
        .comment("Estado de la transferencia, aprobado o rechazado");

      table
        .integer("TRC_ESTADO_PROCESO")
        .nullable()
        .unsigned()
        // .references("EPP_CODIGO")
        // .inTable("EPP_ESTADOS_PROCESOS_PACC")
        .comment("Codigo de Maestro Proceso Pacc (FK EPP)");

      table
        .string("TRC_OBSERVACIONES", 1000)
        .notNullable()
        .comment("Observaciones de rechazo (También indirectamente de aprobación).");

      table
        .string("TRC_RESPONSABLE", 15)
        .notNullable()
        .comment("Usuario responsable que creo el histórico");

      table
        .dateTime("TRC_FECHA_CREO")
        .notNullable()
        .comment("Fecha y hora de creacion del registro");

      //Renombrar claves foraneas porque están muy largos los nombres:
      table
        .foreign("TRC_BENEFICIARIO", "FK_TRC_BENEFI_CON_TRANSFER_CONOC")
        .references("BAC_CODIGO")
        .inTable("BAC_BENEFICIARIOS_A_CONSOLIDAR");

      table
        .foreign("TRC_ESTADO_PROCESO", "FK_TRC_ESTADOPROC_CON_TRANSFER_CONOC")
        .references("EPP_CODIGO")
        .inTable("EPP_ESTADOS_PROCESOS_PACC");

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
