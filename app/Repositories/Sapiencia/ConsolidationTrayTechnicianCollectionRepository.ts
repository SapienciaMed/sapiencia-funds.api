import axios, { AxiosInstance } from "axios";
// import Database from "@ioc:Adonis/Lucid/Database";
import {
  IConsolidationTray,
  IConsolidationTrayParams,
  IConsolidationTrayForTransactions,
  InitialBeneficiaryInformation,
  ICitizenAttentionDataExternal,
  IPqrsdfResultSimple,
  IPqrsdfResult,
  IRequerimentsResultSimple,
  IComplianceAssignment,
  IApplyKnowledgeTransfer,
  IChageStatusKnowledgeTransfer
} from '../../Interfaces/ConsolidationTrayInterface';
import { IRequerimentInterface } from '../../Interfaces/IRequerimentInterface';
import { IReglamentInterface } from '../../Interfaces/IReglamentInterface';
import { ICutInterface } from '../../Interfaces/CutInterface';

import { IPagingData } from "App/Utils/ApiResponses";

import BeneficiariesConsolidate from '../../Models/BeneficiariesConsolidate';
import Cut from '../../Models/Cut';
import Reglament from '../../Models/Reglament';
import Requeriment from '../../Models/Requeriment';
import RequirementsConsolidate from '../../Models/RequirementsConsolidate';
import KnowledgeTransfer from '../../Models/KnowledgeTransfer';


export interface IConsolidationTrayRepository {

  getHellow(filters: IConsolidationTray): Promise<any>;

  //* ************************************************************* *//
  //* ********** TEMAS DEL BANDEJA TÉCNICO PASO AL COBRO ********** *//
  //* ************************************************************* *//
  geConsolidationTray(filters: IConsolidationTray): Promise<IPagingData<IConsolidationTrayParams>>;
  getCutGeneric(): Promise<ICutInterface[] | null>;
  geConsolidationTrayByCut(filters: IConsolidationTray): Promise<IPagingData<IConsolidationTrayParams>>;
  geBeneficiaryById(id: number): Promise<IConsolidationTrayParams | null>;
  updateCutBeneficiary(data: IConsolidationTrayForTransactions): Promise<IConsolidationTrayParams | null>;

  //* ********************************************* *//
  //* ********** TEMAS DEL TAB DE PQRSDF ********** *//
  //* ********************************************* *//
  getPQRSDFExternal(filters: IConsolidationTray): Promise<IPagingData<IPqrsdfResultSimple>>;

  //* ************************************************* *//
  //* ********** TEMAS DEL TAB DE REQUISITOS ********** *//
  //* ************************************************* *//
  getRequirementsByBeneficiary(filters: IConsolidationTray): Promise<boolean>;
  getRequirementsByBeneficiaryList(filters: IConsolidationTray): Promise<IPagingData<IRequerimentsResultSimple>>;
  complianceAssignmentBeneficiary(data: IComplianceAssignment[]): Promise<IComplianceAssignment[] | null>;

  //* ******************************************************************* *//
  //* ********** TEMAS DE TAB DE TRANSFERENCIA DE CONOCIMIENTO ********** *//
  //* ******************************************************************* *//
  getKnowledgeTransferByBeneficiary(filters: IConsolidationTray): Promise<IPagingData<IApplyKnowledgeTransfer> | boolean>;
  changeApproveOrRejectKnowledgeTransfer(data: IChageStatusKnowledgeTransfer): Promise<IApplyKnowledgeTransfer | boolean>;
  getRequirementsKnowledgeTransfer(beneficiary: number): Promise<IRequerimentsResultSimple[] | null>;

}

export default class ConsolidationTrayTechnicianCollectionRepository implements IConsolidationTrayRepository {

  private axiosInstance: AxiosInstance;

  constructor() {
    //**Instanciamos Axios para atención ciudadana */
    this.axiosInstance = axios.create({
      baseURL: process.env.URL_API_CITIZEN_ATTENTION,
    });

  }

