import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CrearTablaRcoReglamentosCondonacion extends BaseSchema {
  protected tableName = "RCO_REGLAMENTOS_CONDONACION";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("RCO_CODIGO").primary();
      table.string("RCO_CODPMA_PROGRAMA", 60).notNullable();
      table.string("RCO_PERIODO_INICIAL", 60).notNullable();
      table.boolean("RCO_PERIODO_ABIERTO").notNullable();
      table.string("RCO_PERIODO_FINAL", 60).nullable();
      table.integer("RCO_PORCENTAJE_TEORICO").nullable();
      table.boolean("RCO_APLICA_SERVICIO_SOCIAL").notNullable();
      table.integer("RCO_SERVICO_SOCIAL_PORCENTAJE").nullable();
      table.integer("RCO_SERVICIO_SOCIAL_HORAS").nullable();
      table.boolean("RCO_APLICA_TRANSFERENCIA_CONOCIMIENTO").notNullable();
      table.integer("RCO_TRANSFERENCIA_CONOCIMIENTO_PORCENTAJE").nullable();
      table.integer("RCO_TRANSFERENCIA_CONOCIMIENTO_HORAS").nullable();
      table.boolean("RCO_APLICA_PERIODO_GRACIA").notNullable();
      table.integer("RCO_PERIODO_GRACIA_MESES").nullable();
      table.string("RCO_PERIODO_GRACIA_APLICACION", 60).nullable();
      table.boolean("RCO_APLICA_SUSPENCION_CONTINUA").notNullable();
      table.integer("RCO_SUSPENCION_CONTINUA_CANTIDAD").nullable();
      table.boolean("RCO_APLICA_SUSPENCION_DISCONTINUA").notNullable();
      table.integer("RCO_SUSPENCION_DISCONTINUA_CANTIDAD").nullable();
      table.boolean("RCO_APLICA_SUSPENCION_ESPECIAL").notNullable();
      table.integer("RCO_SUSPENCION_ESPECIAL_CANTIDAD").nullable();
      table.boolean("RCO_APLICA_PRORROGA").notNullable();
      table.integer("RCO_PRORROGA_CANTIDAD").nullable();
      table.boolean("RCO_APLICA_CODONACION_RENDIMEINTO_PERIODO").notNullable();
      table.text("RCO_RENDIMIENTO_PERIODO", "longtext");
      table
        .boolean("RCO_APLICA_CODONACION_RENDIMEINTO_ACUMULADO")
        .notNullable();
      table.text("RCO_RENDIMEINTO_ACUMULADO", "longtext");
      table.string("RCO_USUARIO_MODIFICO", 15).nullable();
      table.string("RCO_FECHA_MODIFICO", 50).nullable();
      table.string("RCO_USUARIO_CREO", 15).notNullable();
      table.string("RCO_FECHA_CREO", 50).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
