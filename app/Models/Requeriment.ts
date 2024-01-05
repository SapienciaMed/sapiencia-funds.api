import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Requeriment extends BaseModel {

  public static table = "RRE_REQUISITOS_REGLAMENTO";

  @column({
    isPrimary: true,
    columnName: "RRE_CODIGO",
    serializeAs: "id"
  })
  public id: number;

  @column({
    columnName: "RRE_CODRCO_REGLAMENTO",
    serializeAs: "codReglament"
  })
  public codReglament: number;

  @column({
    columnName: "RRE_ACTIVO",
    serializeAs: "active"
  })
  public active: boolean;

  @column({
    columnName: "RRE_PORCENTAJE",
    serializeAs: "percent"
  })
  public percent: number;

  @column({
    columnName: "RRE_DESCRIPCION",
    serializeAs: "description"
  })
  public description: string;

  @column({
    columnName: "RRE_OBLIGATORIO_PARA",
    serializeAs: "mandatoryFor"
  })
  public mandatoryFor: string;

}
