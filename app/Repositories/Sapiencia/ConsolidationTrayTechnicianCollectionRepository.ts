// import Database from "@ioc:Adonis/Lucid/Database";
import { IConsolidationTrayForTechnicianCollection, IConsolidationTrayForTechnicianCollectionParams } from '../../Interfaces/ConsolidationTrayInterface';
import { IPagingData } from "App/Utils/ApiResponses";
// import BeneficiariesConsolidate from '../../Models/BeneficiariesConsolidate';
import { ICutInterface } from '../../Interfaces/CutInterface';
import Cut from '../../Models/Cut';


export interface IConsolidationTrayTechnicianCollectionRepository {
  getHellow(filters: IConsolidationTrayForTechnicianCollection): Promise<any>;
  geConsolidationTrayTechnicianCollection(filters: IConsolidationTrayForTechnicianCollection): Promise<IPagingData<IConsolidationTrayForTechnicianCollectionParams>>;
  getCutGeneric(): Promise<ICutInterface[] | null>;
  geConsolidationTrayTechnicianCollectionByCut(filters: IConsolidationTrayForTechnicianCollection): Promise<IPagingData<IConsolidationTrayForTechnicianCollectionParams>>;
}

export default class ConsolidationTrayTechnicianCollectionRepository implements IConsolidationTrayTechnicianCollectionRepository {

  constructor() { }