  async getHellow(filters: IConsolidationTray): Promise<any> {

    console.log({ filters })
    return "Hola a todos";

  }

  async geConsolidationTray(filters: IConsolidationTray): Promise<IPagingData<IConsolidationTrayParams | any>> {

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
    const { page, perPage, statusPaccSearch } = filters;
    let infoPaginated: IConsolidationTrayParams[] = [];
    const infoWithCutAndProgram: IConsolidationTrayParams[] = [];

    //* ************************************* //*
    //* Aplicamos paginación de manera manual //*
    //* ************************************* //*
    const start: number = (page! - 1) * perPage!;
    const end: number = start + perPage!;

    //* ******************************************** //*
    //* Ordenemos por el corte según la fecha actual //*
    //* ******************************************** //*
    for (const data of convertResAurora) {

      if (data.statusPacc.id === statusPaccSearch) {

        const getNumericDateNow: number = Date.parse(Date());
        const getNumericDateIncomeCut: number = Date.parse(data.cuts.from);
        const getNumericDateFinallyCut: number = Date.parse(data.cuts.until);

        if (getNumericDateNow >= getNumericDateIncomeCut && getNumericDateNow <= getNumericDateFinallyCut) {

          const objParams: IConsolidationTrayParams = {
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
      last_page: Math.ceil(infoWithCutAndProgram.length / perPage!),
    };

    return { array: infoPaginated as IConsolidationTrayParams[], meta };

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

  async geConsolidationTrayByCut(filters: IConsolidationTray): Promise<IPagingData<IConsolidationTrayParams>> {

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

    let infoFiltered: IConsolidationTrayParams[] = [];
    let infoAllData: IConsolidationTrayParams[] = [];
    let infoPaginated: IConsolidationTrayParams[] = [];

    //* ************************************* //*
    //* Aplicamos paginación de manera manual //*
    //* ************************************* //*
    const { searchParam, cutParamName, cutParamId, page, perPage, statusPaccSearch } = filters;
    const start: number = (page! - 1) * perPage!;
    const end: number = start + perPage!;

    //* ************************************************************************ //*
    //* **** Ordenemos por el corte que llega de parámetro                       //*
    //* **** Contravalidamos si llega la opción de 'TODOS' sin importar corte    //*
    //* ************************************************************************ //*
    for (const data of convertResAurora) {

      //Solo podemos proceder SII si es Técnico Pacc
      if (data.statusPacc.id === statusPaccSearch) {

        const objParams: IConsolidationTrayParams = {
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

        if (!cutParamName || cutParamName == null || cutParamName == "") {

          if (data.cuts.id === cutParamId) {

            infoFiltered.push(objParams);

          }

        } else {

          if (cutParamName === "TODOS") {

            infoAllData.push(objParams);

          }

        }

      }

    }

    //* ******************************************************** //*
    //* Defino que tipo de filtro usaré del condicional anterior //*
    //* ******************************************************** //*
    let filterForSearch: IConsolidationTrayParams[] = [];

    if (cutParamName && cutParamName !== "" && cutParamName === "TODOS") {
      filterForSearch = infoAllData;
    } else {
      filterForSearch = infoFiltered;
    }

    //* ******************************************** //*
    //* Revisamos si vienen elementos para consultar //*
    //* ******************************************** //*
    let totalDataContent: number = 0;
    if (searchParam && searchParam !== null && searchParam !== "") {

      const filter: IConsolidationTrayParams[] =

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

    } else {

      infoPaginated = filterForSearch.slice(start, end);
      totalDataContent = infoPaginated.length;

    }

    const meta = {
      total: totalDataContent,
      total_general: filterForSearch.length,
      per_page: perPage,
      current_page: page,
      last_page: Math.ceil(totalDataContent / perPage!),
    };

    return { array: infoPaginated as IConsolidationTrayParams[], meta };

  }

  async geBeneficiaryById(id: number): Promise<IConsolidationTrayParams | null> {

    const resAurora = await BeneficiariesConsolidate
      .query()
      .where("id", id)
      .preload("cuts")
      .preload("programs")
      .preload("statusPacc")
      .orderBy("id", "asc");
    const convertResAurora = resAurora.map((i) => i.serialize() as InitialBeneficiaryInformation);

    if (convertResAurora.length === 0) return null;

    const objResult: IConsolidationTrayParams = {
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

  async updateCutBeneficiary(data: IConsolidationTrayForTransactions): Promise<IConsolidationTrayParams | null> {

    const { id, cut } = data;

    if (!id || id == null || id == undefined ||
      !cut || cut == null || cut == undefined) return null;

    const toBeneficiary = await BeneficiariesConsolidate.find(id);

    if (!toBeneficiary) {
      return null;
    }

    toBeneficiary.idCut = Number(cut);
    await toBeneficiary.save();

    return toBeneficiary.serialize() as IConsolidationTrayParams;

  }

  async getPQRSDFExternal(filters: IConsolidationTray): Promise<IPagingData<IPqrsdfResultSimple>> {

    const urlConsumer = `/api/v1/pqrsdf/get-paginated/`;
    const resultFilter: IPqrsdfResultSimple[] = [];

    const privateFiltersForCitizen: IConsolidationTray = {
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

    dataCaptured.forEach((pqrsdf) => {

      let program: string = "";
      let clasify: string = "";
      let reason: string = "";
      let state: string = "";
      let numberPqrsdf: number;
      let dateFiled: Date | string;
      let answerDate: Date | string;
      let answer: string = "";

      let completePath: string = "";
      let nameFile: string = "";
      let nameRoute: string = "";

      if (!pqrsdf.filingNumber || pqrsdf.filingNumber == null) {
        numberPqrsdf = 0;
      } else {
        numberPqrsdf = pqrsdf.filingNumber;
      }

      if (!pqrsdf.createdAt || pqrsdf.createdAt == null) {
        dateFiled = "";
      } else {
        dateFiled = pqrsdf.createdAt;
      }

      if (!pqrsdf.program || pqrsdf.program == null) {
        program = "";
      } else {
        program = pqrsdf.program.prg_descripcion;
      }

      if (!pqrsdf.clasification || pqrsdf.clasification == null) {
        clasify = "";
      } else {
        clasify = pqrsdf.clasification;
      }

      if (!pqrsdf.requestSubject || pqrsdf.requestSubject == null) {
        reason = "";
      } else {
        reason = pqrsdf.requestSubject!.aso_asunto;
      }

      if (!pqrsdf.status || pqrsdf.status == null) {
        state = "";
      } else {
        state = pqrsdf.status!.lep_estado;
      }

      if (!pqrsdf.answerDate || pqrsdf.answerDate == null) {
        answerDate = "";
      } else {
        answerDate = pqrsdf.answerDate;
      }

      if (!pqrsdf.answer || pqrsdf.answer == null) {
        answer = "";
      } else {
        answer = pqrsdf.answer;
      }

      if (!pqrsdf.file || pqrsdf.file == null) {
        completePath = "";
        nameFile = "";
        nameRoute = "";
      } else {
        if( pqrsdf.file.name == "" || pqrsdf.file.name.split("/")[2] == ""){
          completePath = "";
          nameFile = "";
          nameRoute = "";
        }else{
          completePath = pqrsdf.file.name;
          nameFile = pqrsdf.file.name.split("/")[2];
          nameRoute = `${pqrsdf.file.name.split("/")[0]}/${pqrsdf.file.name.split("/")[1]}`;
        }
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
        completePath,
        nameFile,
        nameRoute
      }

      resultFilter.push(objResult);

    })

    //* ************************************* //*
    //* Aplicamos paginación de manera manual //*
    //* ************************************* //*
    let infoPaginated: IPqrsdfResultSimple[] = [];

    const { page, perPage } = filters;
    const start: number = (page! - 1) * perPage!;
    const end: number = start + perPage!;

    infoPaginated = resultFilter.slice(start, end);

    const meta = {
      total: resultFilter.length,
      total_general: resultFilter.length,
      per_page: perPage,
      current_page: page,
      last_page: Math.ceil(resultFilter.length / perPage!),
    };

    return { array: infoPaginated as IPqrsdfResultSimple[], meta };

  }

  async getRequirementsByBeneficiary(filters: IConsolidationTray): Promise<boolean> {

    const { idBeneficiary } = filters;

    //* **************************************** //*
    //* ** Traigamos el beneficiario asociado ** //*
    //* **************************************** //*
    const resAurora = await BeneficiariesConsolidate
      .query()
      .where("id", Number(idBeneficiary))
      .preload("cuts")
      .preload("programs")
      .preload("statusPacc")
      .orderBy("id", "asc");
    //Solo "debería" traer uno pero, tratemos como array para una manipulación más simple.
    const convertResAurora = resAurora.map((i) => i.serialize() as InitialBeneficiaryInformation);

    if (!resAurora || resAurora == null) return false;
    const getLegalPeriod: string[] = convertResAurora[0].legalPeriod.split('-');
    const legalPeriodConvert: number = Number(getLegalPeriod[0] + getLegalPeriod[1]); //Para pasarlo de 2023-1 a un 20231 (Número validable)

    //* ******************************************** //*
    //* ** Traigamos los reglamentos para validar ** //*
    //* ******************************************** //*
    const getReglaments = await Reglament
      .query()
      .where("program", convertResAurora[0].idProgram);

    if (!getReglaments || getReglaments == null) return false;

    const convertReglaments = getReglaments.map((i) => i.serialize() as IReglamentInterface);
    let objReglament: IReglamentInterface | null = null; //Solo debería traer un reglamento.

    for (const regl of convertReglaments) {

      let initialPeriodNumber: number = 0;
      let endPeriodNumber: number = 0;

      //Como hay inconsistencias en la BD (28/11/2023) para capturar el error
      try {

        const initialPeriod: string[] = regl.initialPeriod.split('-');
        const endPeriod: string[] = regl.endPeriod.split('-');

        initialPeriodNumber = Number(initialPeriod[0] + initialPeriod[1]);
        endPeriodNumber = Number(endPeriod[0] + endPeriod[1]);

        if (isNaN(initialPeriodNumber)) initialPeriodNumber = 0;
        if (isNaN(endPeriodNumber)) endPeriodNumber = 0;

      } catch (error) {

        initialPeriodNumber = 0;
        endPeriodNumber = 0;

      }

      if (initialPeriodNumber !== 0 && endPeriodNumber !== 0) {
        if (legalPeriodConvert >= initialPeriodNumber || legalPeriodConvert <= endPeriodNumber) {
          objReglament = regl;
        }
      }

    }

    if (!objReglament || objReglament == null) return false;

    //* ************************************************************ //*
    //* *** Ahora, debemos buscar los requisitos del reglamento  *** //*
    //* ************************************************************ //*
    const requirements = await Requeriment
      .query()
      .where("codReglament", objReglament.id);

    const convertRequirements = requirements.map((i) => i.serialize() as IRequerimentInterface);
    let listRequerimentsActual: IRequerimentsResultSimple[] = [];

    //* *************************************************************************** //*
    //* *** Ahora, nos traemos los requisitos consolidados para el beneficiario *** //*
    //* *************************************************************************** //*
    const beneficiaryUse: number = Number(convertResAurora[0].id);
    const reglamentUse: number = Number(objReglament.id);
    const accomplishedStatic: boolean = false;

    const getRequirementsConsolidate = await RequirementsConsolidate
      .query()
      .where("idBeneficiary", beneficiaryUse)
      .andWhere("idReglament", reglamentUse)

    const convertRequirementConsolidate = getRequirementsConsolidate.map((i) => i.serialize() as IRequerimentsResultSimple);

    //* ************************************************************************************************************************* //*
    //* *** Dividiremos el tema en 4 escenarios, si ya no se encuentra en los requerimientos del reglamento                   *** //*
    //* *** procederemos a eliminarlo, si aún se encuentra actualizamos descripciones, porcentajes y estados si es requerido, *** //*
    //* *** así como el caso si es un requerimiento totalmente nuevo y debemos anexarlo simplemente, finalmente, el ultimo    *** //*
    //* *** caso sería si nunca se ha guardado requisitos de consolidación, aquí se agrega totalmente normal,:                *** //*
    //* ************************************************************************************************************************* //*

    //? No se había registrado nunca, escenario más sencillo:
    if(convertRequirementConsolidate.length === 0){

      for (const req of convertRequirements) {

        const objResult: IRequerimentsResultSimple = {

          idBeneficiary: Number(beneficiaryUse),
          idReglament: Number(reglamentUse),
          idRequirement: Number(req.id),
          descriptionRequirement: req.description,
          activeRequirement: req.active!,
          percentRequirement: Number(req.percent) | null!,
          accomplished: accomplishedStatic,
          mandatoryFor: req.mandatoryFor

        }

        const toCreate = new RequirementsConsolidate();
        toCreate.fill({ ...objResult });
        await toCreate.save();

        listRequerimentsActual.push(objResult);

      }

      return true;

    }

    //? Validamos si Encontramos requisito en consolidado (Modificación) y si No encontramos requisito en consolidado (Agregado)
    for (const iterRequirementOfReg1 of convertRequirements) {

      let controlBand: boolean = false;

      for (const iterRequirementConsolid1 of convertRequirementConsolidate) {

        //Solamente modifico si es el caso
        if(iterRequirementOfReg1.id === iterRequirementConsolid1.idRequirement){

          const toUpdate = await RequirementsConsolidate.findBy("id", iterRequirementConsolid1.id);
          if (!toUpdate) return false;

          console.log(iterRequirementOfReg1.mandatoryFor);

          toUpdate.idBeneficiary = iterRequirementConsolid1.idBeneficiary;
          toUpdate.idReglament = iterRequirementConsolid1.idReglament;
          toUpdate.idRequirement = iterRequirementConsolid1.idRequirement;
          toUpdate.descriptionRequirement = iterRequirementOfReg1.description;
          toUpdate.activeRequirement = iterRequirementOfReg1.active!;
          toUpdate.percentRequirement = Number(iterRequirementOfReg1.percent);
          toUpdate.accomplished = iterRequirementConsolid1.accomplished!;
          toUpdate.mandatoryFor = iterRequirementOfReg1.mandatoryFor!;
          await toUpdate.save();
          controlBand = true;

        }

      }

      //No hallamos el elemento, entonces debemos agregar
      if( !controlBand ) {

        const objResult: IRequerimentsResultSimple = {

          idBeneficiary: Number(beneficiaryUse),
          idReglament: Number(reglamentUse),
          idRequirement: Number(iterRequirementOfReg1.id),
          descriptionRequirement: iterRequirementOfReg1.description,
          activeRequirement: iterRequirementOfReg1.active!,
          percentRequirement: Number(iterRequirementOfReg1.percent) | null!,
          accomplished: false,
          mandatoryFor: iterRequirementOfReg1.mandatoryFor

        }

        const toCreate = new RequirementsConsolidate();
        toCreate.fill({ ...objResult });
        await toCreate.save();

      }

    }

    //? Validamos si No encontramos consolidado en requisito (Eliminamos)
    for (const iterRequirementConsolid1 of convertRequirementConsolidate){

      let controlBand: boolean = false;

      for (const iterRequirementOfReg1 of convertRequirements) {

        //Solo elimino sino encuentro
        if(iterRequirementConsolid1.idRequirement === iterRequirementOfReg1.id)
          controlBand = true;

      }

      if( !controlBand ){

        const deleteData = await RequirementsConsolidate.findBy("id", iterRequirementConsolid1.id);
        if (deleteData && deleteData !== null && deleteData !== undefined)
          await deleteData.delete();

      }

    }

    return true;

  }

  async getRequirementsByBeneficiaryList(filters: IConsolidationTray): Promise<IPagingData<IRequerimentsResultSimple>> {

    const { idBeneficiary, page, perPage } = filters;
    let infoPaginated: IRequerimentsResultSimple[] = [];

    const getRequirementsConsolidate = await RequirementsConsolidate
      .query()
      .where("idBeneficiary", Number(idBeneficiary))

    const convertResAurora = getRequirementsConsolidate.map((i) => i.serialize() as IRequerimentsResultSimple);

    const start: number = (page! - 1) * perPage!;
    const end: number = start + perPage!;
    infoPaginated = convertResAurora.slice(start, end);

    const meta = {
      total: convertResAurora.length,
      per_page: perPage,
      current_page: page,
      last_page: Math.ceil(convertResAurora.length / perPage!),
    };

    return { array: infoPaginated as IRequerimentsResultSimple[], meta };

  }

  async complianceAssignmentBeneficiary(data: IComplianceAssignment[]): Promise<IComplianceAssignment[] | null> {

    let arrayResult: IComplianceAssignment[] = [];
    for (const iter of data) {

      const toUpdate = await RequirementsConsolidate.findBy("id", iter.idRequirementConsolidate);
      if (!toUpdate) return null;

      toUpdate.accomplished = iter.newStatus;
      await toUpdate.save();

      arrayResult.push(iter)

    }

    if( arrayResult.length <= 0 ){
      return null;
    }else{
      return arrayResult;
    }

  }

  async getKnowledgeTransferByBeneficiary(filters: IConsolidationTray): Promise<IPagingData<IApplyKnowledgeTransfer> | boolean> {

    const { idBeneficiary } = filters;

    //* **************************************** //*
    //* ** Traigamos el beneficiario asociado ** //*
    //* **************************************** //*
    const resAurora = await BeneficiariesConsolidate
      .query()
      .where("id", Number(idBeneficiary))
      .preload("cuts")
      .preload("programs")
      .preload("statusPacc")
      .orderBy("id", "asc");

    //Solo "debería" traer uno pero, tratemos como array para una manipulación más simple.
    const convertResAurora = resAurora.map((i) => i.serialize() as InitialBeneficiaryInformation);

    if (!resAurora || resAurora == null) return false;
    const getLegalPeriod: string[] = convertResAurora[0].legalPeriod.split('-');
    const legalPeriodConvert: number = Number(getLegalPeriod[0] + getLegalPeriod[1]); //Para pasarlo de 2023-1 a un 20231 (Número validable)

    //* ******************************************** //*
    //* ** Traigamos los reglamentos para validar ** //*
    //* ******************************************** //*
    const getReglaments = await Reglament
      .query()
      .where("program", convertResAurora[0].idProgram);

    if (!getReglaments || getReglaments == null) return false;

    const convertReglaments = getReglaments.map((i) => i.serialize() as IReglamentInterface);
    let objReglament: IReglamentInterface | null = null; //Solo debería traer un reglamento.

    for (const regl of convertReglaments) {

      let initialPeriodNumber: number = 0;
      let endPeriodNumber: number = 0;

      //Como hay inconsistencias en la BD (02/12/2023) para capturar el error
      try {

        const initialPeriod: string[] = regl.initialPeriod.split('-');
        const endPeriod: string[] = regl.endPeriod.split('-');

        initialPeriodNumber = Number(initialPeriod[0] + initialPeriod[1]);
        endPeriodNumber = Number(endPeriod[0] + endPeriod[1]);

        if (isNaN(initialPeriodNumber)) initialPeriodNumber = 0;
        if (isNaN(endPeriodNumber)) endPeriodNumber = 0;

      } catch (error) {

        initialPeriodNumber = 0;
        endPeriodNumber = 0;

      }

      if (initialPeriodNumber !== 0 && endPeriodNumber !== 0) {
        if (legalPeriodConvert >= initialPeriodNumber || legalPeriodConvert <= endPeriodNumber) {
          objReglament = regl;
        }
      }

    }

    if (!objReglament || objReglament == null) return false;

    //* ***************************************************************** //*
    //* ** Verifiquemos si aplica transferencia de conocimiento        ** //*
    //* ** Si aplica, verificamos en las tablas y ubicamos el registro ** //*
    //* ** Si aún no hay registro, lo creamos entonces para gestionar  ** //*
    //* ***************************************************************** //*
    const { user, page, perPage } = filters;
    const idBeneficiaryForApplyKnowledge: number = convertResAurora[0].id;
    const beneficiaryStatusForApplyKnowledge: number = Number(convertResAurora[0].statusPacc.id);
    const applyKnowledgeTransferPercent: number = objReglament.knowledgeTransferPercentage;
    const applyKnowledgeTransferHours: number = objReglament.knowledgeTransferHours;
    let infoPaginated: IApplyKnowledgeTransfer[] = [];

    const getKnowledgeTransferByBeneficiary = await KnowledgeTransfer
      .query()
      .where('idBeneficiary', idBeneficiaryForApplyKnowledge);

    const convertResAuroraKnowledgeTransferByBeneficiary = getKnowledgeTransferByBeneficiary.map((i) => i.serialize() as IApplyKnowledgeTransfer);

    //Si no tiene data, agregamos la transferencia de conocimiento por defecto.
    if( !convertResAuroraKnowledgeTransferByBeneficiary || convertResAuroraKnowledgeTransferByBeneficiary.length === 0 ){

      const objBody: IApplyKnowledgeTransfer = {
        idBeneficiary: idBeneficiaryForApplyKnowledge,
        idReglament: objReglament.id,
        committedHours: applyKnowledgeTransferHours,
        workedHours: 0,
        pendingHours: applyKnowledgeTransferHours,
        percentTransfer: applyKnowledgeTransferPercent,
        status: false,
        idStatusProcessPacc: beneficiaryStatusForApplyKnowledge,
        observations: "Ninguna",
        userCreate: user!,
        dateCreate: new Date()
      }

      const toCreate = new KnowledgeTransfer();
      toCreate.fill({ ...objBody });
      await toCreate.save();

      const getKnowledgeTransger = await KnowledgeTransfer.query().where("id", Number(toCreate.id));
      if( !getKnowledgeTransger || getKnowledgeTransger == null ) return false;
      const resultCreate = getKnowledgeTransger.map((i) => i.serialize() as IApplyKnowledgeTransfer);

      const start: number = (page! - 1) * perPage!;
      const end: number = start + perPage!;
      infoPaginated = resultCreate.slice(start, end);

      const meta = {
        total: convertResAurora.length,
        per_page: perPage,
        current_page: page,
        last_page: Math.ceil(convertResAurora.length / perPage!),
      };

      return { array: infoPaginated as IApplyKnowledgeTransfer[], meta };

    }else{

      //* ****************************************************** *//
      //* ***** Vamos a calcular según los que ya tengamos ***** *//
      //* ****************************************************** *//
      const endElementRegister: IApplyKnowledgeTransfer =
        convertResAuroraKnowledgeTransferByBeneficiary[convertResAuroraKnowledgeTransferByBeneficiary.length - 1];

      const objResult: IApplyKnowledgeTransfer = {

        id: endElementRegister.id,
        idBeneficiary: endElementRegister.idBeneficiary,
        idReglament: endElementRegister.idReglament,
        committedHours: endElementRegister.committedHours,
        workedHours: endElementRegister.workedHours,
        pendingHours: endElementRegister.pendingHours,
        percentTransfer: endElementRegister.percentTransfer,
        status: endElementRegister.status,
        idStatusProcessPacc: endElementRegister.idStatusProcessPacc,
        observations: endElementRegister.observations,
        userCreate: endElementRegister.userCreate,
        dateCreate: endElementRegister.dateCreate,

      }

      infoPaginated = Array(objResult);

      const meta = {
        total: 1,
        per_page: perPage,
        current_page: page,
        last_page: 1,
      };

      return { array: infoPaginated as IApplyKnowledgeTransfer[], meta };

    }

  }

  async changeApproveOrRejectKnowledgeTransfer(data: IChageStatusKnowledgeTransfer): Promise<IApplyKnowledgeTransfer | boolean> {

    const { id, idBeneficiary, status, observations, user } = data;

    //* **************************************************************************** *//
    //* ************ Primero ubiquemos la transferencia de conocimiento ************ *//
    //* ***** Posteriormente ubiquemos la beneficiario para obtener info extra ***** *//
    //* **************************************************************************** *//
    const getKnowledgeTransfer = await KnowledgeTransfer
      .query()
      .where("id", id)
      .andWhere("idBeneficiary", idBeneficiary); //Solo de a uno.

    const getBeneficiary = await BeneficiariesConsolidate
      .query()
      .where("id", Number(idBeneficiary))
      .preload("cuts")
      .preload("programs")
      .preload("statusPacc")
      .orderBy("id", "asc");

    if( !getKnowledgeTransfer || getKnowledgeTransfer == null ) return false;
    const convertGetKnowledgeTransfer = getKnowledgeTransfer.map((i) => i.serialize() as IApplyKnowledgeTransfer);

    if( !getBeneficiary || getBeneficiary == null ) return false;
    const convertGetBeneficiary = getBeneficiary.map((i) => i.serialize() as InitialBeneficiaryInformation);

    //* Separamos los valores para que sean más manipulables
    const plusCommittedHours: number = convertGetKnowledgeTransfer[0].committedHours;
    const plusValuesWorked: number = data.workedHours;
    const plusValuesPending: number = plusCommittedHours - data.workedHours;

    if( plusValuesWorked > plusCommittedHours || plusValuesWorked < 0) return false;
    if( plusValuesPending > plusCommittedHours || plusValuesPending < 0) return false;


    const objUpdate: IApplyKnowledgeTransfer = {
      idBeneficiary: idBeneficiary,
      idReglament: convertGetKnowledgeTransfer[0].idReglament,
      committedHours: plusCommittedHours,
      workedHours: plusValuesWorked,
      pendingHours: plusValuesPending,
      percentTransfer: convertGetKnowledgeTransfer[0].percentTransfer,
      status: status,
      idStatusProcessPacc: convertGetBeneficiary[0].statusPacc.id,
      observations: observations,
      userCreate: user,
      dateCreate: new Date()
    }

    const toUpdate = await KnowledgeTransfer.find(id);
    if( !toUpdate || toUpdate == null || toUpdate == undefined ) return false;
    toUpdate.fill({ id , ...objUpdate });
    await toUpdate.save();

    return true;

  }

  async getRequirementsKnowledgeTransfer(beneficiary: number): Promise<IRequerimentsResultSimple[] | null> {

    const getRequirementsConsolidate = await RequirementsConsolidate
      .query()
      .where("idBeneficiary", beneficiary)
      .andWhere("mandatoryFor", "Transferencia de conocimiento")

    const convertResult = getRequirementsConsolidate.map((i) => i.serialize() as IRequerimentsResultSimple);

    return convertResult;

  }

}

