import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SpinsBeneficiariesConsolidateProvider from "@ioc:core.SpinsBeneficiariesConsolidateProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import { ISpinsBeneficiary } from '../../Interfaces/SpinsBeneficiaryInterfaces';

export default class SpinsBeneficiaryController {

  /**
   *
   * @Body_de_la_petición
   * page?: number;
     perPage?: number;
     userId?: number;
     documentNumber?: string
   *
   */

  public async spinsSearch1({ request, response }: HttpContextContract) {

    try {

      const body = request.body() as ISpinsBeneficiary;
      return response.send(
        await SpinsBeneficiariesConsolidateProvider.spinsSearch1( body )
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }

  }

  public async spinsSearch2({ request, response }: HttpContextContract) {

    try {

      const body = request.body() as ISpinsBeneficiary;
      return response.send(
        await SpinsBeneficiariesConsolidateProvider.spinsSearch2( body )
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }

  }

  public async spinsSearch3({ request, response }: HttpContextContract) {

    try {

      const body = request.body() as ISpinsBeneficiary;
      return response.send(
        await SpinsBeneficiariesConsolidateProvider.spinsSearch3( body )
      );
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }

  }


}