  public staticData: IConsolidationTrayForTechnicianCollectionParams[] = [
    {
      creditId: "44930249-433481123-22",
      nroFiducy: "7820328234",
      document: "1289444309",
      fullName: "Tania Manuela Muñoz Ocampo",
      program: "FONDO PRESUPUESTO PARTICIPATIVO",
      legalDate: "2023-01-01",
      dateIncomeCut: "2023-01-01",
      cut: "Corte 1",
      dateFinallyCut: "2023-04-30",
      dateEndGracePeriod: "2023-12-31",
      status: "EN PROCESO",
      reason: "NO APLICA",
      characterization: "Et ea quis eu aute ullamco id tempor in proident in.",
      currentResponsible: "-",
    },
    {
      creditId: "87630249-126491123-55",
      nroFiducy: "7511329981",
      document: "1327891109",
      fullName: "Hellen Yasury Bedoya",
      program: "FONDO PRESUPUESTO PARTICIPATIVO",
      legalDate: "2023-01-01",
      dateIncomeCut: "2023-05-03",
      cut: "Corte 2",
      dateFinallyCut: "2023-07-28",
      dateEndGracePeriod: "2023-12-31",
      status: "EN PROCESO",
      reason: "NO APLICA",
      characterization: "Consectetur deserunt consectetur aliquip veniam esse ut.",
      currentResponsible: "-",
    },
    {
      creditId: "28930665-776123123-22",
      nroFiducy: "9320118288",
      document: "1216717432",
      fullName: "Fabio de Jesus Medina Henao",
      program: "FONDO PRESUPUESTO PARTICIPATIVO",
      legalDate: "2023-01-01",
      dateIncomeCut: "2023-02-01",
      cut: "Corte 1",
      dateFinallyCut: "2023-04-29",
      dateEndGracePeriod: "2023-12-31",
      status: "EN PROCESO",
      reason: "NO APLICA",
      characterization: "Aliquip voluptate voluptate eu occaecat cupidatat consequat minim tempor labore.",
      currentResponsible: "-",
    },
    {
      creditId: "66786659-349983129-55",
      nroFiducy: "4189228282",
      document: "1327091234",
      fullName: "Anjellin Manuela Morales Panesso",
      program: "FONDO PRESUPUESTO PARTICIPATIVO",
      legalDate: "2023-01-01",
      dateIncomeCut: "2023-02-01",
      cut: "Corte 1",
      dateFinallyCut: "2023-04-30",
      dateEndGracePeriod: "2023-12-31",
      status: "EN PROCESO",
      reason: "NO APLICA",
      characterization: "Proident culpa voluptate anim sint nisi sunt aliquip incididunt minim.",
      currentResponsible: "-",
    },
    {
      creditId: "76547213-999883990-95",
      nroFiducy: "9941118289",
      document: "1216717979",
      fullName: "Juan Sebastian Medina Toro",
      program: "FONDO PRESUPUESTO PARTICIPATIVO",
      legalDate: "2023-01-01",
      dateIncomeCut: "2023-05-15",
      cut: "Corte 2",
      dateFinallyCut: "2023-07-18",
      dateEndGracePeriod: "2023-12-31",
      status: "EN PROCESO",
      reason: "NO APLICA",
      characterization: "Sint incididunt dolore enim occaecat cupidatat consectetur nisi exercitation labore labore nostrud esse in.",
      currentResponsible: "-",
    },
    {
      creditId: "77645266-326713991-97",
      nroFiducy: "1221228279",
      document: "1093221894",
      fullName: "Andres Dario Otalvaro",
      program: "FONDO PRESUPUESTO PARTICIPATIVO",
      legalDate: "2023-01-01",
      dateIncomeCut: "2023-05-10",
      cut: "Corte 2",
      dateFinallyCut: "2023-07-28",
      dateEndGracePeriod: "2023-12-31",
      status: "EN PROCESO",
      reason: "NO APLICA",
      characterization: "Eu reprehenderit amet commodo culpa do fugiat est Lorem eiusmod officia labore pariatur.",
      currentResponsible: "-",
    },
    {
      creditId: "59824221-765788142-11",
      nroFiducy: "6548227980",
      document: "1324567812",
      fullName: "Sandra Milena Castañeda",
      program: "FONDO PRESUPUESTO PARTICIPATIVO",
      legalDate: "2023-01-01",
      dateIncomeCut: "2023-09-02",
      cut: "Corte 3",
      dateFinallyCut: "2023-12-31",
      dateEndGracePeriod: "2023-11-05",
      status: "EN PROCESO",
      reason: "NO APLICA",
      characterization: "Minim enim duis adipisicing qui sit.",
      currentResponsible: "-",
    },
    {
      creditId: "980001227-886711465-05",
      nroFiducy: "3421227141",
      document: "1119433209",
      fullName: "Cristian Fernando Badillo",
      program: "FONDO PRESUPUESTO PARTICIPATIVO",
      legalDate: "2023-01-01",
      dateIncomeCut: "2023-07-09",
      cut: "Corte 3",
      dateFinallyCut: "2023-11-31",
      dateEndGracePeriod: "2023-12-31",
      status: "EN PROCESO",
      reason: "NO APLICA",
      characterization: "Nulla dolor dolore ipsum dolor cupidatat exercitation amet id consectetur.",
      currentResponsible: "-",
    },
    {
      creditId: "835491299-321289000-11",
      nroFiducy: "4556989849",
      document: "1003217839",
      fullName: "Abraham Hernadez Munera",
      program: "FONDO PRESUPUESTO PARTICIPATIVO",
      legalDate: "2023-01-01",
      dateIncomeCut: "2023-03-01",
      cut: "Corte 1",
      dateFinallyCut: "2023-04-01",
      dateEndGracePeriod: "2023-12-31",
      status: "EN PROCESO",
      reason: "NO APLICA",
      characterization: "Proident ad aliquip nulla exercitation eiusmod esse reprehenderit adipisicing ipsum consequat dolor.",
      currentResponsible: "-",
    },
    {
      creditId: "345414499-771289888-82",
      nroFiducy: "7483920137",
      document: "1784320912",
      fullName: "German Antonio Dominguez Perez",
      program: "FONDO PRESUPUESTO PARTICIPATIVO",
      legalDate: "2023-01-01",
      dateIncomeCut: "2023-09-07",
      cut: "Corte 3",
      dateFinallyCut: "2023-12-16",
      dateEndGracePeriod: "2023-12-31",
      status: "EN PROCESO",
      reason: "NO APLICA",
      characterization: "Pariatur proident sit laborum cupidatat ipsum et amet.",
      currentResponsible: "-",
    },
    {
      creditId: "654099992-090911888-12",
      nroFiducy: "5433980912",
      document: "1784320998",
      fullName: "Jackson Arley Torres Barrientos",
      program: "FONDO PRESUPUESTO PARTICIPATIVO",
      legalDate: "2023-01-01",
      dateIncomeCut: "2023-09-11",
      cut: "Corte 3",
      dateFinallyCut: "2023-12-24",
      dateEndGracePeriod: "2023-12-31",
      status: "EN PROCESO",
      reason: "NO APLICA",
      characterization: "Est aute do amet veniam nulla est commodo cupidatat nisi in ut.",
      currentResponsible: "-",
    },
    {
      creditId: "109328892-090901221-13",
      nroFiducy: "2328915478",
      document: "1216717032",
      fullName: "Lorena Poms Buritica",
      program: "FONDO PRESUPUESTO PARTICIPATIVO",
      legalDate: "2023-01-01",
      dateIncomeCut: "2023-05-26",
      cut: "Corte 2",
      dateFinallyCut: "2023-07-24",
      dateEndGracePeriod: "2023-12-31",
      status: "EN PROCESO",
      reason: "NO APLICA",
      characterization: "Aliqua laboris adipisicing voluptate ad quis ea amet tempor officia voluptate minim.",
      currentResponsible: "-",
    },
    {
      creditId: "254890192-334901991-13",
      nroFiducy: "3278109432",
      document: "1327811093",
      fullName: "Victor Morales Arrieta",
      program: "FONDO PRESUPUESTO PARTICIPATIVO",
      legalDate: "2023-01-01",
      dateIncomeCut: "2023-09-05",
      cut: "Corte 3",
      dateFinallyCut: "2023-12-19",
      dateEndGracePeriod: "2023-12-31",
      status: "EN PROCESO",
      reason: "NO APLICA",
      characterization: "Proident veniam aliqua laboris ullamco laborum velit magna id reprehenderit.",
      currentResponsible: "-",
    },
    {
      creditId: "232777782-90901291-01",
      nroFiducy: "2345609123",
      document: "1217832109",
      fullName: "Veronica Velez Ocampo",
      program: "FONDO PRESUPUESTO PARTICIPATIVO",
      legalDate: "2023-01-01",
      dateIncomeCut: "2023-02-01",
      cut: "Corte 1",
      dateFinallyCut: "2023-03-29",
      dateEndGracePeriod: "2023-12-31",
      status: "EN PROCESO",
      reason: "NO APLICA",
      characterization: "Ex consequat aute ullamco laborum cillum sit velit.",
      currentResponsible: "-",
    },
    {
      creditId: "238874122-90001291-02",
      nroFiducy: "1672182901",
      document: "1002190343",
      fullName: "Carlos Alberto Buriticá",
      program: "FONDO PRESUPUESTO PARTICIPATIVO",
      legalDate: "2023-01-01",
      dateIncomeCut: "2023-09-05",
      cut: "Corte 3",
      dateFinallyCut: "2023-12-29",
      dateEndGracePeriod: "2023-12-31",
      status: "EN PROCESO",
      reason: "NO APLICA",
      characterization: "Incididunt aute ad adipisicing est reprehenderit consequat tempor cupidatat ad ipsum.",
      currentResponsible: "-",
    }
  ]

