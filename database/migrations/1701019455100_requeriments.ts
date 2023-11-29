import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "RRE_REQUISITOS_REGLAMENTO";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("RRE_CODIGO").primary();
      table.integer("RRE_CODRCO_REGLAMENTO").notNullable();
      table.boolean("RRE_ACTIVO").notNullable();
      table.integer("RRE_PORCENTAJE").nullable();
      table.string("RRE_DESCRIPCION", 500).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
