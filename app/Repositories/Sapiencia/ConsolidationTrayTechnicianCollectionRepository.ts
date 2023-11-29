import axios, { AxiosInstance } from "axios";
// import Database from "@ioc:Adonis/Lucid/Database";
import { IConsolidationTrayForTechnicianCollection,
         IConsolidationTrayForTechnicianCollectionParams,
         IConsolidationTrayForTransactions,
         InitialBeneficiaryInformation,
         ICitizenAttentionDataExternal,
         IPqrsdfResultSimple,
         IPqrsdfResult} from '../../Interfaces/ConsolidationTrayInterface';
import { IPagingData } from "App/Utils/ApiResponses";
import BeneficiariesConsolidate from '../../Models/BeneficiariesConsolidate';
import { ICutInterface } from '../../Interfaces/CutInterface';
import Cut from '../../Models/Cut';
import Reglament from '../../Models/Reglament';
import { IReglamentInterface } from '../../Interfaces/IReglamentInterface';
import Requeriment from '../../Models/Requeriment';
import { IRequerimentInterface } from '../../Interfaces/IRequerimentInterface';
import { IRequerimentsResultSimple } from '../../Interfaces/ConsolidationTrayInterface';
import RequirementsConsolidate from '../../Models/RequirementsConsolidate';


export interface IConsolidationTrayTechnicianCollectionRepository {
  getHellow(filters: IConsolidationTrayForTechnicianCollection): Promise<any>;
  geConsolidationTrayTechnicianCollection(filters: IConsolidationTrayForTechnicianCollection): Promise<IPagingData<IConsolidationTrayForTechnicianCollectionParams>>;
  getCutGeneric(): Promise<ICutInterface[] | null>;
  geConsolidationTrayTechnicianCollectionByCut(filters: IConsolidationTrayForTechnicianCollection): Promise<IPagingData<IConsolidationTrayForTechnicianCollectionParams>>;
  geBeneficiaryById(id: number): Promise<IConsolidationTrayForTechnicianCollectionParams | null>;
  updateCutBeneficiary(data: IConsolidationTrayForTransactions): Promise<IConsolidationTrayForTechnicianCollectionParams | null>;
  getPQRSDFExternal(filters: IConsolidationTrayForTechnicianCollection): Promise<IPagingData<IPqrsdfResultSimple>>;
  getRequirementsByBeneficiary(filters: IConsolidationTrayForTechnicianCollection): Promise<IPagingData<IRequerimentsResultSimple>>;
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
      .preload("statusPacc")
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

      //Solo mostramos SII es Técnico Pacc
      if(data.statusPacc.id === 4){

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
            program: data.programs.value, //Programa - Tabla maestros Programa
            legalDate: data.legalPeriod,
            dateIncomeCut: data.cuts.from, //Cortes - Tabla Cortes
            cut: data.cuts.name, //Cortes - Tabla Cortes
            dateFinallyCut: data.cuts.until, //Cortes - Tabla Cortes
            dateEndGracePeriod: data.dateEndGracePeriod,
            status: data.statusPacc.description, //Estados - Tabla maestros Pacc
            reason: data.reason,
            characterization: data.characterization,
            currentResponsible: data.currentManager,
          }

