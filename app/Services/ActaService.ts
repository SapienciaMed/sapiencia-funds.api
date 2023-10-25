import Mail from "@ioc:Adonis/Addons/Mail";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IActa } from "App/Interfaces/ActaInterface";
import { ICitation } from "App/Interfaces/CitationInterface";
import { IActaRepository } from "App/Repositories/ActaRepository";
import { ApiResponse } from "App/Utils/ApiResponses";


export interface IActaService {
    createActa(acta: IActa): Promise<ApiResponse<IActa>>;
    noticacion(acta: ICitation): Promise<ApiResponse<boolean | null>>;
}

export default class ActaService implements IActaService {

    constructor(private actaRepository: IActaRepository) {}

    async createActa(acta: IActa): Promise<ApiResponse<IActa>> {
        const res = await this.actaRepository.createActa(acta);
        if (!res) {
            return new ApiResponse(
                {} as IActa,
                EResponseCodes.FAIL,
                "*Ocurrió un error en su Transacción "
            );
        }
        return new ApiResponse(res, EResponseCodes.OK);
    }
    



    async noticacion(data: ICitation): Promise<ApiResponse<boolean | null>> {
        const { email } = data;
    
        await Mail.send((message) => {
          message
            .from("sapiencia@example.com")
            .to(email!)
            .subject("Olvidaste tu contraseña,")
            .html(
              `
              <html>
                <head>
                  <style>              
                
    
                  </style>
                </head>
                </html>
                <body>
                  <div class="container">                     
                        <h1>prueba</h1>
                  </body>
                `
            )
    
        });
    
        return new ApiResponse(true, EResponseCodes.OK);
      }
}