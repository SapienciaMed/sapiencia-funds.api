import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class BeneficiaryRenewTransfer extends BaseModel {
  public static table = "giro_vwbeneficiario_proyec_renova_giro";
  public static connection = "mysql_sapiencia";

  @column({ isPrimary: true, columnName: "id_usuario", serializeAs: "id" })
  public id: number;

  @column({
    columnName: "id_perido_legalizacion",
    serializeAs: "idPeriodLegalization",
  })
  public periodLegalization: number;

  @column({
    columnName: "perido_legalizacion",
    serializeAs: "PeriodLegalization",
  })
  public PeriodLegalization: string;

  @column({ columnName: "documento_beneficiario", serializeAs: "document" })
  public document: number;

  @column({ columnName: "nombre_beneficiario", serializeAs: "name" })
  public name: string;

  @column({ columnName: "idfiducia", serializeAs: "idFiducia" })
  public idFiducia: number;

  @column({
    columnName: "numero_contrato_difuciario",
    serializeAs: "contractNumber",
  })
  public contractNumber: string;

  @column({ columnName: "id_fondo", serializeAs: "idFund" })
  public idFund: number;

  @column({ columnName: "nombrefondo", serializeAs: "fundName" })
  public fundName: string;

  @column({
    columnName: "identificacionfondo",
    serializeAs: "fundIdentification",
  })
  public fundIdentification: string;

  @column({ columnName: "comunagiros", serializeAs: "communeTransfer" })
  public communeTransfer: number;

  @column({ columnName: "observacion", serializeAs: "observation" })
  public observation: string;

  @column({
    columnName: "numero_semestre_proyectado",
    serializeAs: "projectedSemesterNumber",
  })
  public projectedSemesterNumber: number;

  @column({
    columnName: "periodo_calculado_proeyctado",
    serializeAs: "projectedCalculatedPeriod",
  })
  public projectedCalculatedPeriod: number;

  @column({ columnName: "tipo_modalidad", serializeAs: "modalityType" })
  public modalityType: number;

  @column({ columnName: "total_semestres", serializeAs: "totalSemester" })
  public totalSemester: number;

  @column({
    columnName: "valor_proeyctado_matricula",
    serializeAs: "projectedValueEnrollment",
  })
  public projectedValueEnrollment: number;

  @column({
    columnName: "valor_proeyctado_sosteneimiento",
    serializeAs: "projectedValueSustenance",
  })
  public projectedValueSustenance: number;

  @column({ columnName: "total_proyectado", serializeAs: "totalProjected" })
  public totalProjected: number;

  @column({ columnName: "id_renovacionusuario", serializeAs: "idRenewUser" })
  public idRenewUser: number;

  @column({
    columnName: "numero_semestre_renovado",
    serializeAs: "renewSemesterNumber",
  })
  public renewSemesterNumber: number;

  @column({ columnName: "periodo_calculado", serializeAs: "periodCalculated" })
  public periodCalculated: number;

  @column({
    columnName: "valor_renovado_matricula",
    serializeAs: "enrollmentRenewValue",
  })
  public enrollmentRenewValue: number;

  @column({
    columnName: "valor_renovado_sostenimiento",
    serializeAs: "sustenanceRenewValue",
  })
  public sustenanceRenewValue: number;

  @column({ columnName: "total_renovacion", serializeAs: "renewTotal" })
  public renewTotal: number;

  @column({
    columnName: "diferencia_proyectado_renovacion",
    serializeAs: "diferenceRenewProjected",
  })
  public diferenceRenewProjected: number;

  @column({
    columnName: "valor_girado_matricula",
    serializeAs: "enrollmentTransferValue",
  })
  public enrollmentTransferValue: number;

  @column({
    columnName: "valor_girado_sostenimiento",
    serializeAs: "sustenanceTransferValue",
  })
  public sustenanceTransferValue: number;

  @column({ columnName: "total_girado", serializeAs: "totalTransfer" })
  public totalTransfer: number;

  @column({
    columnName: "diferencia_proyectado_giro",
    serializeAs: "diferenceTransferProjected",
  })
  public diferenceTransferProjected: number;

  @column({ columnName: "giro_matricula", serializeAs: "transferEnrollment" })
  public transferEnrollment: string;

  @column({
    columnName: "giro_sostenimento",
    serializeAs: "transferSustenance",
  })
  public transferSustenance: string;

  @column({ columnName: "fecharegistro", serializeAs: "registerDate" })
  public registerDate: string;

  @column({ columnName: "id_usuariosgiros", serializeAs: "usersTransferId" })
  public usersTransferId: string;

  @column({ columnName: "estado_credito", serializeAs: "stateCredit" })
  public stateCredit: string;

  @column({ columnName: "id_estado_credito", serializeAs: "stateCreditId" })
  public stateCreditId: number;
}