  async getHellow(filters: IConsolidationTrayForTechnicianCollection): Promise<any> {

    console.log({ filters })
    return "Hola a todos";

  }

  async geConsolidationTrayTechnicianCollection(filters: IConsolidationTrayForTechnicianCollection): Promise<IPagingData<IConsolidationTrayForTechnicianCollectionParams>> {

    //* ********************************************** *//
    //* *** Llamado tabla Aurora (SI ES REQUERIDO) *** *//
    //* ********************************************** *//
    //TODO!
    // const resAurora = await BeneficiariesConsolidate.query();
    // const convertResAurora = resAurora.map((i) => i.serialize() as any);
    // console.log(convertResAurora);

    //* ************************************************* *//
    //* *** Llamado tabla Sapiencia (SI ES REQUERIDO) *** *//
    //* ************************************************* *//
    //TODO!
    // const query = `call NombreProcedimientoAlmacenadoQueNecesitamos`;
    // const resSapiencia = await Database.connection("mysql_sapiencia").rawQuery(query);

    //* ****************************************************************** *//
    //* *** Unificación respuesta Aurora - Sapiencia (SI ES REQUERIDO) *** *//
    //* ****************************************************************** *//
    //TODO!

    // --------------------------------------------------- //
    // --------------- INFORMACIÓN QUEMADA --------------- //
    // --------------------------------------------------- //
    const { page, perPage } = filters;
    let infoPaginated: IConsolidationTrayForTechnicianCollectionParams[] = [];
    const infoWithCut: IConsolidationTrayForTechnicianCollectionParams[] = [];

    //* ************************************* //*
    //* Aplicamos paginación de manera manual //*
    //* ************************************* //*
    const start: number = (page - 1) * perPage;
    const end: number = start + perPage;

    //* ******************************************** //*
    //* Ordenemos por el corte según la fecha actual //*
    //* ******************************************** //*
    for (const data of this.staticData) {

      const getNumericDateNow = Date.parse(Date());
      const getNumericDateIncomeCut = Date.parse(data.dateIncomeCut);
      const getNumericDateFinallyCut = Date.parse(data.dateFinallyCut);

      if (getNumericDateNow >= getNumericDateIncomeCut && getNumericDateNow <= getNumericDateFinallyCut) {
        infoWithCut.push(data);
      }

    }

    infoPaginated = infoWithCut.slice(start, end);

    const meta = {
      total: infoPaginated.length,
      per_page: perPage,
      current_page: page,
      last_page: Math.ceil(infoPaginated.length / perPage),
    };

    return { array: infoPaginated as IConsolidationTrayForTechnicianCollectionParams[], meta };

  }

