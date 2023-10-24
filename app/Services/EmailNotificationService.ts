//import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';
import Mail from "@ioc:Adonis/Addons/Mail";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IEmailService {
    emailNotification(emails: string[]): Promise<ApiResponse<boolean | null>>;
  }

export default class EmailService implements IEmailService {
    async emailNotification(emails: string[]): Promise<ApiResponse<boolean | null>> {
        try {
          for (const email of emails) {
            
            await Mail.send((message) => {
              message
                .from("sapiencia@example.com")
                .to(email)
                .subject("Asunto del correo")
                .html(
                    `
                    <html>
                      <head>
                        <style>
                        
                        body {
                          margin: 0;
                          padding: 0;
                          height: 100vh; 
                          display: flex; 
                          justify-content: center;
                          align-items: center;
                          background-color: #f0f0f0; 
                        }
                        
                        .container {
                          text-align: center;
                          width: 640px;
                        }
                        
                        .titulo {
                          
                          color: #533893;
                          font-family: "RubikMedium", sans-serif;
                        }
                        
                        .card { 
                          padding: 10px;  
                          align-items: center;
                          background-color: #FAF9F9;
                          width: 640px;
                          height: 120px;
                          flex-shrink: 0;
                          border-radius: 22px;  
                          font-family: "RubikMedium", sans-serif;
                          font-size: 20px;
                        }
                        
                        .text {
                          font-size: 20px;
                          font-family: "RubikMedium", sans-serif;
                        
                        }
                        
                        .tittle1 {  
                          font-family: "RubikMedium", sans-serif;
                          font-weight: bold;
                          font-size: 20px;
                        }
                        
                        .button {
                          display: inline-block;
                          padding: 10px 20px;
                          background-color: #533893; 
                          color: #ffffff !important; 
                          border: none; 
                          border-radius: 20px;  
                          cursor: pointer; 
                          font-size: 16px;                   
                          text-align: center;
                          font-family: "RubikMedium", sans-serif;
                          font-size: 16px;
                          font-style: normal;
                          font-weight: 600;
                          line-height: 120%;
                          text-decoration: none;
                        }
                        
                        .svg-container {
                          float: left;   
                        }
                        
                        .image-container {
                          float: right;                       
                        }
                        @media (max-width: 768px) {
                          .container {
                            padding: 10px; 
                          }
                        
                          .svg-container,
                          .image-container {
                            float: none; 
                            margin: 0; 
                            width: 100%; 
                          }
                        
                          .svg-container {
                            margin-bottom: 10px;
                          }
                          .button {
                            font-size: 18px; 
                            color: #FFFFFF;
                          }
                        .logos-r{
                          width: 150px;
                          height: 50px;
                        }
                        
                        }
          
                        </style>
                      </head>
                      </html>
                      <body>
                        <div class="container">
                            <img src="https://i.pinimg.com/originals/32/50/86/3250868d03afce054d836c4ab1922124.png" alt="Logo" />
                                <h1 class="titulo">Hola,</h1>
          
                                <div class="card">
                                    <p class="title1">Si quieres <b>cambiar tu contraseña,</b> has clic sobre el siguiente enlace:</p>           
                                    <a class="button" href="" target="_blank">Cambiar contraseña</a>
                                </div>
          
                                <p class="text">
                                    Si no solicitaste recuperar tu contraseña o crees que alguien accedió a tu cuenta sin tu autorización, te
                                    recomendamos que lo informes al administrador del sistema admonsistema@sapiencia.gov.co
                                </p>
          
                                <br>
          
                                <p class="text">
                                    Por favor no respondas este correo, solo es informativo.
                                </p>
          
                                <div class="container">
                                    <div class="svg-container">
                                    <img class="logos-r" src="https://imagizer.imageshack.com/img923/2784/Q8iutZ.png" alt="" />
                                    </div>
                                    <div class="image-container">
                                        <img src="https://imagizer.imageshack.com/img923/5295/gC0v0x.png" alt="">
                                        <img src="https://imagizer.imageshack.com/img923/406/U0cQIv.png" alt="">
                                    </div>
                                </div>
                          </div>
                        </body>
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