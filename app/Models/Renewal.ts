import { DateTime } from "luxon";
import { BaseModel, column,  } from "@ioc:Adonis/Lucid/Orm";
import Env from "@ioc:Adonis/Core/Env";


export default class Renewal extends BaseModel {

    public static table = "RRP_RENEWAL_REPORT";
    @column({isPrimary: true, columnName: "RRP_CODIGO", serializeAs: "id"})
    public id: number;

    @column({ columnName: "RRP_PERIODO", serializeAs: "period" })
    public period: string;

    @column({ columnName: "RRP_FONDO", serializeAs: "fund" })
    public fund: string;

    @column({ columnName: "RRP_N_Habilitados", serializeAs: "enabled" })
    public enabled: number;

    @column({ columnName: "RRP_N_Renovados", serializeAs: "renewed" })
    public renewed: number;

    @column({ columnName: "RRP_PORCENTAJE", serializeAs: "percentage" })
    public percentage: string;

    @column({
        columnName: "RRP_USUARIO_MODIFICO",
        serializeAs: "userModified",
      })
      public userModified: string;
    
    @column.dateTime({
        autoUpdate: true,
        columnName: "RRP_FECHA_MODIFICO",
        serializeAs: "dateModified",
        prepare: (value: DateTime) => new Date(value?.toJSDate()),
      })
      public dateModified: DateTime;
    
    @column({
        columnName: "RRP_USUARIO_CREO",
        serializeAs: "userCreate",
      })
      public userCreate: string | undefined = Env.get("USER_ID");
    
    @column.dateTime({
        autoCreate: true,
        columnName: "RRP_FECHA_CREO",
        serializeAs: "dateCreate",
        prepare: (value: DateTime) => new Date(value?.toJSDate()),
      })
      public dateCreate: DateTime;
    
}
