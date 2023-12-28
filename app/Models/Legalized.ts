import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { LEGALIZED_TABLE } from "App/Constants/Tables/Legalized";
import { DateTime } from "luxon";

export default class Legalized extends BaseModel {
  public static table = LEGALIZED_TABLE.TABLE_NAME;

  @column({
    isPrimary: true,
    columnName: LEGALIZED_TABLE.ID,
    serializeAs: "id",
  })
  public id: number;

  @column({
    columnName: LEGALIZED_TABLE.ANNOUNCEMENT_ID,
    serializeAs: "announcementId",
  })
  public announcementId: number;

  @column({
    columnName: LEGALIZED_TABLE.COMMUNE_FUND_ID,
    serializeAs: "communeFundId",
  })
  public communeFundId: number;

  @column({
    columnName: LEGALIZED_TABLE.RESOURCE,
    serializeAs: "resource",
  })
  public resource: number;

  @column({
    columnName: LEGALIZED_TABLE.FIDUCIARY_ID,
    serializeAs: "fiduciaryId",
  })
  public fiduciaryId: number;

  @column({
    columnName: LEGALIZED_TABLE.ORDER,
    serializeAs: "order",
  })
  public order: number;

  @column({
    columnName: LEGALIZED_TABLE.USER_MODIFIED,
    serializeAs: "userModified",
  })
  public userModified: string;

  @column.dateTime({
    autoUpdate: true,
    columnName: LEGALIZED_TABLE.UPDATED_AT,
    serializeAs: "updatedAt",
    serialize: (value: DateTime) => {
      return value ? value.setLocale("zh").toFormat("dd-MM-yyyy") : value;
    },
  })
  public updatedAt: DateTime;
}
