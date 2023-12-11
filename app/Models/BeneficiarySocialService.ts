import { BaseModel, HasOne, column, hasOne } from "@ioc:Adonis/Lucid/Orm";
import BeneficiariesConsolidate from "./BeneficiariesConsolidate";

export default class BeneficiarySocialService extends BaseModel {
  public static table = "SSB_SERVICIOS_SOCIALES_BENEFICIARIO";

  @column({
    isPrimary: true,
    columnName: "SSB_CODIGO",
    serializeAs: "id",
  })
  public id: number;

  @column({
    columnName: "SSB_PERIODO_LEGALIZACION",
    serializeAs: "legalizationPeriod",
  })
  public legalizationPeriod: string;

  @column({
    columnName: "SSB_CODBAC_BENEFICIARIO_CONSOLIDACION",
    serializeAs: "idConsolidationBeneficiary",
  })
  public idConsolidationBeneficiary: number;

  @column({
    columnName: "SSB_HORAS_PRESTADAS",
    serializeAs: "hoursDone",
  })
  public hoursDone: number;

  @column({
    columnName: "SSB_RUTA_DOCUMENTO_SOPORTE",
    serializeAs: "documentPath",
  })
  public documentPath: string;

  @hasOne(() => BeneficiariesConsolidate, {
    localKey: "idConsolidationBeneficiary",
    foreignKey: "id",
  })
  public beneficiarieConsolidate: HasOne<typeof BeneficiariesConsolidate>;
}
