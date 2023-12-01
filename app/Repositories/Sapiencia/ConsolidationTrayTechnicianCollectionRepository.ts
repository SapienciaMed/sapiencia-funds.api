import axios, { AxiosInstance } from "axios";
// import Database from "@ioc:Adonis/Lucid/Database";
import { IConsolidationTrayForTechnicianCollection,
         IConsolidationTrayForTechnicianCollectionParams,
         IConsolidationTrayForTransactions,
         InitialBeneficiaryInformation,
         CitizenAttentionDataExternal,
         PqrsdfResultSimple} from '../../Interfaces/ConsolidationTrayInterface';
import { IPagingData } from "App/Utils/ApiResponses";
import BeneficiariesConsolidate from '../../Models/BeneficiariesConsolidate';
import { ICutInterface } from '../../Interfaces/CutInterface';
import Cut from '../../Models/Cut';
import { PqrsdfResult } from '../../Interfaces/ConsolidationTrayInterface';


export interface IConsolidationTrayTechnicianCollectionRepository {
  getHellow(filters: IConsolidationTrayForTechnicianCollection): Promise<any>;
  geConsolidationTrayTechnicianCollection(filters: IConsolidationTrayForTechnicianCollection): Promise<IPagingData<IConsolidationTrayForTechnicianCollectionParams>>;
  getCutGeneric(): Promise<ICutInterface[] | null>;
  geConsolidationTrayTechnicianCollectionByCut(filters: IConsolidationTrayForTechnicianCollection): Promise<IPagingData<IConsolidationTrayForTechnicianCollectionParams>>;
  geBeneficiaryById(id: number): Promise<IConsolidationTrayForTechnicianCollectionParams | null>;
  updateCutBeneficiary(data: IConsolidationTrayForTransactions): Promise<IConsolidationTrayForTechnicianCollectionParams | null>;
  getPQRSDFExternal(filters: IConsolidationTrayForTechnicianCollection): Promise<IPagingData<PqrsdfResultSimple>>;
}

export default class ConsolidationTrayTechnicianCollectionRepository implements IConsolidationTrayTechnicianCollectionRepository {

  private axiosInstance: AxiosInstance;

  constructor() {
    //**Instanciamos Axios para atención ciudadana */
    this.axiosInstance = axios.create({
      baseURL: process.env.URL_API_CITIZEN_ATTENTION,
    });

  }

  async getHellow(filters: IConsolidationTrayForTechnicianCollection): Promise<any> {

    console.log({ filters })
    return "Hola a todos";

  }

