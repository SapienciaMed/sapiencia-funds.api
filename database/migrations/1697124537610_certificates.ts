import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ATA_ACTA'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que contiene los tipos de listados maestros utilizados"
      );

      table.increments('ATA_CODIGO')
        .unsigned()
        .primary()
        .comment("llave primaria");

      table
        .integer('LAST_ATA_CODIGO')
        .comment('Llave primaria anterior')
      table
        .integer("ATA_NUMERO_PROYECTO")
        .notNullable()
        .comment("Número del proyecto");

      table
        .integer("ATA_PERIODO_VIGENCIA")
        .notNullable()
        .comment("Valor del periodo de vigencia");

      table
        .string("ATA_CONVOCATORIA_INICIAL", 10)
        .notNullable()
        .comment("Convocatoria inicial del acta");

      table
        .integer("ATA_SALARIO_MINIMO")
        .notNullable()
        .comment("Valor del salio minimo vigente");

      table
        .bigint("ATA_COSTOSGASTOS_OPERACION_LOGISTICA")
        .notNullable()
        .comment("Porcentaje costos y gastos operación logistica");

      table
        .bigint("ATA_COMISION_OPERADOR_FINANCIERO")
        .notNullable()
        .comment("Valor de comisión operador financiero");

      table
        .bigint("ATA_OPERACION_FINANCIERA_MB")
        .notNullable()
        .comment("Valor de operación financiera");

      table
        .date("ATA_FECHA_CREACION")
        .notNullable()
        .comment("Fecha de creacion");

      table
        .integer("ATA_CODETO_CODIGO ")
        .unsigned().references("ETO_CODIGO ")
        .inTable("ETO_ESTADO")
        .unsigned()
        .notNullable()
        .comment("Valor del estado del acta FK(Tbl estados)");
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
