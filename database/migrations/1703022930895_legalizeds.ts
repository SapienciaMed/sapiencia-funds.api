import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { LEGALIZED_TABLE } from "App/Constants/Tables/Legalized";

export default class extends BaseSchema {
  protected tableName = LEGALIZED_TABLE.TABLE_NAME;
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment(
        "Tabla que contiene los elementos legalizados obtenidos desde Sapiencia"
      );
      table
        .increments(LEGALIZED_TABLE.ID)
        .primary()
        .unique()
        .notNullable()
        .comment("Llave primaria");
      table
        .string(LEGALIZED_TABLE.ANNOUNCEMENT_ID, 10)
        .notNullable()
        .comment("Número de la convocatoria");
      table
        .integer(LEGALIZED_TABLE.COMMUNE_FUND_ID)
        .notNullable()
        .comment("Código del fondo comuna (db sapiencia)");
      table
        .decimal(LEGALIZED_TABLE.RESOURCE, 15, 2)
        .notNullable()
        .comment("Valor del recurso");
      table
        .integer(LEGALIZED_TABLE.FIDUCIARY_ID)
        .notNullable()
        .comment("Código fiducia");
      table.integer(LEGALIZED_TABLE.ORDER).notNullable().comment("Orden");
      table
        .dateTime(LEGALIZED_TABLE.UPDATED_DATE)
        .nullable()
        .comment("Fecha y hora de la última modificación");
      table
        .string(LEGALIZED_TABLE.USER_MODIFIED, 15)
        .nullable()
        .comment(
          "Número del documento del último usuario que hizo una modificación"
        );
      table
        .dateTime(LEGALIZED_TABLE.UPDATED_AT)
        .nullable()
        .comment("Fecha y hora de la última modificación");
      table
        .string(LEGALIZED_TABLE.USER_CREATED, 15)
        .notNullable()
        .comment("Número del documento del usuario que creó el registro");
      table
        .dateTime(LEGALIZED_TABLE.CREATED_AT)
        .notNullable()
        .comment("Fecha y hora de creación del registro");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
