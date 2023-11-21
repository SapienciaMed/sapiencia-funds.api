import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "PRR_PRIORIZACION_RECURSOS";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que alamcena los recursos de priorizacion");
      table
        .increments("PRR_CODIGO")
        .unsigned()
        .primary()
        .comment("llave primaria");

      table
        .integer("PRR_CODPMA_PROGRAMA")
        .unsigned()
        .references("PMA_CODIGO")
        .inTable("PMA_PROGRAMA")
        .unsigned()
        .notNullable()
        .comment("Código del programa (FK PMA)");

      table
        .integer("PRR_NUMERO_PROYECTO")
        .notNullable()
        .comment("Numero del proyecto");

      table.smallint("PRR_VIGENCIA").notNullable().comment("Año de Vigencia");

      table
        .smallint("PRR_COMUNA")
        .notNullable()
        .comment("Codigo de la comuna (Listados genericos)");

      table.decimal("PRR_ESTRATO_123", 15, 2).notNullable().comment("");
      table.decimal("PRR_ESTRATO_456", 15, 2).notNullable().comment("");
      table.decimal("PRR_VALOR", 15, 2).notNullable().comment("");
      table.integer("PRR_CUPOS").notNullable().comment("");
      table.decimal("PRR_COSTO_PROMEDIO", 15, 2).notNullable().comment("");
      table.decimal("PRR_TASA_GENERAL", 15, 2).notNullable().comment("");
      table.decimal("PRR_VALOR_BRUTO", 15, 2).notNullable().comment("");
      table.decimal("PRR_COSTOS_GASTOS_DE_OPERACION", 15, 2).notNullable().comment("");
      table.decimal("PRR_RENDIMIENTOS_FINANCIEROS", 15, 2).notNullable().comment("");
      table.decimal("PRR_RECURSO_DEL_BALANCE", 15, 2).notNullable().comment("");
      table.decimal("PRR_COMISION_OPERADOR_FINANCIERO_ACTA", 15, 2).notNullable().comment("");
      table.decimal("PRR_COMISION_OPERADOR_FINANCIERO_BALANCE", 15, 2).notNullable().comment("");
      table.decimal("PRR_COMISION_OPERADOR_FINANCIERO", 15, 2).notNullable().comment("");
      table.decimal("PRR_RECURSO_PARA_CREDITO", 15, 2).notNullable().comment("");


      table
        .string("PRR_USUARIO_MODIFICO", 15)
        .comment(
          "Numero del documento del ultimo usuario que hizo una modificacion"
        );
      table
        .dateTime("PRR_FECHA_MODIFICO")
        .comment("Fecha y hora de la ultima modificacion");
      table
        .string("PRR_USUARIO_CREO", 15)
        .notNullable()
        .comment("Numero del documento del usuario que creo el registro");
      table
        .dateTime("PRR_FECHA_CREO")
        .notNullable()
        .comment("Fecha y hora de creacion del registro");


    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