  async getCutGeneric(): Promise<ICutInterface[] | null> {

    const query = await Cut.query().orderBy("id", "asc");
    const convert = query.map((i) => i.serialize() as ICutInterface);
    const array1: ICutInterface[] = []; //Para los que estén sobre el rango
    const array2: ICutInterface[] = []; //Para los que no estén sobre el rango

    if (convert.length === 0) return null;

    for (const cuts of convert) {
      const dateFromOrg = cuts.from;
      const dateUntilOrg = cuts.until;

      const numericDateNow = Date.parse(Date())
      const numericFromOrg = Date.parse(dateFromOrg);
      const numericUntilOrg = Date.parse(dateUntilOrg);

      if (numericDateNow >= numericFromOrg && numericDateNow <= numericUntilOrg) {
        array1.push(cuts);
      } else {
        array2.push(cuts);
      }

    }

    const arrayResult: ICutInterface[] = array1.concat(array2);

    return arrayResult;

  }

  async geConsolidationTrayTechnicianCollectionByCut(filters: IConsolidationTrayForTechnicianCollection): Promise<IPagingData<IConsolidationTrayForTechnicianCollectionParams>> {

    let infoFiltered: IConsolidationTrayForTechnicianCollectionParams[] = [];
    let infoPaginated: IConsolidationTrayForTechnicianCollectionParams[] = [];

    //* ************************************* //*
    //* Aplicamos paginación de manera manual //*
    //* ************************************* //*
    const { searchParam, cutParamName, cutParamId, page, perPage } = filters;
    const start: number = (page - 1) * perPage;
    const end: number = start + perPage;

    //* ********************************************* //*
    //* Ordenemos por el corte que llega de parámetro //*
    //* ********************************************* //*
    for (const data of this.staticData) {

      if (data.cut === cutParamName || data.cut === cutParamId?.toString()) {
        infoFiltered.push(data);
      }

    }

    //* ******************************************** //*
    //* Revisamos si vienen elementos para consultar //*
    //* ******************************************** //*
    if (searchParam && searchParam !== null && searchParam !== ""){

      const filter: IConsolidationTrayForTechnicianCollectionParams[] =

        infoFiltered.filter(f =>
          f.creditId.toLowerCase().includes(searchParam.toLowerCase()) ||
          f.nroFiducy.toLowerCase().includes(searchParam.toLowerCase()) ||
          f.document.toLowerCase().includes(searchParam.toLowerCase()) ||
          f.fullName.toLowerCase().includes(searchParam.toLowerCase()) ||
          f.program.toLowerCase().includes(searchParam.toLowerCase()) ||
          f.legalDate.toLowerCase().includes(searchParam.toLowerCase()) ||
          f.dateIncomeCut.toLowerCase().includes(searchParam.toLowerCase()) ||
          f.cut.toLowerCase().includes(searchParam.toLowerCase()) ||
          f.dateFinallyCut.toLowerCase().includes(searchParam.toLowerCase()) ||
          f.dateEndGracePeriod.toLowerCase().includes(searchParam.toLowerCase()) ||
          f.status.toLowerCase().includes(searchParam.toLowerCase()) ||
          f.reason.toLowerCase().includes(searchParam.toLowerCase()) ||
          f.characterization.toLowerCase().includes(searchParam.toLowerCase()) ||
          f.currentResponsible.toLowerCase().includes(searchParam.toLowerCase())
        );

      infoPaginated = filter.slice(start, end);

    }else{

      infoPaginated = infoFiltered.slice(start, end);

    }

    const meta = {
      total: infoPaginated.length,
      per_page: perPage,
      current_page: page,
      last_page: Math.ceil(infoPaginated.length / perPage),
    };

    return { array: infoPaginated as IConsolidationTrayForTechnicianCollectionParams[], meta };

  }

}
