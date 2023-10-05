import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'CIN_CARGA_INFORMACIÓN'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena la carga de información"
      );
      table
      .increments("CIN_CODIGO")
      .primary()
      .comment("llave primaria");
      table
      .string("CIN_COMUNA_BARRIO", 30)
      .notNullable()
      .comment("lista generica cargada por parámetros");
      table
      .string("CIN_VIGENCIA", 10)
      .notNullable()
      .comment("lista generica de años cargada por parámetros");
      table
      .string("CIN_INFORMACION", 30)
      .notNullable()
      .comment("lista generica de información");
      table
      .string("CIN_NOMBRE_ARCHIVO", 20)
      .notNullable()
      .comment("Nombre del archivo asociado a la información");
      table
      .dateTime("CIN_FECHA_HORA_CARGA")
      .notNullable()
      .comment("Fecha y hora de la carga del archivo asociado a la información")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
