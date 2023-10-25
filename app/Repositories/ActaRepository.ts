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
  noticacion(citations: ICitation[]): Promise<ApiResponse<boolean | null>>;
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

    await this.noticacion(savedCitations);
    
    return toCreate.serialize() as IActa;
  }


  async noticacion(citations: ICitation[]): Promise<ApiResponse<boolean | null>> {
    // Filtrar cualquier valor undefined y recolectar todos los correos electrónicos en un array
    const emails = citations.map(citation => citation.email).filter(email => email !== undefined) as string[];


    await Mail.send((message) => {
      message
        .from("sapiencia@example.com")       
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

        for (const email of emails) {
          message.bcc(email);
      }
        
    });
  
    return new ApiResponse(true, EResponseCodes.OK);
  }









  

}