import { HttpContext } from '@adonisjs/core/build/standalone';
import ControlSelectProvider from "@ioc:core.ControlSelectProvider"
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { controlSelectFilterPag, controlSelectFilter } from 'App/Interfaces/ControlSelectInterface';
import { ApiResponse } from 'App/Utils/ApiResponses';
import { DBException } from 'App/Utils/DbHandlerError';
import { controlSelectSchema } from 'App/Validators/ControlSelectValidator';
import Strautm123UpdateValidator from 'App/Validators/UpdateStratum123Validators';
import { generateExcel } from "App/Utils/generateXLSX"

export default class ControlSelectController {

    public async getInfoConsolidate(ctx: HttpContext) {
        const { request, response, logger } = ctx;
        const payload = request.body()
        try {
            const res = await ControlSelectProvider.getinfoConsolidate(payload)

            return response.ok(res)
        } catch (err) {
            logger.error(err);
            const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
            return response.badRequest(apiResp);
        }
    }


    public async getInfoEstratos123(ctx: HttpContext) {
        const { request, response, logger } = ctx;
        let payload: controlSelectFilter
        try {
            payload = await request.validate({ schema: controlSelectSchema })
        } catch (err) {
            return DBException.badRequest(ctx, err);
        }
        try {
            const res = await ControlSelectProvider.getInfoEstratos123(payload)

            return response.ok(res)
        } catch (err) {
            logger.error(err);
            const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
            return response.badRequest(apiResp);
        }
    }

    public async getInfoEstratos123Xlsx(ctx: HttpContext) {
        const { request, response, logger } = ctx;
        let payload: controlSelectFilter
        try {
            payload = await request.validate({ schema: controlSelectSchema })
        } catch (err) {
            return DBException.badRequest(ctx, err);
        }
        try {
            const res = await ControlSelectProvider.getInfoEstratos123Xlsx(payload)
            const responsexlsx = await generateExcel(res.data.array);
            response.send(new ApiResponse(responsexlsx, EResponseCodes.OK));

        } catch (err) {
            logger.error(err);
            const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
            return response.badRequest(apiResp);
        }
    }

    public async updateStratum123({ response, request }: HttpContext) {
        try {
            const { id } = request.params();
            const payload = await request.validate(Strautm123UpdateValidator);

            return response.send(
                await ControlSelectProvider.updateStratum123(id, payload)
            );
        } catch (err) {
            response.badRequest(
                new ApiResponse(null, EResponseCodes.FAIL, String(err))
            );
        }
    }

    public async createInfoConsolidado(ctx: HttpContext) {
        const { request, response, logger } = ctx;
        let payload = request.body()

        try {
            const res = await ControlSelectProvider.createInfoConsolidado(payload)
            return response.ok(res)
        } catch (err) {
            logger.error(err);
            const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
            return response.badRequest(apiResp);
        }
    }

    public async updateinfoConsolidado(ctx: HttpContext) {
        const { request, response, logger } = ctx;
        let payload = request.body()

        console.log(payload)
        try {
            const res = await ControlSelectProvider.updateinfoConsolidado(payload)
            return response.ok(res)
        } catch (err) {
            logger.error(err);
            const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
            return response.badRequest(apiResp);
        }
    }

    public async getInfoLegalization(ctx: HttpContext) {
        const { request, response, logger } = ctx;
        const payload = request.body()
        try {
            const res = await ControlSelectProvider.getInfoLegalization(payload)
            return response.ok(res)
        } catch (err) {
            logger.error(err);
            const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
            return response.badRequest(apiResp);
        }
    }

    public async getInfoControlSubtotales(ctx: HttpContext) {
        const { request, response, logger } = ctx;
        const payload = request.body()


        if (!Array.isArray(payload.id_comuna)) {
            payload.id_comuna = [Number(payload.id_comuna)];
        }
        const idComunaList = payload.id_comuna.join(',');

        payload.id_comuna = idComunaList;
        try {
            const res = await ControlSelectProvider.getInfoControlSubtotales(payload)
            return response.ok(res)
        } catch (err) {
            logger.error(err);
            const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
            return response.badRequest(apiResp);
        }
    }

    public async getInfoControl(ctx: HttpContext) {
        const { request, response, logger } = ctx;
        const payload = request.body()


        if (!Array.isArray(payload.id_comuna)) {
            payload.id_comuna = [Number(payload.id_comuna)];
        }
        const idComunaList = payload.id_comuna.join(',');

        payload.id_comuna = idComunaList;
        try {
            const res = await ControlSelectProvider.getInfoControl(payload)
            return response.ok(res)
        } catch (err) {
            logger.error(err);
            const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
            return response.badRequest(apiResp);
        }
    }

    public async updateInfoLegalization(ctx: HttpContext) {
        const { request, response, logger } = ctx;
        let payload = request.body()

        try {
            const res = await ControlSelectProvider.updateInfoLegalization(payload)
            return response.ok(res)
        } catch (err) {
            logger.error(err);
            const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
            return response.badRequest(apiResp);
        }
    }

    public async getInfopay(ctx: HttpContext) {
        const { request, response, logger } = ctx;
        let payload: controlSelectFilterPag
        try {
            payload = await request.validate({ schema: controlSelectSchema })
        } catch (err) {
            return DBException.badRequest(ctx, err);
        }

        console.log(payload)
        try {
            const res = await ControlSelectProvider.getInfopay(payload)

            return response.ok(res)
        } catch (err) {
            logger.error(err);
            const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
            return response.badRequest(apiResp);
        }
    }


    public async getInfoStratum456(ctx: HttpContext) {
        const { request, response, logger } = ctx;
        const payload = request.body()
        try {
            const res = await ControlSelectProvider.getInfoStratum456(payload)

            return response.ok(res)
        } catch (err) {
            logger.error(err);
            const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
            return response.badRequest(apiResp);
        }
    }

    public async updateInfoStratum456(ctx: HttpContext) {
        const { request, response, logger } = ctx;
        let payload = request.body()

        try {
            const res = await ControlSelectProvider.updateInfoStratum456(payload)
            return response.ok(res)
        } catch (err) {
            logger.error(err);
            const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
            return response.badRequest(apiResp);
        }
    }
}