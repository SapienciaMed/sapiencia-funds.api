import { STORAGE_POST_POLICY_BASE_URL } from "@google-cloud/storage/build/src/file";
import Database from "@ioc:Adonis/Lucid/Database";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { controlSelectConsolidado, controlSelectFilter, controlSelectFilterPag } from "App/Interfaces/ControlSelectInterface";
import { IGenericList } from "App/Interfaces/CoreInterfaces";
import { IStratum123UpdateItem } from "App/Interfaces/Stratum123Intrefaces";
import ControlSelectConsolidateModel from "App/Models/ControlSelectConsolidate";
import ControlSelectLegalization from "App/Models/ControlSelectLegalization";
import ControlSelectStratum123Model from "App/Models/ControlSelectStratum123";
import ControlSelectStratum456Model from "App/Models/ControlSelectStratum456";
import ResourcePrioritization from "App/Models/ResourcePrioritization";
import { ApiResponse } from "App/Utils/ApiResponses";
import CoreService from "../Services/External/CoreService"

export interface IControlSelectRepository {
    getInfoConsolidate(payload: controlSelectFilter): Promise<any>
    getInfoLegalization(payload: controlSelectFilter): Promise<any>
    getInfoEstratos123(payload: controlSelectFilter): Promise<any>
    getInfoEstratos123Xlsx(payload: controlSelectFilter): Promise<any>
    getInfoBeforeCreate(payload: controlSelectFilter): Promise<any>
    getInfoBeforeCreateEstratos123(payload: controlSelectFilter): Promise<any>
    getInfoBeforeCreateEstratos123Xlsx(payload: controlSelectFilter): Promise<any>
    createInfoConsolidado(payload: controlSelectConsolidado): Promise<any>
    createInfoEstratos123(payload: controlSelectConsolidado): Promise<any>
    updateinfoConsolidado(payload: controlSelectConsolidado): Promise<any>
    updateStratum123(id: number, payload: controlSelectConsolidado): Promise<any>
    getInfopay(payload: controlSelectFilter): Promise<any>
}

export default class ControlSelectRepository implements IControlSelectRepository {
    constructor() { }
    // Functions Consolidate
    async getInfoConsolidate(payload: controlSelectFilter) {
        const queryControlSelect = ControlSelectConsolidateModel.query()
            .preload("resourcePrioritization")
        queryControlSelect.whereHas("resourcePrioritization", (sub) => sub.where("projectNumber", payload.noProject!))
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
        queryControlSelect.where("validity", payload.validity!)
        queryControlSelect.where("announcement", payload.idConvocatoria!)
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
    // Functions Legalization
    async getInfoLegalization(payload: controlSelectFilter) {
        const query = ControlSelectLegalization.query()
        query.where('announcement', payload.idConvocatoria!)

        let res = await query.paginate(1, 100)
        const { data } = res.serialize()

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
        }
    }

