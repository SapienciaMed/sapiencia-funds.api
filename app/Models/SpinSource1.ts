import { BaseModel,
         column,
         hasOne,
         HasOne } from "@ioc:Adonis/Lucid/Orm";
import BeneficiariesConsolidate from './SpinSource1';

export default class SpinSource1 extends BaseModel {
  public static table = "GIR_GIROS_FUENTE1";

  @column({
    isPrimary: true,
    columnName: "GIR_CODIGO",
    serializeAs: "id"
  })
  public id: number;

  @column({
    columnName: "GIR_BENEFICIARIO",
    serializeAs: "beneficiaryId"
  })
  public beneficiaryId: number;

  @column({
    columnName: "GIR_ID_USUARIO",
    serializeAs: "userId"
  })
  public userId: number;

  @column({
    columnName: "GIR_ID_CREDITO",
    serializeAs: "creditId"
  })
  public creditId: number;

  @column({
    columnName: "GIR_NUMERO_CONTRATO_FIDUCIARIO",
    serializeAs: "fiducyContractNumber"
  })
  public fiducyContractNumber: number;

  @column({
    columnName: "GIR_PERIODO_LEGALIZACION",
    serializeAs: "legalPeriod",
  })
  public legalPeriod: number;

  @column({
    columnName: "GIR_DOCUMENTO",
    serializeAs: "document",
  })
  public document: string;

  @column({
    columnName: "GIR_ID_FONDO",
    serializeAs: "fundId",
  })
  public fundId: number;

  @column({
    columnName: "GIR_NOMBRE_FONDO",
    serializeAs: "fundName",
  })
  public fundName: string;

  @column({
    columnName: "GIR_MODALIDAD",
    serializeAs: "modality",
  })
  public modality: string;

  @column({
    columnName: "GIR_PERIODOS",
    serializeAs: "periods"
  })
  public periods: number;

  @column({
    columnName: "GIR_SEMESTRES_PROYECTADOS",
    serializeAs: "projectedSemesters",
  })
  public projectedSemesters: number;

  @column({
    columnName: "GIR_VALOR_PROYECTADO_MATRICULA",
    serializeAs: "projectedValueTuition",
  })
  public projectedValueTuition: number;

  @column({
    columnName: "GIR_VALOR_PROYECTADO_SOSTENIMIENTO",
    serializeAs: "projectedValueSustenance",
  })
  public projectedValueSustenance: number;

  @column({
    columnName: "GIR_SEMESTRE_RENOVADO",
    serializeAs: "renewSemester"
  })
  public renewSemester: number;

  @column({
    columnName: "GIR_VALOR_RENOVADO_MATRICULA",
    serializeAs: "renewValueTuition",
  })
  public renewValueTuition: number;

  @column({
    columnName: "GIR_VALOR_RENOVADO_SOSTENIMIENTO",
    serializeAs: "renewValueSustenance",
  })
  public renewValueSustenance: number;

  @column({
    columnName: "GIR_VALOR_GIRADO_MATRICULA",
    serializeAs: "spinValueTuition",
  })
  public spinValueTuition: number;

  @column({
    columnName: "GIR_VALOR_GIRADO_SOSTENIMIENTO",
    serializeAs: "spinValueSustenance",
  })
  public spinValueSustenance: number;

  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------

  @hasOne(() => BeneficiariesConsolidate, {
    localKey: "beneficiaryId",
    foreignKey: "id",
    serializeAs: "beneficiary",
  })
  public beneficiary: HasOne<typeof BeneficiariesConsolidate>;

}
