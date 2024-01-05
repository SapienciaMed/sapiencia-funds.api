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

   /*  const res = Remanente.query();

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
      const residual = Number(item.remaining) - quotaResource;   

      
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
 */

    const data = [
      {
        id: 123,
        announcement: 456,
        creditLine: "Linea de Crédito Ejemplo",
        contract: 789,
        numberOfBenefits: 10,
        contractInvestmentValue: 50000,
        projectedValue: 75000,
        ProjectedCommittedValue: 60000,
        surplusValue: 15000,
        turned: 5000,
        pendingToBeTurnedCommitted: 10000,
        projectedSlopeToTurn: 8000,
        resourcesWithoutExecution: 20000,
        userModified: "797940",
        dateModified: "2024-01-04",
        userCreate: "797940",
        dateCreate: "2023-12-25"
      }
    ]
    
//70.000 55.000
    const arrayData = data.map((item) => {
      const surplusValue = item.projectedValue - item.ProjectedCommittedValue;
      const pendingToBeTurnedCommitted = item.ProjectedCommittedValue - item.turned;
      const projectedSlopeToTurn = item.projectedValue - item.turned;
      const resourcesWithoutExecution = item.contractInvestmentValue - item.turned - pendingToBeTurnedCommitted;


      return {
        ...item,
        surplusValue,
        pendingToBeTurnedCommitted,
        projectedSlopeToTurn,
        resourcesWithoutExecution
        
        
      };
    })




    return {
      array: [arrayData] as unknown as any[], // Convertimos data en un array ya que parece que se espera un array
      meta: {
        total: 1,
        perPage: 1,
        currentPage: 1
       
      }
    
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

    /* toUpdate.remaining = Number(remnant.remaining);
    toUpdate.averageCost = Number(remnant.averageCost);
    
    toUpdate.communityFund = remnant.communityFund;    
    toUpdate.quotas = remnant.quotas;
    toUpdate.quotaResource = remnant.quotaResource;
    toUpdate.residual = remnant.residual; */
    toUpdate.userModified = String(process.env.CURRENT_USER_DOCUMENT);


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