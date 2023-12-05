import { BaseModel,
         column,
         hasOne,
         HasOne } from '@ioc:Adonis/Lucid/Orm';
import Env from "@ioc:Adonis/Core/Env";
import BeneficiariesConsolidate from './BeneficiariesConsolidate';
import Reglament from './Reglament';
import MasterStatusPacc from './MasterStatusPacc';

export default class KnowledgeTransfer extends BaseModel {

  public static table = "TRC_TRANSFERENCIA_CONOCIMIENTO_CONSOLIDADO";

  @column({
    isPrimary: true,
    columnName: "TRC_CODIGO",
    serializeAs: "id"
  })
  public id: number;

  @column({
    columnName: "TRC_BENEFICIARIO",
    serializeAs: "idBeneficiary"
  })
  public idBeneficiary: number;

  @column({
    columnName: "TRC_REF_REGLAMENTO",
    serializeAs: "idReglament"
  })
  public idReglament: number;

  @column({
    columnName: "TRC_HORAS_COMPROMETIDAS",
    serializeAs: "committedHours"
  })
  public committedHours: number;

  @column({
    columnName: "TRC_HORAS_REALIZADAS",
    serializeAs: "workedHours"
  })
  public workedHours: number;

  @column({
    columnName: "TRC_HORAS_PENDIENTES",
    serializeAs: "pendingHours"
  })
  public pendingHours: number;

  @column({
    columnName: "TRC_PORCENTAJE_TRANSFERENCIA",
    serializeAs: "percentTransfer"
  })
  public percentTransfer: number;

  @column({
    columnName: "TRC_ESTADO",
    serializeAs: "status"
  })
  public status: boolean;

  @column({
    columnName: "TRC_ESTADO_PROCESO",
    serializeAs: "idStatusProcessPacc"
  })
  public idStatusProcessPacc: number;

  @column({
    columnName: "TRC_OBSERVACIONES",
    serializeAs: "observations"
  })
  public observations: string;

  @column({
    columnName: "TRC_RESPONSABLE",
    serializeAs: "userCreate",
  })
  public userCreate: string | undefined = Env.get("USER_ID");

  @column({
    columnName: "TRC_FECHA_CREO",
    serializeAs: "dateCreate",
  })
  public dateCreate: Date;



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

  @hasOne(() => MasterStatusPacc, {
    localKey: "idStatusProcessPacc",
    foreignKey: "id",
    serializeAs: "statusPacc",
  })
  public statusPacc: HasOne<typeof MasterStatusPacc>;

}
