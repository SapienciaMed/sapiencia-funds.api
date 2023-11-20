import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'BAC_BENEFICIARIOS_A_CONSOLIDAR'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.comment("Tabla que almacena la carga de los beneficiarios que se van a consolidar");

      table
        .increments("BAC_CODIGO")
        .unsigned()
        .primary()
        .comment("Llave primaria");

      table
        .datetime("BAC_FECHA_CARGA")
        .notNullable()
        .comment("Fecha y hora en que se cargaron los datos");

      table
        .date("BAC_FECHA_MARCACION")
        .nullable()
        .comment("Fecha de marcacion");

      table
        .integer("BAC_CODPMA_PROGRAMA")
        .notNullable()
        .unsigned()
        .references("PMA_CODIGO")
        .inTable("PMA_PROGRAMA")
        .comment("Codigo del Programa / Fondo (FK PMA)");

      table
        .integer("BAC_CODPCRT_CORTE")
        .nullable()
        // .unsigned()
        // .references("CRT_CODIGO")
        // .inTable("CRT_CORTES")
        .comment("Codigo del corte (FK CRT)");

      table
        .string("BAC_NUMERO_DOCUMENTO", 15)
        .notNullable()
        .comment("Número del Documento Beneficiario.");

      table
        .integer("BAC_NUMERO_CREDITO")
        .notNullable()
        .comment("Número de crédito");

      table
        .integer("BAC_NUMERO_CONTRATO_FIDUCIARIO")
        .notNullable()
        .comment("Número de contrato fiduciario.");

      table
        .string("BAC_PERIODO_LEGALIZACION", 10)
        .notNullable()
        .comment("Periodo de legalización.");

      table
        .integer("BAC_CANTIDAD_SUSPENCIONES_CONTINUAS")
        .notNullable()
        .comment("Nro suspensiones continuas.");

      table
        .integer("BAC_CANTIDAD_SUSPENCIONES_DISCONTINUAS")
        .notNullable()
        .comment("Nro suspensiones discontinuas.");

      table
        .integer("BAC_CANTIDAD_SUSPENCIONES_ESPECIALES")
        .notNullable()
        .comment("Nro suspensiones especiales.");

      table
        .string("BAC_ESTADO_PROCESO", 10)
        .notNullable()
        .comment("Estado (Listados genericos).");

      table
        .integer("BAC_ESTADO_SAPIENCIA")
        .notNullable()
        .comment("Estado (DB Convocatorias)");

      table
        .integer("BAC_CANTIDAD_SEMETRES_PROYECTADOS")
        .notNullable()
        .comment("Cantidad semestres proyectados.");

      table
        .integer("BAC_CANTIDAD_GIROS")
        .notNullable()
        .comment("Cantidad de giros.");

      table
        .string("BAC_PERIODO_ULTIMO_GIRO", 10)
        .notNullable()
        .comment("Periodo último giro.");

      table
        .integer("BAC_CANTIDAD_RENOVACIONES")
        .notNullable()
        .comment("Cantidad de renovaciones.");

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
