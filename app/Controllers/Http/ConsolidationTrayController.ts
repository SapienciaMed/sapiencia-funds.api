import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SapienciaProvider from "@ioc:core.SapienciaProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import { IComplianceAssignment } from '../../Interfaces/ConsolidationTrayInterface';
import { IConsolidationTrayForTechnicianCollection,
         IConsolidationTrayForTransactions } from '../../Interfaces/ConsolidationTrayInterface';
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';

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

  public async getPQRSDFExternal({ request, response }: HttpContextContract) {

    try {

      const data = request.body() as IConsolidationTrayForTechnicianCollection;
      return response.send(await SapienciaProvider.getPQRSDFExternal(data));

    } catch (err) {

      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );

    }

  }

  public async getRequirementsByBeneficiary({ request, response }: HttpContextContract) {

    try {

      const data = request.body() as IConsolidationTrayForTechnicianCollection;
      return response.send(await SapienciaProvider.getRequirementsByBeneficiary(data));

    } catch (err) {

      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );

    }

  }

  public async getRequirementsByBeneficiaryList({ request, response }: HttpContextContract) {

    try {

      const data = request.body() as IConsolidationTrayForTechnicianCollection;
      return response.send(await SapienciaProvider.getRequirementsByBeneficiaryList(data));

    } catch (err) {

      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );

    }

  }

  public async complianceAssignmentBeneficiary({ request, response }: HttpContextContract) {

    try {

      const data = request.body() as IComplianceAssignment[];
      return response.send(await SapienciaProvider.complianceAssignmentBeneficiary(data));

    } catch (err) {

      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );

    }

  }

  public async uploadRequirementFile({ request, response }: HttpContextContract) {

    const files = request.files('files');
    const { id } = request.params();

    if( files ){

      const results = await Promise.all(
        files.map(async (file) => {
          if(file.tmpPath) {
            const fileUrl = await SapienciaProvider.uploadRequirementFile(file, `cargar-requisitos/${id}/`, id);
            return fileUrl;
          } else {
            return false;
          }
        })
      );

      const filesFailed: MultipartFileContract[] = [];

      results.forEach((result, index) => {
        if(!result) filesFailed.push(files[index]);
      });

      if(filesFailed.length > 0) {

        const filesFailedStr = filesFailed.map(item => item.clientName);
        return response.badRequest(
          new ApiResponse(true, EResponseCodes.WARN, `No se pudieron guardar el siguiente archivo: ${filesFailedStr.join(",")}`)
        );

      } else {

        return response.send(
          new ApiResponse(true, EResponseCodes.OK, "¡Archivo guardado exitosamente!")
        );

      }

    }else{

      response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String("No se proporciono el archivo para subir"))
      );

    }

  }

  public async getUploadFiles({ request, response }: HttpContextContract) {

    const { id } = request.params();
    try {

      return response.send(await SapienciaProvider.getUploadFiles(`cargar-requisitos/${id}/`));

    } catch (err) {

      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String("El requisito seleccionado no tiene adjuntos asociados"))
      );

    }
  }

  public async deleteUploadFiles({ request, response }: HttpContextContract) {

    const { id, beneficiary } = request.params();

    try {

      return response.send(await SapienciaProvider.deleteUploadFiles(`cargar-requisitos/${id}/`, beneficiary));

    } catch (err) {

      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String("El requisito seleccionado no tiene adjuntos asociados"))
      );

    }

  }

  public async dowloadUploadFiles({ request, response }: HttpContextContract) {

    const { id, beneficiary } = request.params();

    try {

      return response.send(await SapienciaProvider.dowloadUploadFiles(`cargar-requisitos/${id}/`, beneficiary));

    } catch (err) {

      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String("El requisito seleccionado no tiene adjuntos asociados"))
      );

    }

  }

}
