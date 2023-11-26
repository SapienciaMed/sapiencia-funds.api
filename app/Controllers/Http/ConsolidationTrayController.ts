import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SapienciaProvider from "@ioc:core.SapienciaProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import { IConsolidationTrayForTechnicianCollection,
         IConsolidationTrayForTransactions } from '../../Interfaces/ConsolidationTrayInterface';

export default class ConsolidationTrayController {

  public async geConsolidationTrayTechnicianCollection({ request, response }: HttpContextContract) {

    try {

      const data = request.body() as IConsolidationTrayForTechnicianCollection;
      return response.send(await SapienciaProvider.geConsolidationTrayTechnicianCollection(data));

    } catch (err) {

      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );

    }

  }

  public async getCutsForConsolidationTray({ response }: HttpContextContract) {

    try {

      return response.send(await SapienciaProvider.getCutsForConsolidationTray());

    } catch (err) {

      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );

    }

  }

  public async geConsolidationTrayTechnicianCollectionByCut({ request, response }: HttpContextContract) {

    try {

      const data = request.body() as IConsolidationTrayForTechnicianCollection;
      return response.send(await SapienciaProvider.geConsolidationTrayTechnicianCollectionByCut(data));

    } catch (err) {

      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );

    }

  }

  public async geBeneficiaryById({ request, response }: HttpContextContract) {

    try {

      const { id } = request.params();
      return response.send(await SapienciaProvider.geBeneficiaryById(id));

    } catch (err) {

      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );

    }

  }

  public async updateCutBeneficiary({ request, response }: HttpContextContract) {

    try {

      const data = request.body() as IConsolidationTrayForTransactions;
      return response.send(await SapienciaProvider.updateCutBeneficiary(data));

    } catch (err) {

      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );

    }

  }

}
