//import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';
import Mail from "@ioc:Adonis/Addons/Mail";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IEmailService {
  emailNotification(data: {
    commune: string;
    validity: string;
    information: string;
    User: string;
  }, emails: string[]): Promise<ApiResponse<boolean | null>>;
}

export default class EmailService implements IEmailService {
  async emailNotification(data: {
    commune: string;
    validity: string;
    information: string;
    User: string;
    fileName: string;
  }, emails: string[]): Promise<ApiResponse<boolean | null>> {
    try {
      for (const email of emails) {
        await Mail.send((message) => {
          message
            .from("sapiencia@example.com")
            .to(email)
            .subject("Cargar información")
            .html(
              `
              <html>
              <head>
              </head>
              
              <body>
                  <div class="email-notification" style="width: 1440px; height: 1024px; background-color: #E2E2E2;">
                      <div class="header" style="width: 1440px; height: 100px; display: flex; justify-content: center; align-items: center; padding: 10px;">
                          <img src="https://imagizer.imageshack.com/img924/6985/TW5Ygs.png" alt="Logo de la empresa" style="display: block; margin: 0 auto;">
                      </div>
                      <div class="card" style="width: 600px; height: 443px; background-color: #ffffff; max-width: 600px; margin: 0 auto; top: 100px; left: 419px;">
                          <div class="hero" style="background-color: #5E3893; width: 580px; height: 126px; display: flex; justify-content: center; align-items: center; padding: 10px;">
                              <img src="https://imagizer.imageshack.com/img923/5251/BGo4Au.png" style="display: block; margin: 0 auto;">
                          </div>
                          <div class="content" style="width: 599px; height: 317px; padding: 54px;">
                              <h1 class="card-title" style="width: 471px; height: 26px; text-align: center; font-size: 29px; font-weight: bold; font-family: 'Rubik', sans-serif;">Cargar información</h1>
                              <p class="card-text" style="width: 471px; height: 57px; font-size: 17px; font-weight: 300; font-family: 'Rubik', sans-serif; line-height: 20.4px;">La gestión territorial ha cargado la información de la comuna ${data.commune} y vigencia ${data.validity} para la elaboración de ficha. El nombre del archivo es ${data.fileName}.</p>
                              <div class="button-container">
                                  <a href="#" style="display: flex; justify-content: center; align-items: center; text-decoration: none; width: 126px; height: 43px; border-radius: 100px; background-color: #5E3893; font-size: 16px; color: #fff; font-family: 'Rubik', sans-serif;">Consultar</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </body>
              </html>
                                
              `
            )

        });
      }

      return new ApiResponse(true, EResponseCodes.OK);
    } catch (error) {
      console.error("Error al enviar correos:", error);
      return new ApiResponse(null, EResponseCodes.FAIL, "Error al enviar correos");
    }
  }

}