import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'SSB_SERVICIOS_SOCIALES_BENEFICIARIO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que almacena la carga de los beneficiarios que se van a consolidar"
      );

      table.increments('SSB_CODIGO')
        .unsigned()
        .primary()
        .comment("llave primaria");

      table
        .string('SSB_PERIODO_LEGALIZACION',10)
        .notNullable()
        .comment('Periodo de legalización.')

      table
        .integer('SSB_CODBAC_BENEFICIARIO_CONSOLIDACION')
        .notNullable()
        .comment('Codigo de beneficiarios ')
      table
        .integer('SSB_HORAS_PRESTADAS')
        .notNullable()
        .comment('Horas de servicio social prestadas.')
      table
        .string('SSB_RUTA_DOCUMENTO_SOPORTE',2000)
        .notNullable()
        .comment('Rutas de documentos que soportan el servicio social por período.')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
