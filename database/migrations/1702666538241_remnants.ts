import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'RMT_REMANETES'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {

      table.comment(
        "Tabla que contiene los calculos de los remanentes"
      );

      table.increments('RMT_CODIGO')
        .unsigned()
        .primary()
        .comment("llave primaria");

      table
        .string("RMT_CONVOCATORIA", 10)
        .notNullable()
        .comment("Numero de la convocatoria");

      table
        .integer("RMT_FIDUCIA")
        .notNullable()
        .comment("Fiducia");

      table
        .integer("RMT_FONDO_COMUNA")
        .notNullable()
        .comment("Codigo del Fondo comuna (db sapiencia)");

      table
        .decimal("RMT_RESTANTE", 15, 2)
        .notNullable()
        .comment("valor restante");

      table
        .decimal("RMT_COSTO_PROMEDIO", 15, 2)
        .notNullable()
        .comment("costo promedio");

      table
        .integer("RMT_CUPOS")
        .notNullable()
        .comment("numero de cupos");

      table
        .decimal("RMT_RECURSO_CUPOS", 15, 2)
        .notNullable()
        .comment("valor de recurso con cupos");

      table
        .decimal("RMT_RECIDUAL", 15, 2)
        .notNullable()
        .comment("valor recidual");

      table
        .string("RMT_USUARIO_MODIFICO", 15)
        .nullable()
        .comment("valor recidual");

      table
        .dateTime("RMT_FECHA_MODIFICO")
        .nullable()
        .comment("Fecha y hora de la ultima modificacion");

      table
        .string("RMT_USUARIO_CREO", 15)
        .notNullable()
        .comment("Numero del documento del usuario que creo el registro");

      table
        .dateTime("RMT_FECHA_CREO")
        .notNullable()
        .comment("Fecha y hora de creacion del registro");

      table.integer("RMT_CODPMA_PROGRAMA")
        .unsigned().references("PMA_CODIGO")
        .inTable("PMA_PROGRAMA") // Cambiado a nombre de tabla correcto
        .withKeyName('rmt_remanetes_fk')
        .unsigned()
        .notNullable()
        .comment("Codigo Programa (FK PMA)");

    })

  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
