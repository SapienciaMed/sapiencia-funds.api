import Database from "@ioc:Adonis/Lucid/Database";
import { controlSelectConsolidado, controlSelectFilter, controlSelectFilterPag } from "App/Interfaces/ControlSelectInterface";
import ControlSelectConsolidateModel from "App/Models/ControlSelectConsolidate";
import ControlSelectLegalization from "App/Models/ControlSelectLegalization";
import ResourcePrioritization from "App/Models/ResourcePrioritization";

export interface IControlSelectRepository {
    getInfopay(payload: controlSelectFilter): Promise<any>
    getInfoConsolidate(payload: controlSelectFilter): Promise<any>
    getInfoLegalization(payload: controlSelectFilter): Promise<any>
    getInfoBeforeCreate(payload: controlSelectFilter): Promise<any>
    createInfoConsolidado(payload: controlSelectConsolidado): Promise<any>
    updateinfoConsolidado(payload: controlSelectConsolidado): Promise<any>

}

export default class ControlSelectRepository implements IControlSelectRepository {
    constructor() { }

    async getInfoConsolidate(payload: controlSelectFilter) {

        const queryControlSelect = ControlSelectConsolidateModel.query()
            .preload("resourcePrioritization")
        queryControlSelect.whereHas("resourcePrioritization", (sub) => sub.where("projectNumber", payload.noProject!))
        queryControlSelect.where("validity", payload.validity!)
        queryControlSelect.where("announcement", payload.idConvocatoria!)
        let res = await queryControlSelect.paginate(1, 100)
        if (res) {
            const { data } = res.serialize()
            if (data.length <= 0) {
                const queryResourcePrioritization = ResourcePrioritization.query()
                queryResourcePrioritization.where("projectNumber", payload.noProject!)
                queryResourcePrioritization.where("programId", 1)
                queryResourcePrioritization.where("validity", payload.validity!)
                const res = await queryResourcePrioritization.paginate(1, 100)
                const { data } = res.serialize()
                await Promise.all(data.map(async (data) => {
                    let query = `select COUNT(DISTINCT documento_beneficiario) legalizado, SUM(total_proyectado) otorgado
                        from giro_vwbeneficiario_proyec_renova_giro 
                        where comunagiros IN ( (${data.communeId}*1000) + 123, (${data.communeId}*1000) + 456)
                        and id_perido_legalizacion  = '${payload.idConvocatoria}' AND id_fondo = 1`
                    const dataBase = await Database.connection("mysql_sapiencia").rawQuery(query)

                    let dataInsert = {
                        "idResourcePrioritization": data.id,
                        "announcement": payload.idConvocatoria,
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
        let data = {
            consolidatedPreselected: payload.consolidatedPreselected,
            consolidatedResourceAvailable: payload.consolidatedResourceAvailable,
            consolidatedGranted: payload.consolidatedGranted,
            consolidatedLegalized: payload.consolidatedLegalized,
            places: payload.places
        }
        return await ControlSelectConsolidateModel.updateOrCreate({ id }, data)
    }

    async getInfoLegalization(payload: controlSelectFilter) {
        const query = ControlSelectLegalization.query()
        query.where('announcement', payload.idConvocatoria!)

        let res = await query.paginate(1, 100)
        const { data, meta } = res.serialize()

        if (data.length <= 0) {
            let query = `SELECT nombrefondo AS programa,COUNT(DISTINCT documento_beneficiario) legalizado, SUM(total_proyectado) otorgado
            FROM giro_vwbeneficiario_proyec_renova_giro
            WHERE id_perido_legalizacion = ${payload.idConvocatoria}
            GROUP BY nombrefondo`;
            const dataBase = await Database.connection("mysql_sapiencia").rawQuery(query)

            await Promise.all(dataBase[0].map(async (data) => {
                let dataInset = {
                    "program": data.programa,
                    "announcement": payload.idConvocatoria,
                    "Availableresources": 0,
                    "Preselected": 0,
                    "Granted": data.otorgado,
                    "Legalized": data.legalizado,
                    "places": 0,
                }
                ControlSelectLegalization.createMany([dataInset])
            }))

            const queryRe = ControlSelectLegalization.query()
            queryRe.where('announcement', payload.idConvocatoria!)

            let res = await queryRe.paginate(1, 100)
            const { data, meta } = res.serialize()

            return { array: data, meta }

        } else {
            return { array: data, meta }
        }
    }

    async updateInfoLegalization(payload: any) {
        const id = payload.id!

        let data = {
            Availableresources: payload.Availableresources,
            places: payload.places,
            Preselected: payload.Preselected,
            Granted: payload.Granted,
            Legalized: payload.Legalized,
        }

        return await ControlSelectLegalization.updateOrCreate({ id }, data)
    }

    async getInfoControl(payload: controlSelectFilter) {
        const { id_comuna, idConvocatoria } = payload;

        const idComunaArray = Array.isArray(id_comuna) ? id_comuna : [id_comuna];

        let querySapiencia = `call AuroraControlSelectControl('${idConvocatoria}','${idComunaArray.join(",")}')`

        const result = await Database.connection("mysql_sapiencia").rawQuery(querySapiencia);

        const data = result[0][0];

        return { array: data }
    }

    async getInfopay(payload: controlSelectFilterPag) {
        if (payload.idControlSelect == 5) {
            const { validity } = payload;
            const query = `call AuroraControlFinancieroPagare('${validity}')`;
            const result = await Database.connection("mysql_sapiencia").rawQuery(query);

            // Suponiendo que result contiene un arreglo de resultados
            const data = result[0];

            // Extrae el subarreglo necesario sin modificar el original
            const cleanedData = data.map(entry => entry);

            const { page, perPage } = payload;

            // Realiza la paginación manualmente
            const start = (page - 1) * perPage;
            const end = start + perPage;
            const paginatedData = cleanedData.slice(start, end);

            const meta = {
                total: cleanedData.length,
                per_page: perPage,
                current_page: page,
                last_page: Math.ceil(cleanedData.length / perPage),
            };

            return { array: cleanedData as controlSelectFilterPag[], meta };
        }

    }

}