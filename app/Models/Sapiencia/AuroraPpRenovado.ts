import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import BeneficiaryRenewTransfer from "./BeneficaryRenewTransfer";
import CallFond from "./CallFond";
import HistoricalGeneralTwists from "../Dtf_financiera/HistoricalGeneralTwists";

export default class AuroraPpRenovado extends BaseModel {
  public static table = "vw_aurora_PP_renovados";
  public static connection = "mysql_sapiencia";

  @column({ isPrimary: true, columnName: "id_usuario", serializeAs: "id" })
  public id: number;

  @column({ columnName: "Periodo", serializeAs: "period" })
  public period: number;

  @column({ columnName: "periodo_descripcion", serializeAs: "periodDetail" })
  public periodDetail: string;

  @column({ columnName: "Pseleccion", serializeAs: "pSelection" })
  public pSelection: string;

  @column({
    columnName: "Pseleccion_descripcion",
    serializeAs: "pselectionDetail",
  })
  public pselectionDetail: string;

  @column({ columnName: "Documento", serializeAs: "document" })
  public number: string;

  @column({ columnName: "Nombre", serializeAs: "name" })
  public name: string;

  @column({
    columnName: "Comuna_beneficiario",
    serializeAs: "communeBeneficiary",
  })
  public communeBeneficiary: string;

  @column({ columnName: "Modalidad_beneficio", serializeAs: "modalityBenefit" })
  public modalityBenefit: string;

  @column({ columnName: "Periodo_Renovar", serializeAs: "renewPeriod" })
  public renewPeriod: number;

  @column({
    columnName: "Semestre_o_nivel_a_renovar",
    serializeAs: "periodRenew",
  })
  public periodRenew: string;

  @column({
    columnName: "Promedio_Acumulado",
    serializeAs: "accumulatedAverage",
  })
  public accumulatedAverage: string;

  @column({
    columnName: "Realizo_servicio",
    serializeAs: "performServiceSocial",
  })
  public performServiceSocial: string;

  @column({
    columnName: "Horas_servicio_realizo",
    serializeAs: "hoursServicePerform",
  })
  public hoursServicePerform: string;

  @column({ columnName: "operador", serializeAs: "operator" })
  public operator: string;

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
