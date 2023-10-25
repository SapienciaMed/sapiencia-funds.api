import { IActa } from "App/Interfaces/ActaInterface";
import Acta from "App/Models/Acta";
import ActaItems from "App/Models/ActaItems";
import Citation from '../Models/Citation';
import { ICitation } from "App/Interfaces/CitationInterface";
import { ApiResponse } from "App/Utils/ApiResponses";
import Mail from "@ioc:Adonis/Addons/Mail";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";



export interface IActaRepository {
  createActa(acta: IActa): Promise<IActa>;
  noticacion(citations: ICitation[], id: number): Promise<ApiResponse<boolean | null>>;
}




export default class ActaRepository implements IActaRepository {
  constructor() { }


  async createActa(acta: IActa): Promise<IActa> {
    const toCreate = new Acta();

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    toCreate.fill({ ...acta, creationDate: formattedDate });
    await toCreate.save();

    const saveItemPromises = acta.items!.map(itemData => {
      const item = new ActaItems();
      const serializedPeriods = JSON.stringify(itemData.periods);
      item.fill({ ...itemData, periods: serializedPeriods, idActa: toCreate.id.toString() });
      return item.save();
    });

    const saveCitationPromises = acta.citation!.map(citation => {
      const savecitation = new Citation();

      savecitation.fill({ ...citation, idActa: toCreate.id });
      return savecitation.save();
    });

    await Promise.all(saveItemPromises);
    const savedCitations = await Promise.all(saveCitationPromises);

    await toCreate.load('items');

    await toCreate.load('citation');

    await this.noticacion(savedCitations, toCreate.id);

    return toCreate.serialize() as IActa;
  }


  async noticacion(citations: ICitation[], id: number): Promise<ApiResponse<boolean | null>> {
    // Filtrar cualquier valor undefined y recolectar todos los correos electrónicos en un array
    const emails = citations.map(citation => citation.email).filter(email => email !== undefined) as string[];


    await Mail.send((message) => {
      message
        .from("sapiencia@example.com")
        .subject("Socialización de acta")
        .html(
          `
          <html>
            <head>
              <style>              
              .element-correo-de {
                background-color: #e2e2e2;
                display: flex;
                flex-direction: column;  /* Cambiado a column */
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100vh;  /* Añadido para ocupar toda la altura de la vista */
              }
        
              .element-correo-de .container {
                display: flex;
                flex-direction: column;  /* Mantenido como column */
                align-items: center;
                position: relative;
              }
        
              .element-correo-de .hero {
                display: flex;
                flex-direction: column;
                width: 100%;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 10px;
                background-color: #5e3893;
              }
        
              .element-correo-de .content {
                width: 82%;
                display: flex;
                flex-direction: column;
                height: 317px;
                align-items: flex-start;
                gap: 32px;
                padding: 64px;
                background-color: #ffffff;
                margin-top: -50px;  /* Nuevo: añade un margen-top negativo */
              }
              
              .element-correo-de .text-wrapper {
                position: relative;
                width: 471px;
                height: 26px;
                margin-top: -1px;
                font-family: "Rubik-Regular", Helvetica;
                font-weight: 400;
                color: var(--textprimario);
                font-size: 29px;
                text-align: center;
                letter-spacing: 0;
                line-height: 34.8px;
                white-space: nowrap;
              }
              
              .element-correo-de .se-cita-para {
                position: relative;
                width: 471px;
                height: 57px;
                font-family: "Rubik-Light", Helvetica;
                font-weight: 300;
                color: #000000;
                font-size: 17px;
                letter-spacing: 0;
                line-height: 20.4px;
              }
              
              .element-correo-de .header {
                display: flex;
                flex-direction: column;
                width: 1440px;
                height: 100px;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 10px;
                position: absolute;
                top: 0;
                left: 0;
                background-color: transparent;
              }
              
              .element-correo-de .logo-aurora-color {
                position: relative;
                width: 81.11px;
                height: 41.16px;
              }
              </style>
            </head>
            </html>
            <body>                              
            <div class="element-correo-de">
            <div class="div">
              <div class="container">
                <div class="hero"><img class="imagen"/></div>
                <div class="content">
                  <div class="text-wrapper">Socialización de acta</div>                
                    <p class="se-cita-para">
                      Se cita para aprobación de acta nro. ${id} el día ${citations[0].dateCitation} hora ${citations[0].timeCitation}.
                    </p>                 
                </div>
              </div>       
            </div>
          </div>        
            </body>
            `
        )

      for (const email of emails) {
        message.bcc(email);
      }

    });

    return new ApiResponse(true, EResponseCodes.OK);
  }











}