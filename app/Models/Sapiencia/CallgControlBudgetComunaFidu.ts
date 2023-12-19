
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CallgControlBudgetComunaFidu extends BaseModel {
  
  public static table = "callg_control_presupuesto_comuna_fidu";
  public static connection = "mysql_sapiencia";

  @column({  columnName: "comuna", serializeAs: "comuna" })
  public comuna: number;

  @column({  columnName: "presupuesto_comuna", serializeAs: "communebudget" })
  public communebudget: number;
  
  @column({  columnName: "acumulado_legali_comuna", serializeAs: "accumulatedLegaliComuna" })
  public accumulatedLegaliComuna: number;
  
  @column({  columnName: "restante_presupuesto_comuna", serializeAs: "remainingCommuneBudget" })
  public remainingCommuneBudget: number;

  @column({  columnName: "numero_usuarios_comuna", serializeAs: "numberUsersCommune" })
  public numberUsersCommune: number;
  
  @column({  columnName: "periodo", serializeAs: "period" })
  public period: number;
  
  @column({  columnName: "puntaje_corte", serializeAs: "cutScore" })
  public cutScore: number;
  
  @column({  columnName: "cierre", serializeAs: "closing" })
  public closing: number;
  
  @column({  columnName: "idfiducia", serializeAs: "idfiducia" })
  public idfiducia: number;
  
  @column({  columnName: "orden", serializeAs: "orden" })
  public orden: number;
  
  @column({  columnName: "modalidad", serializeAs: "modalidade" })
  public modalidade: number;
}
