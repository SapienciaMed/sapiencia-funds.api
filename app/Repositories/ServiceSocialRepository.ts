
import AuroraEpmRenovado from "App/Models/Sapiencia/AuroraEpmRenovado";


export interface IServiceSocialRepository {   
    import(): Promise<any[]>;    
}

export default class ServiceSocialRepository implements IServiceSocialRepository {

    constructor() { }

  

    async import(): Promise<any[]> {
       const res = await AuroraEpmRenovado.query();
        return res.map((i) => i.serialize() as any);         
    }

    

}