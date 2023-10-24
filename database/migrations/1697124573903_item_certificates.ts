import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'IAA_ITEM_ACTA	'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {

      table.comment(
        "Tabla que almacena los item asociados al acta	"
      );

      table.increments('IAA_CODIGO')
        .unsigned()
        .primary()
        .comment("llave primaria");

      table
        .string("IAA_CODFONDO", 20)
        .notNullable()
        .comment("Codigo fondo listado generico (Maestros)");

      table
        .string("IAA_CODLINEA", 20)
        .notNullable()
        .comment("Codigo linea listado generico (Maestros)");

      table
        .string("IAA_CODCONVOCATORIA", 20)
        .notNullable()
        .comment("Codigo convocaotoria listado generico (Maestros)");

      table
        .string("IAA_CODCONCEPTO", 20)
        .notNullable()
        .comment("Codigo concepto listado generico (Maestros)");

      table
        .bigint("IAA_COSTO_PROMEDIO")
        .notNullable()
        .comment("Valor del costo promedio");

      table
        .json("IAA_PERIODO_1_2")
        .notNullable()
        .comment("Json con los valores de los periodos");

      table
        .bigint("IAA_SUBTOTAL_VIGENCIA")
        .notNullable()
        .comment("Valor del subtotal de la vigencia");

      table
        .bigint("IAA_COSTOS_GASTOS_OPERACION")
        .notNullable()
        .comment("Valor de datos de operación");

      table
        .bigint("IAA_NETO")
        .notNullable()
        .comment("Valor  neto");

      table
        .bigint("IAA_COMISION_OPERADOR_FINANCIERO")
        .notNullable()
        .comment("Valor de la comisión del operador financiero");

      table
        .bigint("IAA_RECURSOS_CREDITO")
        .notNullable()
        .comment("Valor de los recursos para credito para crédito");

      table
        .integer("IAA_CODPMA_PROGRAMA")
        .unsigned().references("PMA_CODIGO ")
        .inTable("PMA_PROGRAMA")
        .unsigned()
        .notNullable()
        .comment("Valor del estado del acta FK(Tbl estados)");

      table
        .integer("IAA_CODATA_ACTA")
        .unsigned().references("ATA_CODIGO ")
        .inTable("ATA_ACTA")
        .unsigned()
        .notNullable()
        .comment("Valor del estado del acta FK(Tbl estados)");
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

