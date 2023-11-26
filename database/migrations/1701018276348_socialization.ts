import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "SIE_SOCIALIZACION_INFORMES_EJECUCION";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("SIE_CODIGO").primary();
      table.integer("SIE_NUMERO_PROYECTO").notNullable();
      table.string("SIE_CODIGO_COMUNA", 10).notNullable();
      table.string("SIE_FECHA", 30).notNullable();
      table.integer("SIE_VIGENCIA").notNullable();
      table.string("SIE_GRUPO_VALOR", 50).notNullable();
      table.decimal("SIE_RENDIMIENTO_FINANCIERO", 15, 2).notNullable();
      table.decimal("SIE_RECAUDOS_CARTERA", 15, 2).notNullable();
      table.string("SIE_OBSERVACIONES", 500).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
