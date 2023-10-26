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
              </head>
              <body>
                  <div style="width: 900px; height: 600px; background-color: #E2E2E2;">
                    <div style="width: 1440px; height: 100px; display: table; margin: 0 auto;">
                    <div style="display: table-cell; vertical-align: middle; text-align: center;">
                        <img src="https://imagizer.imageshack.com/img924/6985/TW5Ygs.png" alt="Logo de la empresa" style="width: 81px; height: 41px;">
                    </div>
                </div>
              
                      <div style="width: 600px; height: 443px; background-color: #ffffff; max-width: 600px; margin: 0 auto; top: 100px; left: 419px;">                          
                          <div style="display: table; background-color: #5E3893; width: 100%; height: 126px; text-align: center; vertical-align: middle;">
                            <div style="display: table-cell; vertical-align: middle;">
                                <img src="https://imagizer.imageshack.com/img923/5251/BGo4Au.png" style="width: 122px; height: 106px;">
                            </div>
                        </div>
                          <div style="width: 599px; height: 317px; padding: 54px;">
                              <h1 style="width: 471px; height: 26px; text-align: center; font-size: 29px; font-weight: bold; font-family: 'Rubik', sans-serif;">Socialización de acta</h1>
                              <p style="width: 471px; height: 57px; font-size: 17px; font-weight: 300; font-family: 'Rubik', sans-serif; line-height: 20.4px;">Se cita para aprobación de acta nro. ${id} el día ${citations[0].dateCitation} hora ${citations[0].timeCitation}.</p>
                          </div>
                      </div>
                  </div>
              </body>
            </html>
          `
        )

      for (const email of emails) {
        message.bcc(email);
      }

    });
    //Se cita para aprobación de acta nro. ${id} el día ${citations[0].dateCitation} hora ${citations[0].timeCitation}.

    return new ApiResponse(true, EResponseCodes.OK);
  }











}