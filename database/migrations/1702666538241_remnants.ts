import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  //protected tableName = 'RMT_REMANETES'
  protected tableName = 'ECO_EXCEDENTES_CONTRATOS'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {

      table.comment(
        "Tabla que contiene los calculos de los excedentes de contratos"
      );

      table.increments('ECO_CODIGO')
        .unsigned()
        .primary()
        .comment("llave primaria");

      table
        .string("ECO_CONVOCATORIA", 10)
        .notNullable()
        .comment("Numero de la convocatoria");

      table
        .string("ECO_LINEA_CREDITO", 10)
        .notNullable()
        .comment("Linea de credito o beca");

      table
        .integer("ECO_CONTRATO")
        .notNullable()
        .comment("Codigo de contrato");

      table
        .integer("ECO_NUMERO_BENEFICIOS")
        .notNullable()
        .comment("Numero de beneficios");

      table
        .decimal("ECO_VALOR_INVERSIÓN_CONTRATO", 15, 2)
        .notNullable()
        .comment("Valor de inversion de contrato");

      table
        .decimal("ECO_VALOR_PROYECTADO", 15, 2)
        .notNullable()
        .comment("Valor proyectado");

      table
        .decimal("ECO_VALOR_COMPROMETIDO_PROYECTADO", 15, 2)
        .notNullable()
        .comment("Valor comprometido proyectado");

      table
        .decimal("ECO_VALOR_EXCEDENTE", 15, 2)
        .notNullable()
        .comment("Valor excedente");

      table
        .decimal("ECO_GIRADO", 15, 2)
        .notNullable()
        .comment("Valor girado");

      table
        .decimal("ECO_PENDIENTE_POR_GIRAR_COMPROMETIDO", 15, 2)
        .notNullable()
        .comment("Valor pendiente por girar comprometido");

      table
        .decimal("ECO_PENDIENTE_POR_GIRAR_PROYECTADO", 15, 2)
        .notNullable()
        .comment("Valor pendiente por girar proyectado");

      table
        .decimal("ECO_RECURSOS_SIN_EJECUCIÓN", 15, 2)
        .notNullable()
        .comment("Recursos sin ejecucion");

      table
        .string("ECO_USUARIO_MODIFICO", 15)
        .nullable()
        .comment("Numero del documento del ultimo usuario que hizo una modificacion");

      table
        .dateTime("ECO_FECHA_MODIFICO")
        .nullable()
        .comment("Fecha y hora de la ultima modificacion");

      table
        .string("ECO_USUARIO_CREO", 15)
        .notNullable()
        .comment("Numero del documento del usuario que creo el registro");

      table
        .dateTime("ECO_FECHA_CREO")
        .notNullable()
        .comment("Fecha y hora de creacion del registro");









      /* table.increments('RMT_CODIGO')
        .unsigned()
        .primary()
        .comment("llave primaria");

      table
        .string("RMT_CONVOCATORIA", 10)
        .notNullable()
        .comment("Numero de la convocatoria");

      table
        .integer("RMT_FIDUCIA")
        .notNullable()
        .comment("Fiducia");

      table
        .integer("RMT_FONDO_COMUNA")
        .notNullable()
        .comment("Codigo del Fondo comuna (db sapiencia)");

      table
        .decimal("RMT_RESTANTE", 15, 2)
        .notNullable()
        .comment("valor restante");

      table
        .decimal("RMT_COSTO_PROMEDIO", 15, 2)
        .notNullable()
        .comment("costo promedio");

      table
        .integer("RMT_CUPOS")
        .notNullable()
        .comment("numero de cupos");

      table
        .decimal("RMT_RECURSO_CUPOS", 15, 2)
        .notNullable()
        .comment("valor de recurso con cupos");

      table
        .decimal("RMT_RECIDUAL", 15, 2)
        .notNullable()
        .comment("valor recidual");

      table
        .string("RMT_USUARIO_MODIFICO", 15)
        .nullable()
        .comment("valor recidual");

      table
        .dateTime("RMT_FECHA_MODIFICO")
        .nullable()
        .comment("Fecha y hora de la ultima modificacion");

      table
        .string("RMT_USUARIO_CREO", 15)
        .notNullable()
        .comment("Numero del documento del usuario que creo el registro");

      table
        .dateTime("RMT_FECHA_CREO")
        .notNullable()
        .comment("Fecha y hora de creacion del registro");

      table.integer("RMT_CODPMA_PROGRAMA")
        .unsigned().references("PMA_CODIGO")
        .inTable("PMA_PROGRAMA") // Cambiado a nombre de tabla correcto
        .withKeyName('rmt_remanetes_fk')
        .unsigned()
        .notNullable()
        .comment("Codigo Programa (FK PMA)");
*/
    })

  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
