import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import BeneficiariesConsolidate from './BeneficiariesConsolidate';
import Reglament from './Reglament';

export default class RequirementsConsolidate extends BaseModel {

  public static table = "REC_REQUERIMIENTOS_PARA_CONSOLIDACION";

  @column({
    isPrimary: true,
    columnName: "REC_CODIGO",
    serializeAs: "id"
  })
  public id: number;

  @column({
    columnName: "REC_BENEFICIARIO",
    serializeAs: "idBeneficiary"
  })
  public idBeneficiary: number;

  @column({
    columnName: "REC_REGLAMENTO",
    serializeAs: "idReglament"
  })
  public idReglament: number;

  @column({
    columnName: "REC_REF_PK_REQUERIMIENTO",
    serializeAs: "idRequirement"
  })
  public idRequirement: number;

  @column({
    columnName: "REC_REF_DESCRIPCION_REQUERIMIENTO",
    serializeAs: "descriptionRequirement"
  })
  public descriptionRequirement: string;

  @column({
    columnName: "REC_REF_ACTIVO_REQUERIMIENTO",
    serializeAs: "activeRequirement"
  })
  public activeRequirement: boolean;

  @column({
    columnName: "REC_REF_PORCENTAJE_REQUERIMIENTO",
    serializeAs: "percentRequirement"
  })
  public percentRequirement: number | null;

  @column({
    columnName: "REC_CUMPLE",
    serializeAs: "accomplished"
  })
  public accomplished: boolean;

  @column({
    columnName: "REC_REF_OBLIGATORIO_PARA",
    serializeAs: "mandatoryFor"
  })
  public mandatoryFor: string;


  @hasOne(() => BeneficiariesConsolidate, {
    localKey: "idBeneficiary",
    foreignKey: "id",
    serializeAs: "beneficiary",
  })
  public beneficiary: HasOne<typeof BeneficiariesConsolidate>;

  @hasOne(() => Reglament, {
    localKey: "idReglament",
    foreignKey: "id",
    serializeAs: "reglament",
  })
  public reglament: HasOne<typeof Reglament>;

}
