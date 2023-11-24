import Master from "App/Models/Master";


export interface IServiceSocialRepository {   
    import(): Promise<any[]>;    
}

export default class ServiceSocialRepository implements IServiceSocialRepository {

    constructor() { }

  

    async import(): Promise<any[]> {
       const res = await Master.query();
        return res.map((i) => i.serialize() as any);         
    }

    

}