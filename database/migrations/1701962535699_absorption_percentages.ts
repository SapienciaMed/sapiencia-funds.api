import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { ABSORPTION_PERCENTAGE_TABLE } from "App/Constants/Tables/AbsorptionPercentage";

export default class extends BaseSchema {
  protected tableName = ABSORPTION_PERCENTAGE_TABLE.TABLE_NAME;
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los porcentajes de absorción");
      table
        .increments(ABSORPTION_PERCENTAGE_TABLE.ID)
        .primary()
        .unique()
        .notNullable()
        .comment("Llave primaria");
      table
        .string(ABSORPTION_PERCENTAGE_TABLE.ANNOUNCEMENT_ID, 10)
        .notNullable()
        .comment("Número de la convocatoria");
      table
        .integer(ABSORPTION_PERCENTAGE_TABLE.COMMUNE_FUND_ID)
        .notNullable()
        .comment("Código del fondo comuna (db sapiencia)");
      table
        .decimal(ABSORPTION_PERCENTAGE_TABLE.RESOURCE, 15, 2)
        .notNullable()
        .comment("Valor del recurso");
      table
        .decimal(ABSORPTION_PERCENTAGE_TABLE.SCENERY_PERCENTAGE_1, 5, 2)
        .notNullable()
        .comment("Porcentaje del escenario 1");
      table
        .decimal(ABSORPTION_PERCENTAGE_TABLE.SCENERY_PERCENTAGE_2, 5, 2)
        .notNullable()
        .comment("Porcentaje del escenario 2");
      table
        .decimal(ABSORPTION_PERCENTAGE_TABLE.SCENERY_PERCENTAGE_3, 5, 2)
        .notNullable()
        .comment("Porcentaje del escenario 3");
      table
        .decimal(ABSORPTION_PERCENTAGE_TABLE.SCENERY_VALUE_1, 15, 2)
        .notNullable()
        .comment("Valor del escenario 1");
      table
        .decimal(ABSORPTION_PERCENTAGE_TABLE.SCENERY_VALUE_2, 15, 2)
        .notNullable()
        .comment("Valor del escenario 2");
      table
        .decimal(ABSORPTION_PERCENTAGE_TABLE.SCENERY_VALUE_3, 15, 2)
        .notNullable()
        .comment("Valor del escenario 3");
      table
        .string(ABSORPTION_PERCENTAGE_TABLE.USER_MODIFIED, 15)
        .nullable()
        .comment(
          "Número del documento del último usuario que hizo una modificación"
        );
      table
        .dateTime(ABSORPTION_PERCENTAGE_TABLE.UPDATED_AT)
        .nullable()
        .comment("Fecha y hora de la última modificación");
      table
        .string(ABSORPTION_PERCENTAGE_TABLE.USER_CREATED, 15)
        .notNullable()
        .comment("Número del documento del usuario que creó el registro");
      table
        .dateTime(ABSORPTION_PERCENTAGE_TABLE.CREATED_AT)
        .notNullable()
        .comment("Fecha y hora de creación del registro");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
