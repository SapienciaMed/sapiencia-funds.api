import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Acta from './Acta';

export default class Citation extends BaseModel {

  public static table = "CTA_CITACION_ACTA";

  @column({ isPrimary: true, columnName: "CTA_CODIGO ", serializeAs: "id" }) public id: number;

  @column({ columnName: "CTA_FECHA_CITA", serializeAs: "dateCitation" })
  public dateCitation: string;

  @column({ columnName: "CTA_HORA", serializeAs: "timeCitation" })
  public timeCitation: string;

  @column({ columnName: "CTA_USER", serializeAs: "user" })
  public user: string;

 
  @column({ columnName: "CTA_ESTADO", serializeAs: "status" })
  public status: number;

 
  @column({ columnName: "CTA_CODATA_CODIGO", serializeAs: "idActa" })
  public idActa: number;

  @column({ columnName: "CTA_FECHA_APROBADO", serializeAs: "dateAprobation" })
  public dateAprobation: string;

  @column({ columnName: "CTA_CORREO_USER", serializeAs: "email" })
  public email: string;

 
  @belongsTo(() => Acta, {
    foreignKey: 'idActa',
    localKey: 'id',
  })
  public acta: BelongsTo<typeof Acta>
}


/* 
  
*/