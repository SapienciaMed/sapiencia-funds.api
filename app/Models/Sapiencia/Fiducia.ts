import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Fiducia extends BaseModel {

  public static table = "fidu_fiducia";
  public static connection = "mysql_sapiencia";

  @column({ isPrimary: true, columnName: "idfiducia", serializeAs: "id" })
  public id: number;

  @column({  columnName: "idoperadorfinanciero", serializeAs: "financialOperatorId" })
  public financialOperatorId: number;

  @column({  columnName: "numcontrato", serializeAs: "contractNumber" })
  public contractNumber: string;

  @column({  columnName: "supervisor", serializeAs: "supervisor" })
  public supervisor: string;

  @column({  columnName: "apoyo", serializeAs: "support" })
  public support: string;

  @column({  columnName: "fechainicio", serializeAs: "startDate" })
  public startDate: string;

  @column({  columnName: "fechafin", serializeAs: "endDate" })
  public endDate: string;

  @column({  columnName: "objeto", serializeAs: "object" })
  public object: string;

  @column({  columnName: "estado", serializeAs: "status" })
  public status: number;

  @column({  columnName: "periodoyear", serializeAs: "yearPeriod" })
  public yearPeriod: string;

  @column({  columnName: "fechacreacion", serializeAs: "dateCreation" })
  public dateCreation: string;

  @column({  columnName: "fechamodificacion", serializeAs: "modificationDate" })
  public modificationDate: string;

  @column({  columnName: "eliminado", serializeAs: "deleted" })
  public deleted: number;

  @column({  columnName: "identificacionfiducia", serializeAs: "fiduciaryIdentification" })
  public fiduciaryIdentification: string;
}