  async geConsolidationTrayTechnicianCollection(filters: IConsolidationTrayForTechnicianCollection): Promise<IPagingData<IConsolidationTrayForTechnicianCollectionParams | any>> {

    //* ********************************************** *//
    //* *** Llamado tabla Aurora (SI ES REQUERIDO) *** *//
    //* ********************************************** *//
    const resAurora = await BeneficiariesConsolidate
      .query()
      .preload("cuts")
      .preload("programs")
      .orderBy("id", "asc");
    const convertResAurora = resAurora.map((i) => i.serialize() as InitialBeneficiaryInformation);
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
    const infoWithCutAndProgram: IConsolidationTrayForTechnicianCollectionParams[] = [];

    //* ************************************* //*
    //* Aplicamos paginación de manera manual //*
    //* ************************************* //*
    const start: number = (page - 1) * perPage;
    const end: number = start + perPage;

    //* ******************************************** //*
    //* Ordenemos por el corte según la fecha actual //*
    //* ******************************************** //*
    for (const data of convertResAurora) {

      const getNumericDateNow: number = Date.parse(Date());
      const getNumericDateIncomeCut: number = Date.parse( data.cuts.from );
      const getNumericDateFinallyCut: number = Date.parse( data.cuts.until );

      if (getNumericDateNow >= getNumericDateIncomeCut && getNumericDateNow <= getNumericDateFinallyCut) {

        const objParams: IConsolidationTrayForTechnicianCollectionParams = {
          idBenef: data.id,
          idCut: data.idCut,
          idProgram: data.idProgram,
          creditId: data.creditNumber,
          nroFiducy: data.fiducyContractNumber,
          document: data.numberDocument,
          fullName: data.fullName,
          program: data.programs.value,
          legalDate: data.legalPeriod,
          dateIncomeCut: data.cuts.from,
          cut: data.cuts.name,
          dateFinallyCut: data.cuts.until,
          dateEndGracePeriod: data.dateEndGracePeriod,
          status: data.statusProcess,
          reason: data.reason,
          characterization: data.characterization,
          currentResponsible: data.currentManager,
        }

        infoWithCutAndProgram.push(objParams);
      }

    }

    infoPaginated = infoWithCutAndProgram.slice(start, end);

    const meta = {
      total: infoWithCutAndProgram.length,
      per_page: perPage,
      current_page: page,
      last_page: Math.ceil(infoWithCutAndProgram.length / perPage),
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

    //* ********************************************** *//
    //* *** Llamado tabla Aurora (SI ES REQUERIDO) *** *//
    //* ********************************************** *//
    const resAurora = await BeneficiariesConsolidate
      .query()
      .preload("cuts")
      .preload("programs")
      .orderBy("id", "asc");
    const convertResAurora = resAurora.map((i) => i.serialize() as InitialBeneficiaryInformation);

    let infoFiltered: IConsolidationTrayForTechnicianCollectionParams[] = [];
    let infoAllData: IConsolidationTrayForTechnicianCollectionParams[] = [];
    let infoPaginated: IConsolidationTrayForTechnicianCollectionParams[] = [];

    //* ************************************* //*
    //* Aplicamos paginación de manera manual //*
    //* ************************************* //*
    const { searchParam, cutParamName, cutParamId, page, perPage } = filters;
    const start: number = (page - 1) * perPage;
    const end: number = start + perPage;

    //* ************************************************************************ //*
    //* **** Ordenemos por el corte que llega de parámetro                       //*
    //* **** Contravalidamos si llega la opción de 'TODOS' sin importar corte    //*
    //* ************************************************************************ //*
    for (const data of convertResAurora) {

      const objParams: IConsolidationTrayForTechnicianCollectionParams = {
        idBenef: data.id,
        idCut: data.idCut,
        idProgram: data.idProgram,
        creditId: data.creditNumber,
        nroFiducy: data.fiducyContractNumber,
        document: data.numberDocument,
        fullName: data.fullName,
        program: data.programs.value,
        legalDate: data.legalPeriod,
        dateIncomeCut: data.cuts.from,
        cut: data.cuts.name,
        dateFinallyCut: data.cuts.until,
        dateEndGracePeriod: data.dateEndGracePeriod,
        status: data.statusProcess,
        reason: data.reason,
        characterization: data.characterization,
        currentResponsible: data.currentManager,
      }

      if( !cutParamName || cutParamName == null || cutParamName == "" ){

        if (data.cuts.id === cutParamId){

          infoFiltered.push(objParams);

        }

      }else{

        if( cutParamName === "TODOS" ){

          infoAllData.push(objParams);

        }

      }

    }

    //* ******************************************************** //*
    //* Defino que tipo de filtro usaré del condicional anterior //*
    //* ******************************************************** //*
    let filterForSearch: IConsolidationTrayForTechnicianCollectionParams[] = [];

    if( cutParamName && cutParamName !== "" && cutParamName === "TODOS" ){
      filterForSearch = infoAllData;
    }else{
      filterForSearch = infoFiltered;
    }

    //* ******************************************** //*
    //* Revisamos si vienen elementos para consultar //*
    //* ******************************************** //*
    let totalDataContent: number = 0;
    if (searchParam && searchParam !== null && searchParam !== ""){

      const filter: IConsolidationTrayForTechnicianCollectionParams[] =

      filterForSearch.filter(f =>
          f.creditId.toString().includes(searchParam.toLowerCase()) ||
          f.nroFiducy.toString().includes(searchParam.toLowerCase()) ||
          f.document.toLowerCase().toString().includes(searchParam.toLowerCase()) ||
          f.fullName.toLowerCase().toString().includes(searchParam.toLowerCase()) ||
          f.program.toLowerCase().toString().includes(searchParam.toLowerCase()) ||
          f.legalDate.toLowerCase().toString().includes(searchParam.toLowerCase()) ||
          f.dateIncomeCut.toString().includes(searchParam.toLowerCase()) ||
          f.cut.toLowerCase().toString().includes(searchParam.toLowerCase()) ||
          f.dateFinallyCut.toString().includes(searchParam.toLowerCase()) ||
          f.dateEndGracePeriod?.toString().includes(searchParam.toLowerCase()) ||
          f.status.toLowerCase().toString().includes(searchParam.toLowerCase()) ||
          f.reason.toLowerCase().toString().includes(searchParam.toLowerCase()) ||
          f.characterization.toLowerCase().toString().includes(searchParam.toLowerCase()) ||
          f.currentResponsible.toLowerCase().toString().includes(searchParam.toLowerCase())
        );

      infoPaginated = filter.slice(start, end);
      totalDataContent = infoPaginated.length;

    }else{

      infoPaginated = filterForSearch.slice(start, end);
      totalDataContent = infoPaginated.length;

    }

    const meta = {
      total: totalDataContent,
      total_general: filterForSearch.length,
      per_page: perPage,
      current_page: page,
      last_page: Math.ceil(totalDataContent / perPage),
    };

    return { array: infoPaginated as IConsolidationTrayForTechnicianCollectionParams[], meta };

  }

  async geBeneficiaryById(id: number): Promise<IConsolidationTrayForTechnicianCollectionParams | null> {

    const resAurora = await BeneficiariesConsolidate
      .query()
      .where("id", id)
      .preload("cuts")
      .preload("programs")
      .orderBy("id", "asc");
    const convertResAurora = resAurora.map((i) => i.serialize() as InitialBeneficiaryInformation);

    if(convertResAurora.length === 0) return null;

    const objResult: IConsolidationTrayForTechnicianCollectionParams = {
      idBenef: convertResAurora[0].id,
      idCut: convertResAurora[0].idCut,
      idProgram: convertResAurora[0].idProgram,
      creditId: convertResAurora[0].creditNumber,
      nroFiducy: convertResAurora[0].fiducyContractNumber,
      document: convertResAurora[0].numberDocument,
      fullName: convertResAurora[0].fullName,
      program: convertResAurora[0].programs.value,
      legalDate: convertResAurora[0].legalPeriod,
      dateIncomeCut: convertResAurora[0].cuts.from,
      cut: convertResAurora[0].cuts.name,
      dateFinallyCut: convertResAurora[0].cuts.until,
      dateEndGracePeriod: convertResAurora[0].dateEndGracePeriod,
      status: convertResAurora[0].statusProcess,
      reason: convertResAurora[0].reason,
      characterization: convertResAurora[0].characterization,
      currentResponsible: convertResAurora[0].currentManager,

      countSpinProjected: convertResAurora[0].countSpinProjected,
      countSpins: convertResAurora[0].countSpins,
      contactNumber: convertResAurora[0].contactNumber,
      email: convertResAurora[0].email,
      dateIncome: convertResAurora[0].dateIncome,

    }

    return objResult;

  }

  async updateCutBeneficiary(data: IConsolidationTrayForTransactions): Promise<IConsolidationTrayForTechnicianCollectionParams | null> {

    const { id , cut } = data;

    if( !id || id == null || id == undefined ||
        !cut || cut == null || cut == undefined) return null;

    const toBeneficiary = await BeneficiariesConsolidate.find(id);

    if (!toBeneficiary) {
      return null;
    }

    toBeneficiary.idCut = Number(cut);
    await toBeneficiary.save();

    return toBeneficiary.serialize() as IConsolidationTrayForTechnicianCollectionParams;

  }

  async getPQRSDFExternal(filters: IConsolidationTrayForTechnicianCollection): Promise<IPagingData<PqrsdfResultSimple>> {

    const urlConsumer = `/api/v1/pqrsdf/get-paginated/`;
    const resultFilter: PqrsdfResultSimple[] = [];

    const privateFiltersForCitizen: IConsolidationTrayForTechnicianCollection = {
      identification: filters.identification,
      page: 1,
      perPage: 100000
    }

    const dataCitizen = await this.axiosInstance.post<
      CitizenAttentionDataExternal[]>(urlConsumer, privateFiltersForCitizen, {
      headers: {
        Authorization: process.env.CURRENT_AUTHORIZATION,
      },
    });

    const dataResult: CitizenAttentionDataExternal | any = dataCitizen;
    const dataCaptured: PqrsdfResult[] = dataResult.data.data.array;

    dataCaptured.forEach( (pqrsdf) => {

      let program: string = "";
      let clasify: string = "";
      let reason: string = "";
      let state: string = "";
      let numberPqrsdf: number;
      let dateFiled: Date | string;
      let answerDate: Date | string;
      let answer: string = "";

      if( !pqrsdf.filingNumber || pqrsdf.filingNumber == null ){
        numberPqrsdf = 0;
      }else{
        numberPqrsdf = pqrsdf.filingNumber;
      }

      if( !pqrsdf.createdAt || pqrsdf.createdAt == null ){
        dateFiled = "";
      }else{
        dateFiled = pqrsdf.createdAt;
      }

      if( !pqrsdf.program || pqrsdf.program == null ){
        program = "";
      }else{
        program = pqrsdf.program.prg_descripcion;
      }

      if( !pqrsdf.clasification || pqrsdf.clasification == null ){
        clasify = "";
      }else{
        clasify = pqrsdf.clasification;
      }

      if( !pqrsdf.requestSubject || pqrsdf.requestSubject == null ){
        reason = "";
      }else{
        reason = pqrsdf.requestSubject!.aso_asunto;
      }

      if( !pqrsdf.status || pqrsdf.status == null ){
        state = "";
      }else{
        state = pqrsdf.status!.lep_estado;
      }

      if( !pqrsdf.answerDate || pqrsdf.answerDate == null ){
        answerDate = "";
      }else{
        answerDate = pqrsdf.answerDate;
      }

      if( !pqrsdf.answer || pqrsdf.answer == null ){
        answer = "";
      }else{
        answer = pqrsdf.answer;
      }

      const objResult: PqrsdfResultSimple = {
        numberPqrsdf,
        dateFiled,
        program,
        clasify,
        reason,
        state,
        answerDate,
        answer,
      }

      resultFilter.push(objResult);

    })

    //* ************************************* //*
    //* Aplicamos paginación de manera manual //*
    //* ************************************* //*
    let infoPaginated: PqrsdfResultSimple[] = [];

    const { page, perPage } = filters;
    const start: number = (page - 1) * perPage;
    const end: number = start + perPage;

    infoPaginated = resultFilter.slice(start, end);

    const meta = {
      total: resultFilter.length,
      total_general: resultFilter.length,
      per_page: perPage,
      current_page: page,
      last_page: Math.ceil(resultFilter.length / perPage),
    };

    return { array: infoPaginated as PqrsdfResultSimple[], meta };

  }

}
