import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'CFL_CONTROL_FINANCIERO_LEGALIZATION'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena la configuracion del control financiero de las legalizaciones  por convocatoria")
      table.increments('CFL_CODIGO').primary().unsigned().comment("Llave primaria.")
      table.string('CFL_PROGRAMA', 100).notNullable().comment("Programa de la legalizacion.")
      table.integer("CFL_CONVOCATORIA").notNullable().comment("Convocatoria de la legalizacion")
      table.decimal("CFl_RECURSO_DISPONIBLE", 15, 2).comment("Recursos disponibles legalizacion")
      table.integer("CFl_PRESELECIONADOS", 15).comment("Preselecionados legalizacion")
      table.decimal("CFl_OTORGADO", 15, 2).comment("Otorgado legalizacion")
      table.integer("CFl_LEGALIZADOS", 15).comment("Legalizados legalizacion")
      table.integer("CFC_CUPOS").comment("Cantidad cupos legalizacion")
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
