import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { ABSORPTION_PERCENTAGE_TABLE } from "App/Constants/Tables/AbsorptionPercentage";
import { DateTime } from "luxon";

export default class AbsorptionPercentaje extends BaseModel {
  public static table = ABSORPTION_PERCENTAGE_TABLE.TABLE_NAME;

  @column({
    isPrimary: true,
    columnName: ABSORPTION_PERCENTAGE_TABLE.ID,
    serializeAs: "id",
  })
  public id: number;

  @column({
    columnName: ABSORPTION_PERCENTAGE_TABLE.ANNOUNCEMENT_ID,
    serializeAs: "announcementId",
  })
  public announcementId: number;

  @column({
    columnName: ABSORPTION_PERCENTAGE_TABLE.COMMUNE_FUND_ID,
    serializeAs: "communeFundId",
  })
  public communeFundId: number;

  @column({
    columnName: ABSORPTION_PERCENTAGE_TABLE.RESOURCE,
    serializeAs: "resource",
  })
  public resource: number;

  @column({
    columnName: ABSORPTION_PERCENTAGE_TABLE.SCENERY_PERCENTAGE_1,
    serializeAs: "sceneryPercentage1",
  })
  public sceneryPercentage1: number;

  @column({
    columnName: ABSORPTION_PERCENTAGE_TABLE.SCENERY_PERCENTAGE_2,
    serializeAs: "sceneryPercentage2",
  })
  public sceneryPercentage2: number;

  @column({
    columnName: ABSORPTION_PERCENTAGE_TABLE.SCENERY_PERCENTAGE_3,
    serializeAs: "sceneryPercentage3",
  })
  public sceneryPercentage3: number;

  @column({
    columnName: ABSORPTION_PERCENTAGE_TABLE.SCENERY_VALUE_1,
    serializeAs: "sceneryValue1",
  })
  public sceneryValue1: number;

  @column({
    columnName: ABSORPTION_PERCENTAGE_TABLE.SCENERY_VALUE_2,
    serializeAs: "sceneryValue2",
  })
  public sceneryValue2: number;

  @column({
    columnName: ABSORPTION_PERCENTAGE_TABLE.SCENERY_VALUE_3,
    serializeAs: "sceneryValue3",
  })
  public sceneryValue3: number;

  @column({
    columnName: ABSORPTION_PERCENTAGE_TABLE.USER_MODIFIED,
    serializeAs: "userModified",
  })
  public userModified: string;

  @column.dateTime({
    autoUpdate: true,
    columnName: ABSORPTION_PERCENTAGE_TABLE.UPDATED_AT,
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;

  @column({
    columnName: ABSORPTION_PERCENTAGE_TABLE.USER_CREATED,
    serializeAs: "userCreated",
  })
  public userCreated: string;

  @column.dateTime({
    autoCreate: true,
    columnName: ABSORPTION_PERCENTAGE_TABLE.CREATED_AT,
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;
}
