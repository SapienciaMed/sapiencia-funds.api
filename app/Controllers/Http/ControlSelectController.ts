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
        let payload: controlSelectFilter
        try {
            payload = await request.validate({ schema: controlSelectSchema })
        } catch (err) {
            return DBException.badRequest(ctx, err);
        }
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

        try {
            const res = await ControlSelectProvider.updateinfoConsolidado(payload)
            return response.ok(res)
        } catch (err) {
            logger.error(err);
            const apiResp = new ApiResponse(null, EResponseCodes.FAIL, err.message);
            return response.badRequest(apiResp);
        }
    }

}