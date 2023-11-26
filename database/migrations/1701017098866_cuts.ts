import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "CRT_CORTES";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("CRT_CODIGO").primary();
      table.string("CRT_NOMBRE", 50).notNullable();
      table.date("CRT_DESDE").notNullable();
      table.date("CRT_HASTA").notNullable();
      table.string("CRT_USUARIO_MODIFICO", 15).nullable();
      table.dateTime("CRT_FECHA_MODIFICO").nullable();
      table.string("CRT_USUARIO_CREO", 15).nullable();
      table.dateTime("CRT_FECHA_CREO").nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