    async getInfoLegalizationBeforeCreate(payload: any) {
        const query = ControlSelectLegalization.query()
        query.where('announcement', payload.idConvocatoria!)

        let res = await query.paginate(1, 100)
        const { data, meta } = res.serialize()

        return { array: data, meta }
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
    // Functions Control
    async getInfoControl(payload: controlSelectFilter) {
        const { id_comuna, idConvocatoria } = payload;

        const idComunaArray = Array.isArray(id_comuna) ? id_comuna : [id_comuna];

        let querySapiencia = `call AuroraControlSelectControl('${idConvocatoria}','${idComunaArray.join(",")}')`

        const result = await Database.connection("mysql_sapiencia").rawQuery(querySapiencia);

        const data = result[0][0];

        return { array: data }
    }

    async getInfoControlSubtotales(payload: controlSelectFilter) {
        const { id_comuna, idConvocatoria } = payload;

        const idComunaArray = Array.isArray(id_comuna) ? id_comuna : [id_comuna];

        let querySapiencia = `call AuroraControlSelectControlSubTotales('${idConvocatoria}','${idComunaArray.join(",")}')`

        const result = await Database.connection("mysql_sapiencia").rawQuery(querySapiencia);

        const data = result[0][0];

        return { array: data }
    }
    // Functions Pay
    async getInfopay(payload: controlSelectFilterPag) {
        const { idConvocatoria } = payload;
        const query = `call AuroraControlFinancieroPagare('${idConvocatoria}')`;
        const result = await Database.connection("mysql_sapiencia").rawQuery(query);

        // Suponiendo que result contiene un arreglo de resultados
        const data = result[0][0];

        // Extrae el subarreglo necesario sin modificar el original
        const cleanedData = data.map(entry => entry);

        const { page, perPage } = payload;

        // Realiza la paginación manualmente
        const start = (payload.page! - 1) * payload.perPage!;
        const end = start + payload.perPage!;
        const paginatedData = cleanedData.slice(start, end);

        console.log(paginatedData)
        const meta = {
            total: cleanedData.length,
            per_page: perPage,
            current_page: page,
            last_page: Math.ceil(cleanedData.length / payload.perPage!),
        };

        return { array: cleanedData as controlSelectFilterPag[], meta };


    }
    // Functions Stratum123
    async getInfoEstratos123(payload: controlSelectFilter) {
        if (payload.idControlSelect) {
            const queryControlSelectEstratos123 = ControlSelectConsolidateModel.query().preload("resourcePrioritization")
            queryControlSelectEstratos123.whereHas("resourcePrioritization", (sub) => sub.where("projectNumber", payload.noProject!))
            let res = await queryControlSelectEstratos123.paginate(1, 999999)
            if (res) {
                const { data } = res.serialize();
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
                        where comunagiros IN ( (${data.communeId}*1000) + 123)
                        and perido_legalizacion  = '${payload.idConvocatoria}' AND id_fondo = 1 `
                        const dataBase = await Database.connection("mysql_sapiencia").rawQuery(query)

                        let dataInsert = {
                            "idResourcePrioritization": data.id,
                            "announcement": payload.idConvocatoria,
                            "validity": payload.validity,
                            "resourceAvailable": data.resourceForCredit,
                            "granted": dataBase[0][0].otorgado,
                            "legalized": dataBase[0][0].legalizado
                        }
                        this.createInfoEstratos123([dataInsert])
                    }))
                }
            }
        }
    }

        async getInfoEstratos123Xlsx(payload: controlSelectFilter) {
        if (payload.idControlSelect) {
            const queryControlSelectEstratos123 = ControlSelectConsolidateModel.query().preload("resourcePrioritization")
            queryControlSelectEstratos123.whereHas("resourcePrioritization", (sub) => sub.where("projectNumber", payload.noProject!))
            let res = await queryControlSelectEstratos123.paginate(1, 999999)
            if (res) {
                const { data } = res.serialize();
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
                        where comunagiros IN ( (${data.communeId}*1000) + 123)
                        and perido_legalizacion  = '${payload.idConvocatoria}' AND id_fondo = 1 `
                        await Database.connection("mysql_sapiencia").rawQuery(query)

                    }))
                }
            }
        }
    }

    async getInfoBeforeCreateEstratos123(payload: any) {
        const queryControlSelect = ControlSelectStratum123Model.query()
            .preload("resourcePrioritization")
        queryControlSelect.whereHas("resourcePrioritization", (sub) => sub.where("projectNumber", payload.noProject))
        const res = await queryControlSelect.paginate(1, 100)
        const { data, meta } = res.serialize()
        return { array: data, meta }
    }

    async getInfoBeforeCreateEstratos123Xlsx(payload: any) {
        const queryControlSelect = ControlSelectStratum123Model.query()
            .preload("resourcePrioritization")
        queryControlSelect.whereHas("resourcePrioritization", (sub) => sub.where("projectNumber", payload.noProject))
        const res = await queryControlSelect.paginate(1, 100)
        const { data, meta } = res.serialize()
        let arraDataXlsx :any = [];

        const groupers = ["COMUNA_CORREGIMIENTO"];
        let arrComunas :any= [{}];
        const getListByG = new CoreService()
        const resComunas = await getListByG.getListByGroupers(groupers);
        resComunas.map(async(item) => {
            const list = {
            name: item.itemDescription,
            value: item.itemCode,
            };
            arrComunas.push(list)
            return list;
        })

        data.map((e) => {
            arraDataXlsx.push(
                {
                    "Comuna o corregimiento": arrComunas.find(obj => obj.value == e.resourcePrioritization.communeId)?.name,
                    "Recurso disponible": e.resourceAvailable,
                    "Otorgado": e.granted,
                    "Disponible": (Number(e.resourceAvailable) - Number(e.granted)),
                    "%Participación": ((Number(e.granted) / Number(e.resourceAvailable)) * 100),
                    "No. Legalizados": e.legalized
                }
            )
        })
        
        return { array: arraDataXlsx, meta }
    }

    async createInfoEstratos123(payload: any) {
        return await ControlSelectStratum123Model.createMany(payload)
    }

    async updateStratum123(id: number, payload: IStratum123UpdateItem) { 

        const toUpdate = await ControlSelectStratum123Model.find(id);
        
        if (toUpdate) {
            toUpdate.legalized = payload.legalized;
            toUpdate.resourceAvailable = payload.availableResource;
            toUpdate.granted = payload.granted;

            await toUpdate.save();

            return toUpdate.serialize() as IStratum123UpdateItem;
        } else {
            return {
                error: 'Ocurrió un error al actualizar la informacaión'
            }
        }



    // Functions Stratum456
    async getInfoStratum456(payload: controlSelectFilter) {
        const query = ControlSelectStratum456Model.query()
            .preload("resourcePrioritization")
        query.whereHas("resourcePrioritization", (sub) => sub.where("projectNumber", payload.noProject!))

        let res = await query.paginate(1, 100)
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
                        where comunagiros IN ((${data.communeId}*1000) + 456)
                        and id_perido_legalizacion  = '${payload.idConvocatoria}' AND id_fondo = 1`
                    const dataBase = await Database.connection("mysql_sapiencia").rawQuery(query)

                    let dataInsert = {
                        "idResourcePrioritization": data.id,
                        "announcement": payload.idConvocatoria,
                        "resourceAvailable": data.total123,
                        "granted": dataBase[0][0].otorgado,
                        "legalized": dataBase[0][0].legalizado,
                        "validity": payload.validity
                    }
                    this.createInfoStratum456([dataInsert])
                }))
            }
        }
    }

    async createInfoStratum456(payload: any) {
        return await ControlSelectStratum456Model.createMany(payload)
    }

    async getInfoBeforeCreateStratum456(payload: any) {
        const queryControlSelect = ControlSelectStratum456Model.query()
            .preload("resourcePrioritization")
        queryControlSelect.whereHas("resourcePrioritization", (sub) => sub.where("projectNumber", payload.noProject))
        queryControlSelect.where("validity", payload.validity!)
        queryControlSelect.where("announcement", payload.idConvocatoria!)
        const res = await queryControlSelect.paginate(1, 100)
        const { data, meta } = res.serialize()
        return { array: data, meta }
    }

    async updateInfoStratum456(payload: any) {
        const id = payload.id!

        let data = {
            resourceAvailable: payload.resourceAvailable,
            granted: payload.granted,
            legalized: payload.legalized
        }

        return await ControlSelectStratum456Model.updateOrCreate({ id }, data)
    }
}