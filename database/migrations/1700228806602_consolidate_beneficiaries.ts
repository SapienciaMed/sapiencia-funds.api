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
        .unsigned()
        .references("CRT_CODIGO")
        .inTable("CRT_CORTES")
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
        .integer("BAC_GIROS_PROYECTADOS" )
        .nullable()
        .comment("Giros proyectados al Beneficiario.");

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

      table
        .integer("BAC_NRO_CONTRATO_FIDUCIARIO")
        .notNullable()
        .comment("Número de contrato fiduciario.");

      table
        .date("BAC_FECHA_REGRESO_DEPARTAMENTO")
        .notNullable()
        .comment("Fecha regreso departamento.");

      table
        .date("BAC_FECHA_INGRESO")
        .nullable()
        .comment("Fecha de Ingreso Beneficiario.");

        table
        .string("BAC_PERIODO_GRACIA")
        .notNullable()
        .comment("Periodo de Gracia");

        table
        .date("BAC_INICIO_PERIODO_GRACIA")
        .nullable()
        .comment("Fecha de Inicio de Periodo de Gracia");

        table
        .date("BAC_FIN_PERIODO_GRACIA")
        .nullable()
        .comment("Fecha de Fin de Periodo de Gracia");

      //----------------------------------------------------------------------------- 24/11/2023
      //------ //TODO: Revisar (Más adelante no deberíamos tomar los datos de acá)//
      //------ //TODO: Se supone que esto vendrá de otras vistas que proporcione Sapiencia
      //----------------------------------------------------------------------------------------
      table
        .string("BAC_NOMBRES", 150)
        .nullable()
        .comment("Nombre del Beneficiario. (Eliminar para cuando tengamos views)");

      table
        .string("BAC_CORREO", 150)
        .nullable()
        .comment("Correo Electrónico Beneficiario. (Eliminar para cuando tengamos views)");

      table
        .string("BAC_NRO_CONTACTO", 30)
        .nullable()
        .comment("Número Contacto del Beneficiario. (Eliminar para cuando tengamos views)");

      table
        .string("BAC_MOTIVO", 100)
        .nullable()
        .comment("Motivo Sapiencia. (Eliminar para cuanto tengamos views)");

      table
        .string("BAC_CARACTERIZACION", 100)
        .nullable()
        .comment("Caracterización Sapiencia. (Eliminar para cuanto tengamos views)");

      table
        .string("BAC_RESPONSABLE_ACTUAL", 100)
        .nullable()
        .comment("Responsable Actual Sapiencia. (Eliminar para cuanto tengamos views)");

      //-----------------------------------------------------------------------------
      //-----------------------------------------------------------------------------
      //-----------------------------------------------------------------------------

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
