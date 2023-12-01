import Database from "@ioc:Adonis/Lucid/Database";
import { controlSelectConsolidado, controlSelectFilter } from "App/Interfaces/ControlSelectInterface";
import ControlSelectConsolidateModel from "App/Models/ControlSelectConsolidate";
import ResourcePrioritization from "App/Models/ResourcePrioritization";

export interface IControlSelectRepository {
    getInfoConsolidate(payload: controlSelectFilter): Promise<any>
    getInfoBeforeCreate(payload: controlSelectFilter): Promise<any>
    createInfoConsolidado(payload: controlSelectConsolidado): Promise<any>
    updateinfoConsolidado(payload: controlSelectConsolidado): Promise<any>
}

export default class ControlSelectRepository implements IControlSelectRepository {
    constructor() { }

    async getInfoConsolidate(payload: controlSelectFilter) {
        if (payload.idControlSelect == 1) {
            const queryControlSelect = ControlSelectConsolidateModel.query()
                .preload("resourcePrioritization")
            queryControlSelect.whereHas("resourcePrioritization", (sub) => sub.where("projectNumber", payload.noProject))
            let res = await queryControlSelect.paginate(1, 100)
            if (res) {
                const { data } = res.serialize()
                if (data.length <= 0) {
                    const queryResourcePrioritization = ResourcePrioritization.query()
                    queryResourcePrioritization.where("projectNumber", payload.noProject)
                    queryResourcePrioritization.where("programId", 1)
                    queryResourcePrioritization.where("validity", payload.validity)
                    const res = await queryResourcePrioritization.paginate(1, 100)
                    const { data } = res.serialize()
                    await Promise.all(data.map(async (data) => {
                        let query = `select COUNT(DISTINCT documento_beneficiario) legalizado, SUM(total_proyectado) otorgado
                        from giro_vwbeneficiario_proyec_renova_giro 
                        where comunagiros IN ( (${data.communeId}*1000) + 123, (${data.communeId}*1000) + 456)
                        and perido_legalizacion  = '${payload.valueConvocatoria}'`
                        const dataBase = await Database.connection("mysql_sapiencia").rawQuery(query)

                        let dataInsert = {
                            "idResourcePrioritization": data.id,
                            "announcement": payload.valueConvocatoria,
                            "consolidatedPreselected": 0,
                            "consolidatedResourceAvailable": data.resourceForCredit,
                            "consolidatedGranted": dataBase[0][0].otorgado,
                            "consolidatedLegalized": dataBase[0][0].legalizado,
                            "consolidatedFinancialReturns": data.financialPerformances,
                            "places": data.places,
                            "validity": payload.validity
                        }
                        this.createInfoConsolidado([dataInsert])
                    }))
                }
            }
        }
    }

    async getInfoBeforeCreate(payload: any) {
        const queryControlSelect = ControlSelectConsolidateModel.query()
            .preload("resourcePrioritization")
        queryControlSelect.whereHas("resourcePrioritization", (sub) => sub.where("projectNumber", payload.noProject))
        const res = await queryControlSelect.paginate(1, 100)
        const { data, meta } = res.serialize()
        return { array: data, meta }
    }

    async createInfoConsolidado(payload: any) {
        return await ControlSelectConsolidateModel.createMany(payload)
    }

    async updateinfoConsolidado(payload: any) {
        const id = payload.id!
        if (payload.ResourcePrioritization) {
            payload.ResourcePrioritization!.map(data => {
                const RP = ResourcePrioritization
                let id = data.id
                let payload: any = {
                    places: data.place
                }
                RP.updateOrCreate({ id }, payload)

                return RP
            })
        }
        let data = {
            consolidatedPreselected: payload.consolidatedPreselected,
            consolidatedResourceAvailable: payload.consolidatedResourceAvailable,
            consolidatedGranted: payload.consolidatedGranted,
            consolidatedLegalized: payload.consolidatedLegalized,
            consolidatedFinancialReturns: payload.consolidatedFinancialReturns,
        }
        return await ControlSelectConsolidateModel.updateOrCreate({ id }, data)
    }
}