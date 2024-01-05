import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import BeneficiaryRenewTransfer from "./BeneficaryRenewTransfer";
import CallFond from "./CallFond";
import HistoricalGeneralTwists from "../Dtf_financiera/HistoricalGeneralTwists";

export default class AuroraEfeRenovado extends BaseModel {
  public static table = "vw_aurora_efe_renovados";
  public static connection = "mysql_sapiencia";

  @column({ isPrimary: true, columnName: "id_usuario", serializeAs: "id" })
  public id: number;
  @column({ columnName: "periodo", serializeAs: "period" })
  public period: number;
  @column({
    columnName: "periodo_descripcion",
    serializeAs: "periodDescription",
  })
  public periodDescription: string;
  @column({ columnName: "Pseleccion", serializeAs: "pSelection" })
  public pSelection: number;
  @column({
    columnName: "Pseleccion_descripcion",
    serializeAs: "pSelectionDescription",
  })
  public pSelectionDescription: string;
  @column({ columnName: "id_fondo", serializeAs: "idFund" })
  public idFund: number;
  @column({ columnName: "Fondo", serializeAs: "fund" })
  public fund: string;
  @column({ columnName: "Documento", serializeAs: "document" })
  public document: number;
  @column({ columnName: "Nombre", serializeAs: "name" })
  public name: string;
  @column({ columnName: "Correo", serializeAs: "email" })
  public email: string;
  @column({ columnName: "Celular", serializeAs: "cellPhone" })
  public cellPhone: string;
  @column({ columnName: "Modalidad_beneficio", serializeAs: "modalityBenefit" })
  public modalityBenefit: string;
  @column({ columnName: "Periodo_renovar", serializeAs: "periodRenew" })
  public periodRenew: string;
  @column({
    columnName: "Semestre_o_nivel_a_renovar",
    serializeAs: "semesterLevelRenew",
  })
  public semesterLevelRenew: string;
  @column({
    columnName: "Promedio_Acumulado",
    serializeAs: "accumulatedAverage",
  })
  public accumulatedAverage: string;
  @column({ columnName: "fecha_actualizacion", serializeAs: "dateUpdate" })
  public dateUpdate: string;

  @hasMany(() => BeneficiaryRenewTransfer, {
    localKey: "id",
    foreignKey: "id",
  })
  public beneficiaryRenewTransfer: HasMany<typeof BeneficiaryRenewTransfer>;

  @hasMany(() => CallFond, {
    localKey: "id",
    foreignKey: "userId",
  })
  public callFond: HasMany<typeof CallFond>;

  @hasMany(() => HistoricalGeneralTwists, {
    localKey: "document",
    foreignKey: "document",
  })
  public historicalGeneralTwists: HasMany<typeof HistoricalGeneralTwists>;
}
