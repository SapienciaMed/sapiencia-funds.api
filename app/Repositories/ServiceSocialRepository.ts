
import AuroraEpmRenovado from "App/Models/Sapiencia/AuroraEpmRenovado";
import AuroraPpRenovado from "App/Models/Sapiencia/AuroraPpRenovado";
import ServiceSocialBeneficiary from "App/Models/ServiceSocialBeneficiary";


export interface IServiceSocialRepository {   
    import(): Promise<any[]>;    
    consultPP(): Promise<any[]>;    
    consultEpm(): Promise<any[]>;    
    insert(data:any): Promise<any[]>;    
    validate(consolidationBeneficiary: string,legalizationPeriod: string,hoursBorrowed:string): Promise<any | null>;
}

export default class ServiceSocialRepository implements IServiceSocialRepository {

    constructor() { }  

    async import(): Promise<any[]> {
       const dataAuroraPpRenovado = await AuroraPpRenovado.query().limit(10);
        return dataAuroraPpRenovado.map((i) => i.serialize() as any);         
    }


    async consultPP(): Promise<any[]> {
       const dataAuroraPpRenovado = await AuroraPpRenovado.query().limit(10);
        return dataAuroraPpRenovado.map((i) => i.serialize() as any);         
    }

    async consultEpm(): Promise<any[]> {
       const dataAuroraepmRenovado = await AuroraEpmRenovado.query().limit(10);
        return dataAuroraepmRenovado.map((i) => i.serialize() as any);         
    }

    async validate(consolidationBeneficiary: string, legalizationPeriod: string, hoursBorrowed: string): Promise<any | null> {
        console.log(consolidationBeneficiary,legalizationPeriod,hoursBorrowed)

        const data = await ServiceSocialBeneficiary.query()
            .where('consolidationBeneficiary', consolidationBeneficiary)            
            .where('legalizationPeriod', legalizationPeriod)            
            .where('hoursBorrowed', hoursBorrowed)            
            .first();
        console.log(data)
        return data?.serialize() as any;
    }
    


    


    async insert(data: {legalizationPeriod: string;consolidationBeneficiary: number; hoursBorrowed: number;supportDocumentRoute: string} []): Promise<any[]> {
        // Inserta los datos en la base de datos usando el modelo
        const insertedItems = await ServiceSocialBeneficiary.createMany(data);

        // Retorna los elementos insertados
        return insertedItems;
    }

    

}