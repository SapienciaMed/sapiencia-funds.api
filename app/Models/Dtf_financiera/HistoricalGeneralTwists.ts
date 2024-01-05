import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class HistoricalGeneralTwists extends BaseModel {
  public static table = "vw_giros_general_historico_ies";
  public static connection = "mysql_convocatoria_dtf_financiera";

  @column({ columnName: "documento", serializeAs: "document" })
  public document: string;

  @column({ columnName: "soicitud", serializeAs: "appication" })
  public application: string;

  @column({
    columnName: "solicitud_nuevo_fiduciaria",
    serializeAs: "newApplicationTrustee",
  })
  public newApplicationTrustee: string;

  @column({ columnName: "convocatoria", serializeAs: "announcement" })
  public announcement: string;

  @column({
    columnName: "convocatoria_numero",
    serializeAs: "announcementNumber",
  })
  public announcementNumber: string;

  @column({
    columnName: "encargo_fiduciario",
    serializeAs: "fiduciaryAssignment",
  })
  public fiduciaryAssignment: string;

  @column({
    columnName: "orden_pago_sostenimiento",
    serializeAs: "supportPaymentOrder",
  })
  public supportPaymentOrder: string;

  @column({
    columnName: "orden_pago_matricula",
    serializeAs: "registrationPaymentOrder",
  })
  public registrationPaymentOrder: string;

  @column({
    columnName: "periodo",
    serializeAs: "period",
  })
  public period: string;

  @column({
    columnName: "estado",
    serializeAs: "state",
  })
  public state: string;

  @column({
    columnName: "tipo_documento",
    serializeAs: "typeDocument",
  })
  public typeDocument: string;

  @column({
    columnName: "documento_actual",
    serializeAs: "currentDocument",
  })
  public currentDocument: string;

  @column({
    columnName: "documento_anterior",
    serializeAs: "previousDocument",
  })
  public previousDocument: string;

  @column({
    columnName: "genero",
    serializeAs: "gender",
  })
  public gender: string;

  @column({
    columnName: "fecha_nacimiento",
    serializeAs: "birthDate",
  })
  public birthDate: string;

  @column({
    columnName: "nombre",
    serializeAs: "name",
  })
  public name: string;

  @column({
    columnName: "primerApellido",
    serializeAs: "surname",
  })
  public surname: string;

  @column({
    columnName: "segundoApellido",
    serializeAs: "secondSurname",
  })
  public secondSurname: string;

  @column({
    columnName: "ies",
    serializeAs: "ies",
  })
  public ies: string;

  @column({
    columnName: "programa",
    serializeAs: "program",
  })
  public program: string;

  @column({
    columnName: "modalidad",
    serializeAs: "modality",
  })
  public modality: string;

  @column({
    columnName: "semestre_cursar",
    serializeAs: "semesterToStudy",
  })
  public semesterToStudy: string;

  @column({
    columnName: "giros_solicitados",
    serializeAs: "requestedDrafts",
  })
  public requestedDrafts: string;

  @column({
    columnName: "giros_realizados",
    serializeAs: "turnsMade",
  })
  public turnsMade: string;

  @column({
    columnName: "debito",
    serializeAs: "debit",
  })
  public debit: string;

  @column({
    columnName: "consignacion_sostenimiento",
    serializeAs: "maintenanceConsignment",
  })
  public maintenanceConsignment: string;

  @column({
    columnName: "valor_debito",
    serializeAs: "dedbitValue",
  })
  public dedbitValue: string;

  @column({
    columnName: "valor_debito_real",
    serializeAs: "actualDebitValue",
  })
  public actualDebitValue: string;

  @column({
    columnName: "valor_liquidacion_matricula",
    serializeAs: "registrationLiquidationValue",
  })
  public registrationLiquidationValue: string;

  @column({
    columnName: "valor_pagar_matricula",
    serializeAs: "valueToPayTuition",
  })
  public valueToPayTuition: string;

  @column({
    columnName: "valor_pagar_sostenimiento",
    serializeAs: "valueToPaySupport",
  })
  public valueToPaySupport: string;

  @column({
    columnName: "valor_girar",
    serializeAs: "spinValue",
  })
  public spinValue: string;

  @column({
    columnName: "fecha_registro",
    serializeAs: "registrationDate",
  })
  public registrationDate: string;

  @column({
    columnName: "departamento_nacimiento",
    serializeAs: "birthDepartment",
  })
  public birthDepartment: string;

  @column({
    columnName: "municipio_nacimiento",
    serializeAs: "birthMunicipality",
  })
  public birthMunicipality: string;

  @column({
    columnName: "departamento_residencia",
    serializeAs: "residenceDepartment",
  })
  public residenceDepartment: string;

  @column({
    columnName: "municipio_residencia",
    serializeAs: "residenceMunicipality",
  })
  public residenceMunicipality: string;

  @column({
    columnName: "barrio",
    serializeAs: "neighborhood",
  })
  public neighborhood: string;

  @column({
    columnName: "comuna",
    serializeAs: "commune",
  })
  public commune: string;

  @column({
    columnName: "estrato",
    serializeAs: "stratum",
  })
  public stratum: string;

  @column({
    columnName: "direccion",
    serializeAs: "address",
  })
  public address: string;

  @column({
    columnName: "telefono",
    serializeAs: "phone",
  })
  public phone: string;

  @column({
    columnName: "celular",
    serializeAs: "cellPhone",
  })
  public cellPhone: string;

  @column({
    columnName: "correo",
    serializeAs: "mail",
  })
  public mail: string;

  @column({
    columnName: "correo_alterno",
    serializeAs: "alternateEmail",
  })
  public alternateEmail: string;

  @column({
    columnName: "observacion",
    serializeAs: "observation",
  })
  public observation: string;

  @column({
    columnName: "correo_aprobado",
    serializeAs: "approvedEmail",
  })
  public approvedEmail: string;

  @column({
    columnName: "fondo",
    serializeAs: "fund",
  })
  public fund: string;

  @column({
    columnName: "periodo_a_renovar",
    serializeAs: "periodToRenew",
  })
  public periodToRenew: string;
}