          infoWithCutAndProgram.push(objParams);

        }

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
      .preload("statusPacc")
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

      //Solo podemos proceder SII si es Técnico Pacc
      if( data.statusPacc.id === 4 ){

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
          status: data.statusPacc.description,
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
      status: convertResAurora[0].statusPacc.description,
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

  async getPQRSDFExternal(filters: IConsolidationTrayForTechnicianCollection): Promise<IPagingData<IPqrsdfResultSimple>> {

    const urlConsumer = `/api/v1/pqrsdf/get-paginated/`;
    const resultFilter: IPqrsdfResultSimple[] = [];

    const privateFiltersForCitizen: IConsolidationTrayForTechnicianCollection = {
      identification: filters.identification,
      page: 1,
      perPage: 100000
    }

    const dataCitizen = await this.axiosInstance.post<
      ICitizenAttentionDataExternal[]>(urlConsumer, privateFiltersForCitizen, {
      headers: {
        Authorization: process.env.CURRENT_AUTHORIZATION,
      },
    });

    const dataResult: ICitizenAttentionDataExternal | any = dataCitizen;
    const dataCaptured: IPqrsdfResult[] = dataResult.data.data.array;

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

      const objResult: IPqrsdfResultSimple = {
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
    let infoPaginated: IPqrsdfResultSimple[] = [];

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

    return { array: infoPaginated as IPqrsdfResultSimple[], meta };

  }

  async getRequirementsByBeneficiary(filters: IConsolidationTrayForTechnicianCollection): Promise<IPagingData<IRequerimentsResultSimple>> {

    const { page, perPage, idBeneficiary } = filters;
    const meta_error = {
      total: 0,
      total_general: 0,
      per_page: 0,
      current_page: 0,
      last_page: 0,
    };

    //* **************************************** //*
    //* ** Traigamos el beneficiario asociado ** //*
    //* **************************************** //*
    const resAurora = await BeneficiariesConsolidate
      .query()
      .where("id", Number(idBeneficiary))
      .preload("cuts")
      .preload("programs")
      .orderBy("id", "asc");
    //Solo "debería" traer uno pero, tratemos como array para una manipulación más simple.
    const convertResAurora = resAurora.map((i) => i.serialize() as InitialBeneficiaryInformation);

    if(!resAurora || resAurora == null) return { array: [null] as any[], meta: meta_error };
    const getLegalPeriod: string[] = convertResAurora[0].legalPeriod.split('-');
    const legalPeriodConvert: number = Number(getLegalPeriod[0]+getLegalPeriod[1]); //Para pasarlo de 2023-1 a un 20231 (Número validable)

    //* ******************************************** //*
    //* ** Traigamos los reglamentos para validar ** //*
    //* ******************************************** //*
    const getReglaments = await Reglament
      .query()
      .where("program", convertResAurora[0].idProgram);

    if(!getReglaments || getReglaments == null) return { array: [null] as any[], meta: meta_error };

    const convertReglaments = getReglaments.map((i) => i.serialize() as IReglamentInterface);
    let objReglament: IReglamentInterface | null = null; //Solo debería traer un reglamento.

    for (const regl of convertReglaments) {

      let initialPeriodNumber: number = 0;
      let endPeriodNumber: number = 0;

      //Como hay inconsistencias en la BD (28/11/2023) para capturar el error
      try {

        const initialPeriod: string[] = regl.initialPeriod.split('-');
        const endPeriod: string[] = regl.endPeriod.split('-');

        initialPeriodNumber = Number(initialPeriod[0]+initialPeriod[1]);
        endPeriodNumber = Number(endPeriod[0]+endPeriod[1]);

        if( isNaN(initialPeriodNumber) ) initialPeriodNumber = 0;
        if( isNaN(endPeriodNumber) ) endPeriodNumber = 0;

      } catch (error) {

        initialPeriodNumber = 0;
        endPeriodNumber = 0;

      }

      if(initialPeriodNumber !== 0 && endPeriodNumber !== 0){
        if( legalPeriodConvert >= initialPeriodNumber || legalPeriodConvert <= endPeriodNumber ){
          objReglament = regl;
        }
      }

    }

    if( !objReglament || objReglament == null ) return { array: [null] as any[], meta: meta_error };

    //* ************************************************************ //*
    //* *** Ahora, debemos buscar los requisitos del reglamento  *** //*
    //* ************************************************************ //*
    const requirements = await Requeriment
      .query()
      .where("codReglament", objReglament.id);

    const convertRequirements = requirements.map((i) => i.serialize() as IRequerimentInterface);
    let listRequerimentsActual: IRequerimentsResultSimple[] = [];

    //* ************************************************************ //*
    //* *** Ahora, nos traemos los requisitos consolidados para  *** //*
    //* *** el beneficiario, se tienen varios escenarios:        *** //*
    //* ************************************************************ //*
    const beneficiaryUse: number = Number(convertResAurora[0].id);
    const reglamentUse: number = Number(objReglament.id);
    const accomplishedStatic: boolean = false;

    const getRequirementsConsolidate = await RequirementsConsolidate
      .query()
      .where("idBeneficiary", beneficiaryUse)
      .andWhere("idReglament", reglamentUse)

    const convertRequirementConsolidate = getRequirementsConsolidate.map((i) => i.serialize() as IRequerimentsResultSimple);

    //? (Escenario 1). No se tenían requisitos consolidados ingresados
    if( convertRequirementConsolidate.length === 0 ){

      for (const req of convertRequirements) {

        const objResult: IRequerimentsResultSimple = {

          idBeneficiary: Number(beneficiaryUse),
          idReglament: Number(reglamentUse),
          idRequirement: Number(req.id),
          descriptionRequirement: req.description,
          activeRequirement: Boolean(req.status),
          percentRequirement: Number(req.percent) | null!,
          accomplished: accomplishedStatic,

        }

        const toCreate = new RequirementsConsolidate();
        toCreate.fill({ ...objResult });
        await toCreate.save();

        listRequerimentsActual.push(objResult);

      }

      const meta = {
        total: listRequerimentsActual.length,
        total_general: listRequerimentsActual.length,
        per_page: perPage,
        current_page: page,
        last_page: Math.ceil(listRequerimentsActual.length / perPage),
      };

      return { array: listRequerimentsActual as IRequerimentsResultSimple[], meta };

    }

    //? (Escenario 2). Se tenían requisitos consolidados (También chequear los valores existentes)
    if( convertRequirementConsolidate.length !== 0 ){

      let arrayRegisterActual: IRequerimentsResultSimple[] = [];
      let arrayRegisterNews: IRequerimentsResultSimple[] = [];
      let arrayConcatedFinally: IRequerimentsResultSimple[] = [];

      for (const req of convertRequirements) {

        let band: boolean = false;
        let historyIdBeneficiary: number = 0;
        let historyIdReglament: number = 0;
        let historyIdRequirement: number = 0;
        let historyDescriptionRequirement: string = "";
        let historyActiveRequirement: boolean = false;
        let historyPercentRequirement: number = 0;
        let historyAccomplished: boolean = false;

        for (const reqCon of convertRequirementConsolidate) {

          if(reqCon.idRequirement === req.id){

            band = true;
            historyIdBeneficiary = reqCon.idBeneficiary;
            historyIdReglament = reqCon.idReglament;
            historyIdRequirement = reqCon.idRequirement;
            historyDescriptionRequirement = req.description;
            historyActiveRequirement = Boolean(req.status);
            historyPercentRequirement = Number(req.percent) | null!;
            historyAccomplished = Boolean(reqCon.accomplished);

          }

        }

        if ( band ){

          const obj: IRequerimentsResultSimple = {
            idBeneficiary: historyIdBeneficiary,
            idReglament: historyIdReglament,
            idRequirement: historyIdRequirement,
            descriptionRequirement: historyDescriptionRequirement,
            activeRequirement: historyActiveRequirement,
            percentRequirement: historyPercentRequirement,
            accomplished: historyAccomplished
          }

          arrayRegisterActual.push(obj);

        }else{

          const obj: IRequerimentsResultSimple = {
            idBeneficiary: beneficiaryUse,
            idReglament: reglamentUse,
            idRequirement: Number(req.id),
            descriptionRequirement: req.description,
            activeRequirement: Boolean(req.status),
            percentRequirement: Number(req.percent) | null!,
            accomplished: Boolean(false)
          }

          arrayRegisterNews.push(obj);

        }

      }

      //Juntamos los nuevos resultados
      arrayConcatedFinally = arrayRegisterActual.concat(arrayRegisterNews);

      //Ahora, eliminemos los que teníamos y registremos nuevamente pero con la nueva data
      for (const delActual of convertRequirementConsolidate) {

        const deleteData = await RequirementsConsolidate.findBy("idBeneficiary", delActual.idBeneficiary);
        if( deleteData && deleteData !== null && deleteData !== undefined ) await deleteData.delete();

      }

      //Re ingresemos la información con la data que debe de ser:
      for (const addUpdate of arrayConcatedFinally) {

        const reCreate = new RequirementsConsolidate();
        reCreate.fill({ ...addUpdate });
        await reCreate.save();

      }

      const meta = {
        total: arrayConcatedFinally.length,
        total_general: arrayConcatedFinally.length,
        per_page: perPage,
        current_page: page,
        last_page: Math.ceil(arrayConcatedFinally.length / perPage),
      };

      return { array: arrayRegisterActual as IRequerimentsResultSimple[], meta };

    }

    const arrayTest: any[] = ["ERROR"];

    const meta = {
      total: arrayTest.length,
      total_general: arrayTest.length,
      per_page: perPage,
      current_page: page,
      last_page: Math.ceil(arrayTest.length / perPage),
    };

    return { array: arrayTest as any[], meta };

  }

}
