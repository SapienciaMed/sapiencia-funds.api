
import { IImportServiceSocial, IInsertServiceSocial, IValidateServiceSocial } from "App/Interfaces/ImportServiceSocialInterface";
import AuroraEpmRenovado from "App/Models/Sapiencia/AuroraEpmRenovado";
import AuroraPpRenovado from "App/Models/Sapiencia/AuroraPpRenovado";
import ServiceSocialBeneficiary from "App/Models/ServiceSocialBeneficiary";


export interface IServiceSocialRepository {   
    import(): Promise<IImportServiceSocial[]>;       
    insert(data:any): Promise<IInsertServiceSocial[]>;    
    validate(consolidationBeneficiary: string,legalizationPeriod: string,hoursBorrowed:string): Promise<IValidateServiceSocial | null>;
}

export default class ServiceSocialRepository implements IServiceSocialRepository {

    constructor() { }  

  /*   async import(): Promise<any[]> {
       const dataAuroraPpRenovado = await AuroraPpRenovado.query().limit(10);
        return dataAuroraPpRenovado.map((i) => i.serialize() as any);         
    } */

    async import(): Promise<IImportServiceSocial[]> {
        // Consulta para el modelo AuroraPpRenovado
        const dataAuroraPpRenovado = await AuroraPpRenovado.query().limit(10);
        const serializedDataAuroraPpRenovado = dataAuroraPpRenovado.map((item) => item.serialize());
    
        // Consulta para el modelo AuroraEpmRenovado
        const dataAuroraEpmRenovado = await AuroraEpmRenovado.query().limit(10);
        const serializedDataAuroraEpmRenovado = dataAuroraEpmRenovado.map((item) => item.serialize());
    
        // Combinando ambos conjuntos de datos en una sola lista
        const combinedData = [...serializedDataAuroraPpRenovado, ...serializedDataAuroraEpmRenovado];
    
        return combinedData;
    }
  

    async validate(consolidationBeneficiary: string, legalizationPeriod: string, hoursBorrowed: string): Promise<IValidateServiceSocial | null> {    
        try {
            // Construir la consulta base con las condiciones siempre presentes
            let query = ServiceSocialBeneficiary.query()
                .where('consolidationBeneficiary', consolidationBeneficiary)            
                .where('legalizationPeriod', legalizationPeriod);
    
            // Añadir la condición para hoursBorrowed solo si no es null ni undefined
            if (hoursBorrowed !== null && hoursBorrowed !== undefined) { // Esto cubre null y undefined, pero permite 0
                query = query.where('hoursBorrowed', Number(hoursBorrowed));
            }
    
            // Ejecutar la consulta
            const data = await query.first();

            // Devolver los datos serializados si existen
            return data?.serialize() as any;
        } catch (error) {
            console.error("Error en la función validate:", error);
            // Manejar el error como consideres necesario
            return null;
        }
    }

    async insert(data: {legalizationPeriod: string;consolidationBeneficiary: number; hoursBorrowed: number;supportDocumentRoute: string} []): Promise<IInsertServiceSocial[]> {
        // Inserta los datos en la base de datos usando el modelo
        const insertedItems = await ServiceSocialBeneficiary.createMany(data);

        // Retorna los elementos insertados
        return insertedItems;
    }    

}