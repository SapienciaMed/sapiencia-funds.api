import Database from "@ioc:Adonis/Lucid/Database";
import { IRemnant, IRemnantFilters, IRemnantUpdate } from "App/Interfaces/IRemnantInterface";
import Remanente from "App/Models/Remanente";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IRemnantRepository {
  getallRemnantsPaginated(filters: IRemnantFilters): Promise<IPagingData<IRemnant>>;
  getRemnantById(id: number): Promise<IRemnant | null>;
  updateRemnan(id: number, remnant: IRemnantUpdate): Promise<IRemnant | null>;
  deleteRemnan(id: number): Promise<boolean>;
  importRemnants(filters: IRemnantFilters): Promise<any>;
}

export default class RemnantRepository implements IRemnantRepository {

  constructor() { }

  async getallRemnantsPaginated(filters: IRemnantFilters): Promise<IPagingData<IRemnant>> {

    const res = Remanente.query();

    if (filters.announcement) {
      res.where("announcement", `${filters.announcement}`);
    }
    if (filters.fund) {
      res.where("communityFund", `${filters.fund}`);
    }
    if (filters.trust) {
      res.where("trust", `${filters.trust}`);
    }

    const workerMasterActivityPaginated = await res.paginate(
      filters.page,
      filters.perPage
    );

    const { data, meta } = workerMasterActivityPaginated.serialize();
    const dataArray = data ?? [];

    // Modificación aquí
    const modifiedArray = dataArray.map((item) => {     
    
      const quotas = Number(item.remaining) / Number(item.averageCost);
      const quotaResource =  ( Number(item.remaining) / Number(item.averageCost)) * Number(item.averageCost);
      const residual = parseFloat(item.remaining) - parseFloat(item.quotaResource);      

      return {
        ...item,
        remaining: Number(item.remaining),
        averageCost: Number(item.averageCost),
        quotas,  
        quotaResource,      
        residual,
        
        
      };
    });

    return {
      array: modifiedArray as unknown as IRemnant[],
      meta,
    };


  }

  async importRemnants(filters: IRemnantFilters): Promise<any> {
    const data = await Database.connection("mysql_sapiencia").rawQuery(
      "call aurora_remanentes (:periodo,:comuna,:idfiducia)",
      {
        periodo: filters.announcement,
        comuna: filters.fund,
        idfiducia: filters.trust,
      }
    );

    const results = data[0][0];

    // Insertar cada fila en el modelo Remanente, asignando propiedades manualmente
    const insertPromises = results.map(async (row) => {

      const remanenteData = {
        announcement: row.periodo,
        trust: row.idfiducia,
        communityFund: row.comuna,
        remaining: row.restante_presupuesto_comuna,
        averageCost: row.presupuesto_comuna,
        quotas: row.numero_usuarios_comuna,
        quotaResource: row.acumulado_legali_comuna,
        residual: row.puntaje_corte,
        idProgram: row.modalidad,
        userCreate: process.env.CURRENT_USER_DOCUMENT,
        dateCreate: new Date()
      };

      // Inserta el objeto en la base de datos
      return await Remanente.create(remanenteData);
    });

    // Esperar a que todas las inserciones se completen
    await Promise.all(insertPromises);

    return results;
  }

  async getRemnantById(id: number): Promise<IRemnant | null> {
    const res = await Remanente.find(id);
    if (res) {
      return res.serialize() as IRemnant;
    }
    return null;
  }

  async updateRemnan(id: number, remnant: IRemnantUpdate): Promise<IRemnant | null> {
    const toUpdate = await Remanente.find(id);

    if (!toUpdate) {
      return null;
    }

    toUpdate.remaining = Number(remnant.remaining);
    toUpdate.averageCost = Number(remnant.averageCost);
    
    toUpdate.communityFund = remnant.communityFund;    
    toUpdate.quotas = remnant.quotas;
    toUpdate.quotaResource = remnant.quotaResource;
    toUpdate.residual = remnant.residual;


    await toUpdate.save();
    return toUpdate.serialize() as IRemnant;
  }

  async deleteRemnan(id: number): Promise<boolean> {
    const toDelete = await Remanente.find(id);

    if (!toDelete) {
      return false;
    }

    await toDelete.delete();
    return true;
  }

}