import { HttpContext } from '@adonisjs/core/build/standalone';
import ControlSelectProvider from "@ioc:core.ControlSelectProvider"
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { controlSelectFilter } from 'App/Interfaces/ControlSelectInterface';
import { ApiResponse } from 'App/Utils/ApiResponses';
import { DBException } from 'App/Utils/DbHandlerError';
import { controlSelectSchema } from 'App/Validators/ControlSelectValidator';
export default class ControlSelectController {

    public async getInfo(ctx: HttpContext) {
        const { request, response, logger } = ctx;
        const payload = request.body()
        try {
            const res = await ControlSelectProvider.getinfo(payload)

            return response.ok(res)
        } catch (err) {
            logger.error(err);
            const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
            return response.badRequest(apiResp);
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
        let payload: controlSelectFilter
        try {
            payload = await request.validate({ schema: controlSelectSchema })
        } catch (err) {
            return DBException.badRequest(ctx, err);
        }
        try {
            const res = await ControlSelectProvider.getInfopay(payload)

            return response.ok(res)
        } catch (err) {
            logger.error(err);
            const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
            return response.badRequest(apiResp);
        }
    }

}