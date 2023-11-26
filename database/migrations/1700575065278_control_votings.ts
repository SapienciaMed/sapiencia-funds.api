import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'CFC_CONTROL_FINANCIERO_CONSOLIDADO'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena la configuracion del control financiero de las consolidaciones  por convocatoria")
      table.increments('CFC_CODIGO').primary().unsigned().comment("Llave primaria.")
      table.string("CFC_CONVOCATORIA", 10).notNullable().comment("Numero de la convocatoria")
      table.integer("CFC_CONSOLIDADO_PRESELECIONADOS").comment("Cantidad de Preselecionados consolidado")
      table.decimal("CFC_CONSOLIDADO_RECURSO_DISPONIBLE", 15, 2).comment("Recursos disponibles consolidado")
      table.decimal("CFC_CONSOLIDADO_OTORGADO", 15, 2).comment("valor otorgado del consolidado")
      table.integer("CFC_CONSOLIDADO_LEGALIZADOS").comment("Cantidad de legalizados del consolidado")
      table.decimal("CFC_CONSOLIDADO_RENDIMIENTOS_FINANCIEROS", 15, 2).comment("Rendimientos financieros consolidado")
      // table.decimal("CFV_ESTRATO123_RECURSO_DISPONIBLE", 15, 2).comment("Recursos disponibles de estratos 123")
      // table.decimal("CFV_ESTRATO123_OTORGADO", 15, 2).comment("valor otorgado de estratos 123")
      // table.integer("CFV_ESTRATO123_LEGALIZADOS").comment("cantidad de legalziados de estratos 123")
      // table.decimal("CFV_ESTRATO456_RECURSO_DISPONIBLE", 15, 2).comment("Recursos disponibles de estratos 456")
      // table.decimal("CFV_ESTRATO456_OTORGADO", 15, 2).comment("valor otorgado de estratos 456")
      // table.integer("CFV_ESTRATO456_LEGALIZADOS").comment("cantidad de legalziados de estratos 456")
      table
        .integer("CFC_CODPPR_RECURSO_PRIORIZACION")
        .unsigned()
        .notNullable()
        .comment("Codigo del resultado de votacion (FK PRR)")
      table.foreign("CFC_CODPPR_RECURSO_PRIORIZACION", "FK_CFC_CODPPR").references("PPR_CODIGO").inTable("PRR_PRIORIZACION_RECURSOS")
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
// 