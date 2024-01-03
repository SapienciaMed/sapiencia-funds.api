import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {

  protected tableName = 'GIR_GIROS_FUENTE1'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.comment("Tabla que almacena la carga de información de GIROS de la PRIMERA fuente de información");

      table
        .increments("GIR_CODIGO")
        .unsigned()
        .primary()
        .comment("Llave primaria");

      table
        .integer("GIR_BENEFICIARIO")
        .notNullable()
        .unsigned()
        .references("BAC_CODIGO")
        .inTable("BAC_BENEFICIARIOS_A_CONSOLIDAR")
        .comment("Codigo del Beneficiario (FK TABLA BAC)");

      table
        .string("GIR_ID_USUARIO", 20)
        .notNullable()
        .comment("Id del usuario.");

      table
        .string("GIR_ID_CREDITO", 50)
        .notNullable()
        .comment("Id del crédito.");

      table
        .integer("GIR_NUMERO_CONTRATO_FIDUCIARIO", 10)
        .notNullable()
        .comment("Número de contrato fiduciario.");

      table
        .string("GIR_PERIODO_LEGALIZACION", 10)
        .notNullable()
        .comment("Periodo de legalización.");

      table
        .string("GIR_DOCUMENTO", 30)
        .notNullable()
        .comment("Documento del Beneficiario.");

      table
        .integer("GIR_ID_FONDO", 30)
        .notNullable()
        .comment("Id del Fondo.");

      table
        .string("GIR_NOMBRE_FONDO", 100)
        .notNullable()
        .comment("Nombre del Fondo.");

      table
        .string("GIR_MODALIDAD", 60)
        .notNullable()
        .comment("Modalidad.");

      table
        .integer("GIR_PERIODOS")
        .notNullable()
        .comment("Periodos.");

      table
        .integer("GIR_SEMESTRES_PROYECTADOS")
        .notNullable()
        .comment("Semestres Proyectados.");

      table
        .decimal("GIR_VALOR_PROYECTADO_MATRICULA", 15, 2)
        .notNullable()
        .comment("Valor proyectado de matricula.");

      table
        .decimal("GIR_VALOR_PROYECTADO_SOSTENIMIENTO", 15, 2)
        .notNullable()
        .comment("Valor proyectado de sostenimiento.");

      table
        .integer("GIR_SEMESTRE_RENOVADO")
        .notNullable()
        .comment("Número de semestre renovado.");

      table
        .decimal("GIR_VALOR_RENOVADO_MATRICULA", 15, 2)
        .notNullable()
        .comment("Valor renovado de matricula.");

      table
        .decimal("GIR_VALOR_RENOVADO_SOSTENIMIENTO", 15, 2)
        .notNullable()
        .comment("Valor renovado de sostenimiento.");

      table
        .decimal("GIR_VALOR_GIRADO_MATRICULA", 15, 2)
        .notNullable()
        .comment("Valor girado de matricula.");

      table
        .decimal("GIR_VALOR_GIRADO_SOSTENIMIENTO", 15, 2)
        .notNullable()
        .comment("Valor girado de sostenimiento.");

    })

  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
