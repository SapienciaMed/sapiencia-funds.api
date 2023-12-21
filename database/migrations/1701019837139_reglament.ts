import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CrearTablaRcoReglamentosCondonacion extends BaseSchema {
  protected tableName = "RCO_REGLAMENTOS_CONDONACION";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {

      table.comment("Tabla que almacena los reglamentos de condonacion de los programas.");

      table
        .increments("RCO_CODIGO")
        .primary()
        .comment("Llave primaria.");

      table
        .integer("RCO_CODPMA_PROGRAMA")
        .notNullable()
        .unsigned()
        .references("PMA_CODIGO")
        .inTable("PMA_PROGRAMA")
        .comment("Codigo del Programa (FK TABLA PMA)");

      table
        .string("RCO_PERIODO_INICIAL", 60)
        .notNullable()
        .comment("Periodo inicial (DB Convocatorias)");

      table
        .boolean("RCO_PERIODO_ABIERTO")
        .notNullable()
        .comment("Indicador de que si para este reglamento esta abierto o no los periodos");

      table
        .string("RCO_PERIODO_FINAL", 60)
        .nullable()
        .comment("Periodo Final  (DB Convocatorias)");

      table
        .boolean("RCO_APLICA_PORCENTAJE_TEORICO")
        .nullable()
        .comment("Indicador de que si aplica porcentaje de pago teórico semestral");

      table
        .decimal("RCO_PORCENTAJE_TEORICO", 5,2)
        .nullable()
        .comment("Porcentaje de pago teorico semestral");

      table
        .boolean("RCO_APLICA_PORCENTAJE_RENDIMIENTO_ACADEMICO")
        .nullable()
        .comment("Aplica porcentaje rendimiento académico");

      table
        .decimal("RCO_PORCENTAJE_RENDIMIENTO_ACADEMICO", 5,2)
        .nullable()
        .comment("Porcentaje de rendimiento académico");

      table
        .boolean("RCO_APLICA_PORCENTAJE_REQUISITOS")
        .nullable()
        .comment("Aplica porcentaje requisitos");

      table
        .decimal("RCO_PORCENTAJE_REQUISITOS", 5,2)
        .nullable()
        .comment("Porcentaje de requisitos");

      table
        .boolean("RCO_APLICA_SERVICIO_SOCIAL")
        .notNullable()
        .comment("Indicador de si aplica servicios social");

      table
        .decimal("RCO_SERVICO_SOCIAL_PORCENTAJE", 5,2)
        .nullable()
        .comment("Porcentaje de descuento por periodo del servicio social");

      table
        .integer("RCO_SERVICIO_SOCIAL_HORAS")
        .nullable()
        .comment("Horas por periodos del servicio social");

      table
        .string("RCO_SERVICIO_SOCIAL_TIPO_CONDONACION", 30)
        .nullable()
        .comment("Tipo de condonación para servicio social");

      table
        .text("RCO_SERVICIO_SOCIAL_CONDONACION", "longtext")
        .nullable()
        .comment("Array de condonación de servicio social");

      table
        .boolean("RCO_APLICA_TRANSFERENCIA_CONOCIMIENTO")
        .notNullable()
        .comment("Indicador de que si aplica la transf. de conocimiento");

      table
        .decimal("RCO_TRANSFERENCIA_CONOCIMIENTO_PORCENTAJE", 5,2)
        .nullable()
        .comment("Porcentaje de cumplimiento de la transf. de conocimiento");

      table
        .integer("RCO_TRANSFERENCIA_CONOCIMIENTO_HORAS")
        .nullable()
        .comment("Horas totales por el credito credito de la transf. de conocimeinto");

      table
        .string("RCO_TRANSFERENCIA_CONOCIMIENTO_TIPO_CONDONACION", 30)
        .nullable()
        .comment("Tipo de condonación para transferencia de conocimiento");

      table
        .text("RCO_TRANSFERENCIA_CONOCIMIENTO_CONDONACION", "longtext")
        .nullable()
        .comment("Array de condonación de transferencia de conocimiento");

      table
        .boolean("RCO_APLICA_PERIODO_GRACIA")
        .notNullable()
        .comment("Indicador de que si aplica el periodo de gracia");

      table
        .integer("RCO_PERIODO_GRACIA_MESES")
        .nullable()
        .comment("Numero de meses del periodo de gracia");

      table
        .string("RCO_PERIODO_GRACIA_APLICACION", 3)
        .nullable()
        .comment("Codigo de la Aplicacion (Listados Genericos - APLICACION_PERIODOS_GRACIA ) ");

      table
        .boolean("RCO_APLICA_SUSPENCION_CONTINUA")
        .notNullable()
        .comment("Indicador de que si aplica las suspenciones continuas");

      table
        .integer("RCO_SUSPENCION_CONTINUA_CANTIDAD")
        .nullable()
        .comment("Cantidad de suspenciones continuas");

      table
        .boolean("RCO_APLICA_SUSPENCION_DISCONTINUA")
        .notNullable()
        .comment("Indicador de que si aplica las suspenciones discontinuas");

      table
        .integer("RCO_SUSPENCION_DISCONTINUA_CANTIDAD")
        .nullable()
        .comment("Cantidad de suspenciones discontinuas");

      table
        .boolean("RCO_APLICA_SUSPENCION_ESPECIAL")
        .notNullable()
        .comment("Indicador de que si aplica las suspenciones especiales");

      table
        .integer("RCO_SUSPENCION_ESPECIAL_CANTIDAD")
        .nullable()
        .comment("Cantidad de suspenciones especiales");

      table
        .boolean("RCO_APLICA_PRORROGA")
        .notNullable()
        .comment("Indicador de que si aplica prorrogas");

      table
        .integer("RCO_PRORROGA_CANTIDAD")
        .nullable()
        .comment("Cantidad de prorrogas");

      table
        .boolean("RCO_APLICA_CODONACION_RENDIMEINTO_PERIODO")
        .notNullable()
        .comment("Indicador de Aplica condonación por rendimiento académico por periodo");

      table
        .text("RCO_RENDIMIENTO_PERIODO", "longtext")
        .nullable()
        .comment("Array de los rangos por promedio y porcentaje");

      table
        .boolean("RCO_APLICA_CODONACION_RENDIMEINTO_ACUMULADO")
        .notNullable()
        .comment("Indicador de Aplica condonación por rendimiento académico acumulado");

      table
        .text("RCO_RENDIMEINTO_ACUMULADO", "longtext")
        .nullable()
        .comment("Array de los rangos por promedio y porcentaje");

      table
        .string("RCO_USUARIO_MODIFICO", 15)
        .nullable()
        .comment("Numero del documento del ultimo usuario que hizo una modificacion");

      table
        .date("RCO_FECHA_MODIFICO")
        .nullable()
        .comment("Fecha y hora de la ultima modificacion");

      table
        .string("RCO_USUARIO_CREO", 15)
        .nullable()
        .comment("Numero del documento del usuario que creo el registro");

      table
        .date("RCO_FECHA_CREO")
        .nullable()
        .comment("Fecha y hora de creacion del registro");

    });

  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
