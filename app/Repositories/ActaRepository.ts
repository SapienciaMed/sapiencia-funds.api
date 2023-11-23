import { IActa } from "App/Interfaces/ActaInterface";
import Acta from "App/Models/Acta";
import ActaItems from "App/Models/ActaItems";
import Citation from '../Models/Citation';
import { ICitation } from "App/Interfaces/CitationInterface";
import { ApiResponse } from "App/Utils/ApiResponses";
import Mail from "@ioc:Adonis/Addons/Mail";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import Database from "@ioc:Adonis/Lucid/Database";



export interface IActaRepository {
  createActa(acta: IActa): Promise<IActa>;
  noticacion(citations: ICitation[], id: number): Promise<ApiResponse<boolean | null>>;
  getActa(id: number)
  approveCitation(id: number)
  lastInsertId()
  updateActa(acta: IActa)
}




export default class ActaRepository implements IActaRepository {
  constructor() { }


  async createActa(acta: IActa): Promise<IActa> {
    const toCreate = new Acta();

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;


    if (acta.lastId) {
      toCreate.fill({ ...acta, creationDate: formattedDate, lastId: acta.lastId, idStatus: 3 });
      await toCreate.save();

    } else {
      toCreate.fill({ ...acta, creationDate: formattedDate });
      await toCreate.save();
    }

    const saveItemPromises = acta.items!.map(itemData => {
      const item = new ActaItems();
      const serializedPeriods = JSON.stringify(itemData.periods);
      item.fill({ ...itemData, periods: serializedPeriods, idActa: toCreate.id.toString() });
      return item.save();
    });

    await Promise.all(saveItemPromises);

    // Solo procesar y guardar las citas si están presentes
    let savedCitations;
    if (acta.citation && acta.citation.length > 0) {
      const saveCitationPromises = acta.citation.map(citation => {
        const savecitation = new Citation();
        savecitation.fill({ ...citation, idActa: toCreate.id });
        return savecitation.save();
      });
      savedCitations = await Promise.all(saveCitationPromises);
      await toCreate.load('citation'); // Cargar las citas solo si fueron guardadas
      await this.noticacion(savedCitations, toCreate.id); // Notificar solo si hay citas
    }

    await toCreate.load('items');

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
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              .center {
                text-align: center; /* Centra horizontalmente el contenido */
              }
          
              .center img {
                display: block; /* Hace que la imagen sea un elemento de bloque */
                margin: 0 auto; /* Centra la imagen horizontalmente */
              }
            </style>
          </head>
          <body>
            <div style="width: 1200px; height: 600px; background-color: #E2E2E2;">
              <div style="width: 500px; height: 50px; margin: 0 auto; padding: 10px;" class="center">
                <img src="https://imagizer.imageshack.com/img924/6985/TW5Ygs.png" alt="Logo de la empresa" style="width: 81px; height: 41px;">
              </div>
              <div class="center" style="width: 600px; height: 443px; background-color: #ffffff; max-width: 600px; margin: 0 auto; top: 100px; left: 419px;">
                <div style="background-color: #5E3893; width: 600px; height: 126px; display: table; margin: 0 auto; padding: 10px;">
                  <img src="https://imagizer.imageshack.com/img923/5251/BGo4Au.png" alt="Logo de tarje" style="width: 122px; height: 106px;">
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


  async getActa(id: number) {

    const query = Acta.query()
      .preload("typeMasterList")
      .preload("items")
      .preload("citation")

    const res = query.where("id", id)

    return res
  }

  async approveCitation(id: number) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    const query = await Citation.query().preload("acta").where("idCitation", id).update({ status: 1, dateAprobation: formattedDate })
    const query2 = await Database.rawQuery("SELECT CTA_CODATA_CODIGO FROM CTA_CITACION_ACTA WHERE CTA_CODIGO =:id", { id: id })
    let codeActa = query2[0][0]['CTA_CODATA_CODIGO']
    console.log(codeActa)
    const query3 = await Database.rawQuery("SELECT CTA_ESTADO FROM CTA_CITACION_ACTA WHERE CTA_CODATA_CODIGO = :id", { id: codeActa })
    let band = false
    query3[0].forEach(status => {
      if (status['CTA_ESTADO'] == 1) {
        band = true
      } else {
        band = false
      }
    });

    if (band) {
      await Acta.query().where('id', codeActa).update({ idStatus: 2 })
    }

    return query
  }

  async lastInsertId() {
    const query = await Database.rawQuery('SELECT ATA_CODIGO FROM ATA_ACTA ORDER BY ATA_CODIGO DESC LIMIT 1;')
    return query[0][0]
  }

  async updateActa(acta: IActa) {
    let id = acta.id!

    let payloadActa = { numberProject: acta.numberProject, periodVigency: acta.periodVigency, announcementInitial: acta.announcementInitial, costsExpenses: acta.costsExpenses, OperatorCommission: acta.OperatorCommission, financialOperation: acta.financialOperation }

    const actaUpdate = await Acta.updateOrCreate({ id }, payloadActa)

    const updateItemPromises = acta.items!.map(itemData => {
      const item = ActaItems;
      const serializedPeriods = JSON.stringify(itemData.periods);
      let id = itemData.id!
      let payload = {
        idFound: itemData.idFound, idLine: itemData.idLine, idAnnouncement: itemData.idAnnouncement!, idConcept: itemData.idConcept, costOperation: itemData.costOperation, subtotalVigency: itemData.subtotalVigency, costBillsOperation: itemData.costBillsOperation, net: itemData.net, financialOperatorCommission: itemData.financialOperatorCommission, resourcesCredit: itemData.resourcesCredit, idProgram: itemData.idProgram, periods: serializedPeriods
      }

      item.updateOrCreate({ id }, payload)

      return item
    });

    let savedCitations;
    const saveCitationPromises = acta.citation!.map(citation => {
      const savecitation = new Citation();
      if (!citation.id) {
        savecitation.fill({ ...citation, idActa: acta.id });
        return savecitation.save();
      }

    });
    savedCitations = await Promise.all(saveCitationPromises);


    if (!actaUpdate && !updateItemPromises && !savedCitations) {
      return "No se pudo actualizar la informacion"
    } else {
      return "Informacion actualizada"
    }
  }

}