import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'REC_REQUERIMIENTOS_PARA_CONSOLIDACION'

  public async up () {

    this.schema.createTable(this.tableName, (table) => {

      table.comment("Tabla que almacena la gestión de los requerimientos/requisitos del reglamento/programa para el beneficiario");

      table
        .increments("REC_CODIGO")
        .unsigned()
        .primary()
        .comment("Llave primaria");

      table
        .integer("REC_BENEFICIARIO")
        .notNullable()
        .unsigned()
        .references("BAC_CODIGO")
        .inTable("BAC_BENEFICIARIOS_A_CONSOLIDAR")
        .comment("Codigo del Beneficiario (FK BAC)");

      table
        .integer("REC_REGLAMENTO")
        .notNullable()
        .unsigned()
        .references("RCO_CODIGO")
        .inTable("RCO_REGLAMENTOS_CONDONACION")
        .comment("Codigo del Reglamento (FK REC)");

      table
        .integer("REC_REF_PK_REQUERIMIENTO")
        .notNullable()
        .comment("Referencia de PK a la tabla Requisitos/Requerimientos");

      table
        .string("REC_REF_DESCRIPCION_REQUERIMIENTO", 500)
        .notNullable()
        .comment("Referencia descripción a la tabla Requisitos/Requerimientos.");

      table
        .boolean("REC_REF_ACTIVO_REQUERIMIENTO")
        .notNullable()
        .comment("Referencia estado a la tabla Requisitos/Requerimientos.");

      table
        .integer("REC_REF_PORCENTAJE_REQUERIMIENTO")
        .notNullable()
        .comment("Referencia porcentaje a la tabla Requisitos/Requerimientos.");

      table
        .boolean("REC_CUMPLE")
        .notNullable()
        .comment("Cumple con el requisito.");

    })

  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
