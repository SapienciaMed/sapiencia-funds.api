import { BaseModel, column, } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class UploadInformation extends BaseModel {
    public static table = "CIN_CARGA_INFORMACIÓN";
    
    @column({isPrimary: true, columnName: "CIN_CODIGO", serializeAs: "id"})
    public id: number;

    @column({ 
        columnName: "CIN_COMUNA_BARRIO", 
        serializeAs: "commune" 
    })
    public commune: string;

    @column({ 
        columnName: "CIN_VIGENCIA", 
        serializeAs: "validity" 
    })
    public validity: string;

    @column({ 
        columnName: "CIN_INFORMACION", 
        serializeAs: "information" 
    })
    public information: string;

    @column({ 
        columnName: "CIN_NOMBRE_ARCHIVO", 
        serializeAs: "fileName" 
    })
    public fileName: string;

    @column({ 
        columnName: "CIN_FECHA_HORA_CARGA", 
        serializeAs: "dateUpload",
        prepare: (value: DateTime) => new Date(value?.toJSDate()),
    })
    public dateUpload: DateTime;
    

}
