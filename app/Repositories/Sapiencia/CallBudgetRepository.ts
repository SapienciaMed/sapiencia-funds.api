import Database from "@ioc:Adonis/Lucid/Database";
import { ICommuneResource } from "App/Interfaces/AbsorptionPercentage";
import { ICallBudget } from "App/Interfaces/CallBudgetInterfaces";
import {
  ILegalizedItem,
  ILegalizedPaginatedFilters,
  ILegalizedPayload,
} from "App/Interfaces/Legalized";
import CallBudget from "App/Models/Sapiencia/Callbudget";
import { DATABASE_NAMES } from "App/Utils/helpers";

export interface ICallBudgetRepository {
  getAllCallBudget(): Promise<ICallBudget[]>;
  getAllCommuneResources(): Promise<ICommuneResource[]>;
  getResourceByCommuneId(communeId: number): Promise<ICommuneResource>;
  getCommuneBudgetByPeriod(
    filters: ILegalizedPaginatedFilters
  ): Promise<ILegalizedItem[]>;
  updateCommuneBudget(payload: ILegalizedPayload): Promise<boolean>;
}

export default class CallBudgetRepository implements ICallBudgetRepository {
  public async getAllCallBudget(): Promise<ICallBudget[]> {
    const res = await CallBudget.query();
    return res.map((i) => i.serialize() as ICallBudget);
  }
  public async getAllCommuneResources() {
    const query = "CALL getCommuneResources";
    const resp = await Database.connection(DATABASE_NAMES.SAPIENCIA).rawQuery(
      query
    );
    return resp?.[0]?.[0]?.filter((el: ICommuneResource) => el.recurso !== "0");
  }
  public async getResourceByCommuneId(communeId: number) {
    const query = `CALL getResourceByCommune(${communeId})`;
    const resp = await Database.connection(DATABASE_NAMES.SAPIENCIA).rawQuery(
      query
    );
    const resourceFound = resp?.[0]?.[0];
    if (resourceFound?.length === 0) {
      throw new Error("No se ha encontrado un recurso para esta comuna");
    }
    return resourceFound?.[0];
  }
  // GET COMMUNE BUDGET BY PERIOD
  public async getCommuneBudgetByPeriod(filters: ILegalizedPaginatedFilters) {
    const { announcementId } = filters;
    /*
      DELIMITER //
      CREATE PROCEDURE getCommuneBudgetByPeriod(IN period INT)
      BEGIN
        SELECT
          callg_control_presupuesto_comuna_fidu.comuna as communeFundId,
          callg_control_presupuesto_comuna_fidu.presupuesto_comuna as resource,
          callg_control_presupuesto_comuna_fidu.idfiducia as fiduciaryId,
          callg_control_presupuesto_comuna_fidu.orden as `order`,
          callg_control_presupuesto_comuna_fidu.periodo as announcementId,
          fidu_fiducia.numcontrato as `fiduciaryName`
        FROM callg_control_presupuesto_comuna_fidu
        INNER JOIN fidu_fiducia 
        ON callg_control_presupuesto_comuna_fidu.idfiducia = fidu_fiducia.idfiducia
        WHERE callg_control_presupuesto_comuna_fidu.periodo = period;
      END //
    */
    const query = `CALL getCommuneBudgetByPeriod(${announcementId});`;
    const resp = await Database.connection(DATABASE_NAMES.SAPIENCIA).rawQuery(
      query
    );
    return resp?.[0]?.[0];
  }
  // UPDATE COMMUNE BUDGET
  public async updateCommuneBudget(payload: ILegalizedPayload) {
    try {
      const { announcementId, communeFundId, fiduciaryId, order, resource } =
        payload;
      // const query = `
      //   UPDATE callg_presupuesto_comuna_legalizacion
      //   SET recurso_comuna = ?, orden = ?
      //   WHERE periodo = ? AND comuna = ? AND idfiducia = ?
      //   AND NOT EXISTS
      //     (SELECT 1 FROM
      //       (SELECT 1 FROM callg_presupuesto_comuna_legalizacion) AS t
      //       WHERE periodo = ? AND comuna = ? AND idfiducia = ? AND orden = ?)
      // `;
      const query = `
        UPDATE callg_presupuesto_comuna_legalizacion
        SET recurso_comuna = ?, orden = ?
        WHERE periodo = ? AND comuna = ? AND idfiducia = ?
      `;
      const resp = await Database.connection(DATABASE_NAMES.SAPIENCIA).rawQuery(
        query,
        [resource, order, announcementId, communeFundId, fiduciaryId]
      );
      return resp?.[0]?.changedRows > 0;
    } catch (err) {
      console.log(err);
      throw new Error("Error al actualizar presupuesto comuna");
    }
  }
}
