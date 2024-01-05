import { IFiltersForReglament,
         ICallPeriodSapi,
         IReglamentConsolidation,
         IReglamentMiniForValidRanges,
         IValidDatesAndProgramReglament,
         IPerformanceStructure,
         ITableMicroStructure,
         IRequirementsForReglament,
         IReglamentConsolidationSave } from '../Interfaces/SapienciaGenericInterface';

import { IPagingData } from '../Utils/ApiResponses';

import CallPeriod from '../Models/Sapiencia/CallPeriod';
import Reglament from '../Models/Reglament';
import Requeriment from '../Models/Requeriment';
import { ICondonationPercent } from '../Interfaces/SapienciaGenericInterface';

export interface IReglamentConsolidationRepository {

  getPeriodsSapi(): Promise<ICallPeriodSapi[]>;
  getReglamentPaginate(filters: IFiltersForReglament): Promise<IPagingData<IReglamentConsolidation>>;
  getReglamentById(id: number): Promise<IReglamentConsolidation[] | null>;
  createReglament(data: IReglamentConsolidation): Promise<IReglamentConsolidation | string>;
  updateReglament(data: IReglamentConsolidation, id: number): Promise<IReglamentConsolidation | string>;

}

export default class ReglamentConsolidationRepository implements IReglamentConsolidationRepository {

  async getPeriodsSapi(): Promise<ICallPeriodSapi[]> {

    const getPeriods = await CallPeriod.query().orderBy('name', 'desc');
    const convertResult = getPeriods.map((i) => i.serialize() as ICallPeriodSapi);
    let arrayResult: ICallPeriodSapi[] = [];

    //* Vamos a realizar la conversión para el texto
    for (const iterConvert of convertResult) {

      const applySplit = iterConvert.name.split("-");
      const period: number = Number(applySplit[1]);
      let complementaryName: string = "";

      if( period === 1 ) complementaryName = `${iterConvert.name} (1 Enero a 30 de Junio)`;
      if( period === 2 ) complementaryName = `${iterConvert.name} (1 Julio a 31 de Diciembre)`;
      if( period !== 1 && period !== 2 ) complementaryName = `${iterConvert.name}`; //Periodos "Especiales"

      const result: ICallPeriodSapi = {
        id: iterConvert.id,
        name: iterConvert.name,
        nameComplementary: complementaryName,
        minimumSalary: iterConvert.minimumSalary,
        status: iterConvert.status
      }

      arrayResult.push(result);

    }

    return arrayResult;

  }

  async getReglamentPaginate(filters: IFiltersForReglament): Promise<IPagingData<IReglamentConsolidation>> {

    const { page , perPage } = filters;

    const res = Reglament.query();
    res.preload("programs");
    res.preload("requirements");

    if (filters.programId) {
      res.where("idProgram", Number(filters.programId));
    }

    if (filters.initialPeriod) {
      const arraySearch: string[] = filters.initialPeriod.split("-");
      const paramSearch: number = Number(`${arraySearch[0]}${arraySearch[1]}`);
      res.andWhere("initialPeriodNumber", ">=" , paramSearch);
    }

    if (filters.endPeriod) {
      const arraySearch: string[] = filters.endPeriod.split("-");
      const paramSearch: number = Number(`${arraySearch[0]}${arraySearch[1]}`);
      res.andWhere("endPeriodNumber", "<=", paramSearch);
    }

    const workerReglamentPaginated = await res.paginate( page, perPage );

    const { data, meta } = workerReglamentPaginated.serialize();
    const dataArray = data ?? [];
    const resultArray: IReglamentConsolidation[] = [];

    //Para convertir los resultados JSON
    for (const iter of dataArray) {

      let arrayConvertSocialServiceCondonationPercent: ICondonationPercent[] | string;
      let arrayConvertKnowledgeTransferCondonationPercent: ICondonationPercent[] | string;

      let arrayConvertPerformancePeriodStructure: IPerformanceStructure | string;
      let arrayConvertAccumulatedPerformanceDataTable: IPerformanceStructure | string;

      arrayConvertSocialServiceCondonationPercent = (iter.socialServiceCondonationType == "Parcial") ? JSON.parse(iter.socialServiceCondonationPercent) : "";
      arrayConvertKnowledgeTransferCondonationPercent = (iter.knowledgeTransferCondonationType == "Parcial") ? JSON.parse(iter.knowledgeTransferCondonationPercent) : "";
      arrayConvertPerformancePeriodStructure = (iter.applyCondonationPerformancePeriod) ? JSON.parse(iter.performancePeriodStructure) : "";
      arrayConvertAccumulatedPerformanceDataTable = (iter.applyAccomulatedIncomeCondonation) ? JSON.parse(iter.accumulatedPerformanceDataTable) : "";

      const objConvertJson: IReglamentConsolidation = {
        id: iter.id,
        idProgram: iter.idProgram,
        programName: iter.programs.value,
        initialPeriod: iter.initialPeriod,
        isOpenPeriod: iter.isOpenPeriod,
        endPeriod: iter.endPeriod,

        applyTheoreticalSemiannualPercent: iter.applyTheoreticalSemiannualPercent,
        theoreticalSemiannualPercent: iter.theoreticalSemiannualPercent,

        applyAcademicPerformancePercent: iter.applyAcademicPerformancePercent,
        academicPerformancePercent: iter.academicPerformancePercent,

        applyRequirementsPercent: iter.applyRequirementsPercent,
        requirementsPercent: iter.requirementsPercent,

        applySocialService: iter.applySocialService,
        socialServicePercent: iter.socialServicePercent,
        socialServiceHours: iter.socialServiceHours,
        socialServiceCondonationType: iter.socialServiceCondonationType,
        socialServiceCondonationPercent: arrayConvertSocialServiceCondonationPercent,

        applyKnowledgeTransfer: iter.applyKnowledgeTransfer,
        knowledgeTransferPercent: iter.knowledgeTransferPercent,
        knowledgeTransferHours: iter.knowledgeTransferHours,
        knowledgeTransferCondonationType: iter.knowledgeTransferCondonationType,
        knowledgeTransferCondonationPercent: arrayConvertKnowledgeTransferCondonationPercent,

        applyGracePeriod: iter.applyGracePeriod,
        gracePeriodMonths: iter.gracePeriodMonths,
        graceDateApplication: iter.graceDateApplication,

        applyContinuousSuspension: iter.applyContinuousSuspension,
        continuosSuspencionQuantity: iter.continuosSuspencionQuantity,

        applyDiscontinuousSuspension: iter.applyDiscontinuousSuspension,
        discontinuousSuspensionQuantity: iter.discontinuousSuspensionQuantity,

        applySpecialSuspensions: iter.applySpecialSuspensions,
        specialSuspensionsQuantity: iter.specialSuspensionsQuantity,

        applyExtension: iter.applyExtension,
        extensionQuantity: iter.extensionQuantity,

        applyCondonationPerformancePeriod: iter.applyCondonationPerformancePeriod,
        performancePeriodStructure: arrayConvertPerformancePeriodStructure,

        applyAccomulatedIncomeCondonation: iter.applyAccomulatedIncomeCondonation,
        accumulatedPerformanceDataTable: arrayConvertAccumulatedPerformanceDataTable,

        requirementsForReglament: iter.requirements,

      }

      resultArray.push(objConvertJson);

    }

    return {
      array: resultArray as IReglamentConsolidation[],
      meta,
    };

  }

  async getReglamentById(id: number): Promise<IReglamentConsolidation[] | null> {

    const queryReglament = Reglament.query().where("id", id);
    queryReglament.preload("programs");
    queryReglament.preload("requirements");

    const workerReglamentPaginated = await queryReglament.paginate( 1, 9999999 );

    const { data } = workerReglamentPaginated.serialize();
    const dataArray = data ?? [];
    const resultArray: IReglamentConsolidation[] = [];

    //Para convertir los resultados JSON
    for (const iter of dataArray) {

      let arrayConvertSocialServiceCondonationPercent: ICondonationPercent[] | string;
      let arrayConvertKnowledgeTransferCondonationPercent: ICondonationPercent[] | string;

      let arrayConvertPerformancePeriodStructure: IPerformanceStructure | string;
      let arrayConvertAccumulatedPerformanceDataTable: IPerformanceStructure | string;

      arrayConvertSocialServiceCondonationPercent = (iter.socialServiceCondonationType == "Parcial") ? JSON.parse(iter.socialServiceCondonationPercent) : "";
      arrayConvertKnowledgeTransferCondonationPercent = (iter.knowledgeTransferCondonationType == "Parcial") ? JSON.parse(iter.knowledgeTransferCondonationPercent) : "";
      arrayConvertPerformancePeriodStructure = (iter.applyCondonationPerformancePeriod) ? JSON.parse(iter.performancePeriodStructure) : "";
      arrayConvertAccumulatedPerformanceDataTable = (iter.applyAccomulatedIncomeCondonation) ? JSON.parse(iter.accumulatedPerformanceDataTable) : "";

      console.log(iter.theoreticalSemiannualPercent);

      const objConvertJson: IReglamentConsolidation = {
        id: iter.id,
        idProgram: iter.idProgram,
        programName: iter.programs.value,
        initialPeriod: iter.initialPeriod,
        isOpenPeriod: iter.isOpenPeriod,
        endPeriod: iter.endPeriod,

        applyTheoreticalSemiannualPercent: iter.applyTheoreticalSemiannualPercent,
        theoreticalSemiannualPercent: iter.theoreticalSemiannualPercent,

        applyAcademicPerformancePercent: iter.applyAcademicPerformancePercent,
        academicPerformancePercent: iter.academicPerformancePercent,

        applyRequirementsPercent: iter.applyRequirementsPercent,
        requirementsPercent: iter.requirementsPercent,

        applySocialService: iter.applySocialService,
        socialServicePercent: iter.socialServicePercent,
        socialServiceHours: iter.socialServiceHours,
        socialServiceCondonationType: iter.socialServiceCondonationType,
        socialServiceCondonationPercent: arrayConvertSocialServiceCondonationPercent,

        applyKnowledgeTransfer: iter.applyKnowledgeTransfer,
        knowledgeTransferPercent: iter.knowledgeTransferPercent,
        knowledgeTransferHours: iter.knowledgeTransferHours,
        knowledgeTransferCondonationType: iter.knowledgeTransferCondonationType,
        knowledgeTransferCondonationPercent: arrayConvertKnowledgeTransferCondonationPercent,

        applyGracePeriod: iter.applyGracePeriod,
        gracePeriodMonths: iter.gracePeriodMonths,
        graceDateApplication: iter.graceDateApplication,

        applyContinuousSuspension: iter.applyContinuousSuspension,
        continuosSuspencionQuantity: iter.continuosSuspencionQuantity,

        applyDiscontinuousSuspension: iter.applyDiscontinuousSuspension,
        discontinuousSuspensionQuantity: iter.discontinuousSuspensionQuantity,

        applySpecialSuspensions: iter.applySpecialSuspensions,
        specialSuspensionsQuantity: iter.specialSuspensionsQuantity,

        applyExtension: iter.applyExtension,
        extensionQuantity: iter.extensionQuantity,

        applyCondonationPerformancePeriod: iter.applyCondonationPerformancePeriod,
        performancePeriodStructure: arrayConvertPerformancePeriodStructure,

        applyAccomulatedIncomeCondonation: iter.applyAccomulatedIncomeCondonation,
        accumulatedPerformanceDataTable: arrayConvertAccumulatedPerformanceDataTable,

        requirementsForReglament: iter.requirements,

      }

      resultArray.push(objConvertJson);

    }

    return resultArray[0] as IReglamentConsolidation[];

  }

  async createReglament(data: IReglamentConsolidation): Promise<IReglamentConsolidation | string> {

    const objGetReglament: IValidDatesAndProgramReglament = {
      idProgram: data.idProgram!,
      initialPeriod: data.initialPeriod!,
      isOpenPeriod: data.isOpenPeriod!,
      endPeriod: data.endPeriod!
    }

    // Validamos que no se encuentre ya un reglamento
    const getValidReglament: boolean = await this.reglamentValidInitial(objGetReglament);
    if( !getValidReglament ) return "Error1";

    // Validamos si aplica condonación por servicio social
    if( data.socialServiceCondonationType && data.socialServiceCondonationType != "" && data.socialServiceCondonationType != null ){
      if( data.socialServiceCondonationType === "Parcial" ){

        const info: ICondonationPercent[] = data.socialServiceCondonationPercent as ICondonationPercent[];
        const orderArray = [...info].sort(this.compareForCondonationsRanges);
        const convertStringArray: string = JSON.stringify(orderArray);
        const validRanges: boolean = this.validationForCondonationsRanges(convertStringArray);

        if( validRanges ) return "Error2";

      }
    }

    // Validamos si aplica condonación por transferencia de conocimiento
    if( data.knowledgeTransferCondonationType && data.knowledgeTransferCondonationType != "" && data.knowledgeTransferCondonationType != null ){
      if( data.knowledgeTransferCondonationType === "Parcial" ){

        const info: ICondonationPercent[] = data.knowledgeTransferCondonationPercent as ICondonationPercent[];
        const orderArray = [...info].sort(this.compareForCondonationsRanges);
        const convertStringArray: string = JSON.stringify(orderArray);
        const validRanges: boolean = this.validationForCondonationsRanges(convertStringArray);

        if( validRanges ) return "Error3";

      }
    }

    // Validamos si aplica condonación por rendimiento académico por periodo
    if( data.applyCondonationPerformancePeriod ){

      const info: IPerformanceStructure = data.performancePeriodStructure as IPerformanceStructure;
      const orderArray = [...info.dataTable].sort(this.compareForRanges);
      const objPrepare: IPerformanceStructure = {
        percentCondonation: info.percentCondonation,
        dataTable: orderArray
      }

      const convertStringArray: string = JSON.stringify(objPrepare);
      const validRanges: boolean = this.validationForRanges(convertStringArray);

      if( validRanges ) return "Error4";

    }

    // Validamos si aplica condonación por rendimiento académico final acumulado
    if( data.applyAccomulatedIncomeCondonation ){

      const info: IPerformanceStructure = data.accumulatedPerformanceDataTable as IPerformanceStructure;
      const orderArray = [...info.dataTable].sort(this.compareForRanges);
      const objPrepare: IPerformanceStructure = {
        percentCondonation: info.percentCondonation,
        dataTable: orderArray
      }

      const convertStringArray: string = JSON.stringify(objPrepare);
      const validRanges: boolean = this.validationForRanges(convertStringArray);

      if( validRanges ) return "Error5";

    }

    //Valido suma de porcentajes de servicio social, rendimiento académico, requisitos y
    //transferencia de conocimiento debe darme igual a 100%
    const getSocialServicePercent: number =
      (data.socialServicePercent == null || data.socialServicePercent == 0) ? 0 : data.socialServicePercent;

    const getAcademicPerformancePercent: number =
      (data.academicPerformancePercent == null || data.academicPerformancePercent == 0) ? 0 : data.academicPerformancePercent;

    const getRequirementsPercent: number =
      (data.requirementsPercent == null || data.requirementsPercent == 0) ? 0 : data.requirementsPercent;

    const getKnowledgeTransferPercent: number =
      (data.knowledgeTransferPercent == null || data.knowledgeTransferPercent == 0) ? 0 : data.knowledgeTransferPercent;

    const plusPercents: number = Number(getSocialServicePercent) + Number(getAcademicPerformancePercent) +
                                 Number(getRequirementsPercent) + Number(getKnowledgeTransferPercent);

    if( plusPercents !== 100 ) return "Error6";

    //Registro reglamento, aquí ya está OK.
    const saveReglament: IReglamentConsolidationSave | null = await this.saveReglamentInitial(data);
    if( !saveReglament || saveReglament == null ) return "Error7";

    // Crear requisitos asociados al reglamento
    if( data.requirementsForReglament && data.requirementsForReglament !== null ){

      for (const req of data.requirementsForReglament) {

        const objReq: IRequirementsForReglament = {
          codReglament: Number(saveReglament!.id),
          active: req.active,
          mandatoryFor: req.mandatoryFor,
          description: req.description
        }

        const toCreateReq = new Requeriment();
        toCreateReq.fill({ ...objReq });
        await toCreateReq.save();

      }

    }

    return data; //Se pasó y se registró OK.

  }

  async updateReglament(data: IReglamentConsolidation, id: number): Promise<IReglamentConsolidation | string> {

    const objGetReglament: IValidDatesAndProgramReglament = {
      idProgram: data.idProgram!,
      initialPeriod: data.initialPeriod!,
      isOpenPeriod: data.isOpenPeriod!,
      endPeriod: data.endPeriod!
    }

    // Validamos que no se encuentre ya un reglamento
    const getValidReglamentForEdit: boolean = await this.reglamentValidInitial(objGetReglament, id);
    if( !getValidReglamentForEdit ) return "Error1";

    // Validamos si aplica condonación por servicio social
    if( data.socialServiceCondonationType && data.socialServiceCondonationType != "" && data.socialServiceCondonationType != null ){
      if( data.socialServiceCondonationType === "Parcial" ){

        const info: ICondonationPercent[] = data.socialServiceCondonationPercent as ICondonationPercent[];
        const orderArrayEdit = [...info].sort(this.compareForCondonationsRanges);
        const convertStringArrayForEdition: string = JSON.stringify(orderArrayEdit);
        const validRangesEdit: boolean = this.validationForCondonationsRanges(convertStringArrayForEdition);

        if( validRangesEdit ) return "Error2";

      }
    }

    // Validamos si aplica condonación por transferencia de conocimiento
    if( data.knowledgeTransferCondonationType && data.knowledgeTransferCondonationType != "" && data.knowledgeTransferCondonationType != null ){
      if( data.knowledgeTransferCondonationType === "Parcial" ){

        const info: ICondonationPercent[] = data.knowledgeTransferCondonationPercent as ICondonationPercent[];
        const orderArray = [...info].sort(this.compareForCondonationsRanges);
        const convertStringArray: string = JSON.stringify(orderArray);
        const validRangesForEdition: boolean = this.validationForCondonationsRanges(convertStringArray);

        if( validRangesForEdition ) return "Error3";

      }
    }

    // Validamos si aplica condonación por rendimiento académico por periodo
    if( data.applyCondonationPerformancePeriod ){

      const info: IPerformanceStructure = data.performancePeriodStructure as IPerformanceStructure;
      const orderArrayEdit = [...info.dataTable].sort(this.compareForRanges);
      const objPrepare: IPerformanceStructure = {
        percentCondonation: info.percentCondonation,
        dataTable: orderArrayEdit
      }

      const convertStringArrayForEdition: string = JSON.stringify(objPrepare);
      const validRangesForEdition: boolean = this.validationForRanges(convertStringArrayForEdition);

      if( validRangesForEdition ) return "Error4";

    }

    // Validamos si aplica condonación por rendimiento académico final acumulado
    if( data.applyAccomulatedIncomeCondonation ){

      const info: IPerformanceStructure = data.accumulatedPerformanceDataTable as IPerformanceStructure;
      const orderArrayEdit = [...info.dataTable].sort(this.compareForRanges);
      const objPrepare: IPerformanceStructure = {
        percentCondonation: info.percentCondonation,
        dataTable: orderArrayEdit
      }

      const convertStringArrayForEdition: string = JSON.stringify(objPrepare);
      const validRangesForEdition: boolean = this.validationForRanges(convertStringArrayForEdition);

      if( validRangesForEdition ) return "Error5";

    }

    //Valido suma de porcentajes de servicio social, rendimiento académico, requisitos y
    //transferencia de conocimiento debe darme igual a 100%
    const getSocialServicePercentForEdition: number =
      (data.socialServicePercent == null || data.socialServicePercent == 0) ? 0 : data.socialServicePercent;

    const getAcademicPerformancePercentForEdition: number =
      (data.academicPerformancePercent == null || data.academicPerformancePercent == 0) ? 0 : data.academicPerformancePercent;

    const getRequirementsPercentForEdition: number =
      (data.requirementsPercent == null || data.requirementsPercent == 0) ? 0 : data.requirementsPercent;

    const getKnowledgeTransferPercentForEdition: number =
      (data.knowledgeTransferPercent == null || data.knowledgeTransferPercent == 0) ? 0 : data.knowledgeTransferPercent;

    const plusPercentsForEdition: number = Number(getSocialServicePercentForEdition) + Number(getAcademicPerformancePercentForEdition) +
                                 Number(getRequirementsPercentForEdition) + Number(getKnowledgeTransferPercentForEdition);

    if( plusPercentsForEdition !== 100 ) return "Error6";

    //Actualizo reglamento, aquí ya está OK.
    const updateReglament: IReglamentConsolidationSave | null = await this.updateReglamentInitial(data, id);
    if( !updateReglament || updateReglament == null ) return "Error7";

    //Actualización de requisitos
    const updateRequirements: boolean = await this.updateRequirements(data.requirementsForReglament!, id);
    if( !updateRequirements ) return "Error8";

    return { id, ...data }; //Se pasó y se actualizó OK.

  }

  async reglamentValidInitial(objGetReglament: IValidDatesAndProgramReglament, id?: number): Promise<boolean> {

    const { idProgram, initialPeriod, isOpenPeriod, endPeriod } = objGetReglament;
    let initialPeriodCompare: number = 0;
    let endPeriodCompare: number = 9999999;
    let arrayReglamentPrimary: IReglamentMiniForValidRanges[] = [];

    let getReglament = await Reglament.query();

    const convertPrimaryReglament: IReglamentConsolidation[] = getReglament.map((i) => i.serialize() as IReglamentConsolidation);

    //* Si no hay reglamentos, entonces debemos dejar pasar normalmente
    if( convertPrimaryReglament.length <= 0 ) return true;

    for (const i of convertPrimaryReglament) {

      const iOrgDate: string = i.initialPeriod!;
      const eOrgDate: string | null = ( i.isOpenPeriod ) ? null : i.endPeriod!;

      const iDate: string[] = i.initialPeriod?.split("-")!;
      const eDate: string[] | null = ( i.isOpenPeriod ) ? null : i.endPeriod?.split("-")!; //Si es periodo abierto, no aplica.

      const concactIDate: number = Number(`${iDate[0]}${iDate[1]}`);
      const concactEDate: number | null = (eDate == null) ? null : Number(`${eDate[0]}${eDate[1]}`);

      const objForValidReglaments: IReglamentMiniForValidRanges = {
        id: Number(i.id),
        idProgram: Number(i.idProgram),
        initialPeriodOrg: iOrgDate,
        endPeriodOrg: eOrgDate,
        initialPeriod: concactIDate,
        endPeriod: concactEDate
      }

      arrayReglamentPrimary.push(objForValidReglaments);

    }

    if(Boolean(isOpenPeriod)){

      const auxPeriod: string[] = initialPeriod?.split("-")!;
      initialPeriodCompare = Number(`${auxPeriod[0]}${auxPeriod[1]}`); //Pasar de, por ejemplo, 2023-1 a 20231.

    }else{

      const auxPeriod1: string[] = initialPeriod?.split("-")!;
      const auxPeriod2: string[] = endPeriod?.split("-")!;
      initialPeriodCompare = Number(`${auxPeriod1[0]}${auxPeriod1[1]}`); //Pasar de, por ejemplo, 2023-1 a 20231.
      endPeriodCompare = Number(`${auxPeriod2[0]}${auxPeriod2[1]}`); //Pasar de, por ejemplo, 2023-1 a 20231.

    }

    //Validemos si hay reglamentos que se solapan con los criterios
    //Si es el caso no lo permitirémos pasar.
    //? ***********************
    //? CREANDO EL REGLAMENTO
    //? ***********************
    if( !id ){

      for (const regl of arrayReglamentPrimary) {

        //*1. Programa:
        if( Number(regl.idProgram) === Number(idProgram) ){

          //*2. Valido rangos:
          //*2.1 Valido si es priodo abierto
          if( Boolean(isOpenPeriod) ){

            if( initialPeriodCompare >= regl.initialPeriod ) return false;

          //*2.2 Valido que sea entonces periodo cerrado (Tengo rangos)
          }else{

            const auxEndPeriod: number = (regl.endPeriod == null) ? 9999999 : regl.endPeriod;

            if( initialPeriodCompare >= regl.initialPeriod && endPeriodCompare <= auxEndPeriod ) return false;

          }

        }

      }

      return true;

    //? ***********************
    //? ACTUALIZANDO REGLAMENTO
    //? ***********************
    }else{

      for (const regl of arrayReglamentPrimary) {

        //*1. Programa:
        if( Number(regl.idProgram) === Number(idProgram) ){

          //*2. Valido rangos:
          //*2.1 Valido si es priodo abierto
          if( Boolean(isOpenPeriod) ){

            if( initialPeriodCompare >= regl.initialPeriod && regl.id !== id ) return false;

          //*2.2 Valido que sea entonces periodo cerrado (Tengo rangos)
          }else{

            const auxEndPeriod: number = (regl.endPeriod == null) ? 9999999 : regl.endPeriod;

            if( initialPeriodCompare >= regl.initialPeriod &&
                endPeriodCompare <= auxEndPeriod &&
                regl.id !== id ) return false;

          }

        }

      }

      return true;

    }

  }

  //* ********************************************************************************* *//
  //* ***************** FUNCIONALIDADES COMPLEMENTARIAS DE VALIDACIÓN ***************** *//
  //* ************************ Acciones complementarias también *********************** *//
  //* ********************************************************************************* *//
  //Metodo de control para ordenar un arreglo (ES6+), TODO: Mejorar el tema del Any.
  compareForRanges(objetoA: any, objetoB: any) {
    return objetoA.initialAverage - objetoB.initialAverage;
  }

  compareForCondonationsRanges(objetoA: any, objetoB: any) {
    return objetoA.minimumHourPercent - objetoB.maximumHourPercent;
  }

  //Validación de rangos para rendimiento periodo y rendimiento acumulado
  validationForRanges( data: string ): boolean {

    let sum: number = 0;
    const maxNumber: number = 5;
    const ranges = JSON.parse(data).dataTable;

    ranges.map((item: ITableMicroStructure) => {

      const initial: number = item.initialAverage;
      const end: number = item.endAverage;
      sum = Number((0.01 + sum + (end - initial)).toFixed(2));

    });

    if (Number((sum - 0.01).toFixed(2)) < Number(maxNumber.toFixed(2)))
      return true; //Lanzó el error!

    return false;

  }

  //Validación de rangos para servicio social condonación y transferencia conocimiento condonación
  validationForCondonationsRanges( data: string ): boolean {

    let sum: number = 0;
    const maxNumber: number = 100;
    const ranges = JSON.parse(data);

    ranges.map((item: ICondonationPercent) => {

      const initial: number = item.minimumHourPercent;
      const end: number = item.maximumHourPercent;
      sum = Number((0.01 + sum + (end - initial)).toFixed(2));

    });


    if (Number((sum - 0.01).toFixed(2)) < Number(maxNumber.toFixed(2)))
      return true; //Lanzó el error!

    return false;

  }

  //Registro de reglamento
  async saveReglamentInitial( data: IReglamentConsolidation ): Promise<IReglamentConsolidationSave | null> {

    if( !data || data == null || data == undefined ) return null;

    //* *************************************************************************** *//
    //* AJUSTAMOS PRIMERAMENTE LA DATA JSON QUE IRÁ EN LA BASE DE DATOS COMO STRING *//
    //* *************************************************************************** *//
    let controlApplyCondonationPerformancePeriod: boolean = false;
    let controlPerformancePeriodStructure: string = "";
    let controlApplyAccomulatedIncomeCondonation: boolean = false;
    let controlAccumulatedPerformanceDataTable: string = "";

    let controlSocialServiceCondonationType: string = "";
    let controlSocialServiceCondonationPercent: string = "";
    let controlKnowledgeTransferCondonationType: string = "";
    let controlKnowledgeTransferCondonationPercent: string = "";

    if( data.applyCondonationPerformancePeriod ){

      const info: IPerformanceStructure = data.performancePeriodStructure as IPerformanceStructure;
      const orderArray = [...info.dataTable].sort(this.compareForRanges);
      const objPrepare: IPerformanceStructure = { percentCondonation: info.percentCondonation, dataTable: orderArray };
      const convertStringArray: string = JSON.stringify(objPrepare);

      controlApplyCondonationPerformancePeriod = true;
      controlPerformancePeriodStructure = convertStringArray;

    }else{

      controlApplyCondonationPerformancePeriod = false;
      controlPerformancePeriodStructure = "";

    }

    if( data.applyAccomulatedIncomeCondonation ){

      const info: IPerformanceStructure = data.accumulatedPerformanceDataTable as IPerformanceStructure;
      const orderArray = [...info.dataTable].sort(this.compareForRanges);
      const objPrepare: IPerformanceStructure = { percentCondonation: info.percentCondonation, dataTable: orderArray }
      const convertStringArray: string = JSON.stringify(objPrepare);

      controlApplyAccomulatedIncomeCondonation = true;
      controlAccumulatedPerformanceDataTable = convertStringArray;

    }else{

      controlApplyAccomulatedIncomeCondonation = false;
      controlAccumulatedPerformanceDataTable = "";

    }

    if( data.socialServiceCondonationType == "Parcial" ){

      const info: ICondonationPercent[] = data.socialServiceCondonationPercent as ICondonationPercent[];
      const orderArray = [...info].sort(this.compareForCondonationsRanges);
      const convertStringArray: string = JSON.stringify(orderArray);

      controlSocialServiceCondonationType = "Parcial";
      controlSocialServiceCondonationPercent = convertStringArray;

    }else{

      controlSocialServiceCondonationType = data.socialServiceCondonationType!;
      controlSocialServiceCondonationPercent = "";

    }

    if( data.knowledgeTransferCondonationType == "Parcial" ){

      const info: ICondonationPercent[] = data.knowledgeTransferCondonationPercent as ICondonationPercent[];
      const orderArray = [...info].sort(this.compareForCondonationsRanges);
      const convertStringArray: string = JSON.stringify(orderArray);

      controlKnowledgeTransferCondonationType = "Parcial";
      controlKnowledgeTransferCondonationPercent = convertStringArray;

    }else{

      controlKnowledgeTransferCondonationType = data.knowledgeTransferCondonationType!;
      controlKnowledgeTransferCondonationPercent = "";

    }

    //* *************************************************************************** *//
    //* *************** AJUSTES PARA PERIODOS -> GUARDADO NUMÉRICO **************** *//
    let arrayInitialPeriodNumber: string[] = data.initialPeriod?.split("-")!;
    let arrayIndPeriodNumber: string[] | number = (!data.isOpenPeriod) ? data.endPeriod?.split("-")! : 0;

    const assigInitialPeriodNumber: number = Number(`${arrayInitialPeriodNumber[0]}${arrayInitialPeriodNumber[1]}`);
    const assigIndPeriodNumber: number = (arrayIndPeriodNumber !== 0) ? Number(`${arrayIndPeriodNumber[0]}${arrayIndPeriodNumber[1]}`) : 0;

    //* ********************************* *//
    //* ORGANIZAMOS EL OBJETO DE GUARDADO *//
    //* ********************************* *//

    const objReglamentForAdd: IReglamentConsolidationSave = {
      idProgram: Number(data.idProgram),
      initialPeriod: data.initialPeriod,
      isOpenPeriod: Boolean(data.isOpenPeriod),
      endPeriod: data.endPeriod,

      //Campos agregados/ajustados para Ajuste 1 (Teórico)
      applyTheoreticalSemiannualPercent: Boolean(data.applyTheoreticalSemiannualPercent),
      theoreticalSemiannualPercent: data.theoreticalSemiannualPercent,

      //Campos agregados para Ajuste 1 (Rendimiento académico y requisitos).
      applyAcademicPerformancePercent: Boolean(data.applyAcademicPerformancePercent),
      academicPerformancePercent: data.academicPerformancePercent,
      applyRequirementsPercent: Boolean(data.applyRequirementsPercent),
      requirementsPercent: data.requirementsPercent,

      //Campos para servicio social.
      applySocialService: Boolean(data.applySocialService),
      socialServicePercent: Number(data.socialServicePercent),
      socialServiceHours: Number(data.socialServiceHours),
      socialServiceCondonationType: controlSocialServiceCondonationType,
      socialServiceCondonationPercent: controlSocialServiceCondonationPercent,

      //Campos para transferencia de conocimiento.
      applyKnowledgeTransfer: Boolean(data.applyKnowledgeTransfer),
      knowledgeTransferPercent: Number(data.knowledgeTransferPercent),
      knowledgeTransferHours: Number(data.knowledgeTransferHours),
      knowledgeTransferCondonationType: controlKnowledgeTransferCondonationType,
      knowledgeTransferCondonationPercent: controlKnowledgeTransferCondonationPercent,

      //Campos para periodo de gracia.
      applyGracePeriod: Boolean(data.applyGracePeriod),
      gracePeriodMonths: Number(data.gracePeriodMonths),
      graceDateApplication: data.graceDateApplication,

      //Campos para tema de suspenciones.
      applyContinuousSuspension: Boolean(data.applyContinuousSuspension),
      continuosSuspencionQuantity: Number(data.continuosSuspencionQuantity),
      applyDiscontinuousSuspension: Boolean(data.applyDiscontinuousSuspension),
      discontinuousSuspensionQuantity: Number(data.discontinuousSuspensionQuantity),
      applySpecialSuspensions: Boolean(data.applySpecialSuspensions),
      specialSuspensionsQuantity: Number(data.specialSuspensionsQuantity),

      //Campos para tema de prorroga
      applyExtension: Boolean(data.applyExtension),
      extensionQuantity: Number(data.extensionQuantity),

      //Campos para aplicación de condonación por periodo y rendimiento acumulado
      applyCondonationPerformancePeriod: controlApplyCondonationPerformancePeriod,
      performancePeriodStructure: controlPerformancePeriodStructure!,
      applyAccomulatedIncomeCondonation: controlApplyAccomulatedIncomeCondonation,
      accumulatedPerformanceDataTable: controlAccumulatedPerformanceDataTable!,

      //Datos numéricos de campos de fecha
      initialPeriodNumber: assigInitialPeriodNumber,
      endPeriodNumber: assigIndPeriodNumber,

      //Campos de información de usuario de transacción
      createUser: data.createUser,
      createDate: new Date(),

    }

    const toCreate = new Reglament();
    toCreate.fill({ ...objReglamentForAdd });
    await toCreate.save();

    return toCreate.serialize() as IReglamentConsolidationSave;

  }

  //Actualización de reglamento
  async updateReglamentInitial(data: IReglamentConsolidation, id: number): Promise<IReglamentConsolidationSave | null> {

    if( !data || data == null || data == undefined ) return null;
    if( !id || id == null || id == undefined ) return null;

    //* *************************************************************************** *//
    //* AJUSTAMOS PRIMERAMENTE LA DATA JSON QUE IRÁ EN LA BASE DE DATOS COMO STRING *//
    //* *************************************************************************** *//
    let controlApplyCondonationPerformancePeriod: boolean = false;
    let controlPerformancePeriodStructure: string = "";
    let controlApplyAccomulatedIncomeCondonation: boolean = false;
    let controlAccumulatedPerformanceDataTable: string = "";

    let controlSocialServiceCondonationType: string = "";
    let controlSocialServiceCondonationPercent: string = "";
    let controlKnowledgeTransferCondonationType: string = "";
    let controlKnowledgeTransferCondonationPercent: string = "";

    if( data.applyCondonationPerformancePeriod ){

      const info: IPerformanceStructure = data.performancePeriodStructure as IPerformanceStructure;
      const orderArray = [...info.dataTable].sort(this.compareForRanges);
      const objPrepare: IPerformanceStructure = { percentCondonation: info.percentCondonation, dataTable: orderArray };
      const convertStringArray: string = JSON.stringify(objPrepare);

      controlApplyCondonationPerformancePeriod = true;
      controlPerformancePeriodStructure = convertStringArray;

    }else{

      controlApplyCondonationPerformancePeriod = false;
      controlPerformancePeriodStructure = "";

    }

    if( data.applyAccomulatedIncomeCondonation ){

      const info: IPerformanceStructure = data.accumulatedPerformanceDataTable as IPerformanceStructure;
      const orderArray = [...info.dataTable].sort(this.compareForRanges);
      const objPrepare: IPerformanceStructure = { percentCondonation: info.percentCondonation, dataTable: orderArray }
      const convertStringArray: string = JSON.stringify(objPrepare);

      controlApplyAccomulatedIncomeCondonation = true;
      controlAccumulatedPerformanceDataTable = convertStringArray;

    }else{

      controlApplyAccomulatedIncomeCondonation = false;
      controlAccumulatedPerformanceDataTable = "";

    }

    if( data.socialServiceCondonationType == "Parcial" ){

      const info: ICondonationPercent[] = data.socialServiceCondonationPercent as ICondonationPercent[];
      const orderArray = [...info].sort(this.compareForCondonationsRanges);
      const convertStringArray: string = JSON.stringify(orderArray);

      controlSocialServiceCondonationType = "Parcial";
      controlSocialServiceCondonationPercent = convertStringArray;

    }else{

      controlSocialServiceCondonationType = data.socialServiceCondonationType!;
      controlSocialServiceCondonationPercent = "";

    }

    if( data.knowledgeTransferCondonationType == "Parcial" ){

      const info: ICondonationPercent[] = data.knowledgeTransferCondonationPercent as ICondonationPercent[];
      const orderArray = [...info].sort(this.compareForCondonationsRanges);
      const convertStringArray: string = JSON.stringify(orderArray);

      controlKnowledgeTransferCondonationType = "Parcial";
      controlKnowledgeTransferCondonationPercent = convertStringArray;

    }else{

      controlKnowledgeTransferCondonationType = data.knowledgeTransferCondonationType!;
      controlKnowledgeTransferCondonationPercent = "";

    }

    //* *************************************************************************** *//
    //* *************** AJUSTES PARA PERIODOS -> GUARDADO NUMÉRICO **************** *//
    let arrayInitialPeriodNumber: string[] = data.initialPeriod?.split("-")!;
    let arrayIndPeriodNumber: string[] | number = (!data.isOpenPeriod) ? data.endPeriod?.split("-")! : 0;

    const assigInitialPeriodNumber: number = Number(`${arrayInitialPeriodNumber[0]}${arrayInitialPeriodNumber[1]}`);
    const assigIndPeriodNumber: number = (arrayIndPeriodNumber !== 0) ? Number(`${arrayIndPeriodNumber[0]}${arrayIndPeriodNumber[1]}`) : 0;

    //* ********************************* *//
    //* ORGANIZAMOS EL OBJETO DE GUARDADO *//
    //* ********************************* *//
    const toUpdate = await Reglament.find(id);
    if (!toUpdate) return null;

    toUpdate.idProgram = Number(data.idProgram),
    toUpdate.initialPeriod = data.initialPeriod!,
    toUpdate.isOpenPeriod = Boolean(data.isOpenPeriod),
    toUpdate.endPeriod = data.endPeriod!,

    //Campos agregados/ajustados para Ajuste 1 (Teórico)
    toUpdate.applyTheoreticalSemiannualPercent = Boolean(data.applyTheoreticalSemiannualPercent),
    toUpdate.theoreticalSemiannualPercent = data.theoreticalSemiannualPercent!,

    //Campos agregados para Ajuste 1 (Rendimiento académico y requisitos).
    toUpdate.applyAcademicPerformancePercent = Boolean(data.applyAcademicPerformancePercent),
    toUpdate.academicPerformancePercent = data.academicPerformancePercent!,
    toUpdate.applyRequirementsPercent = Boolean(data.applyRequirementsPercent),
    toUpdate.requirementsPercent = data.requirementsPercent!,

    //Campos para servicio social.
    toUpdate.applySocialService = Boolean(data.applySocialService),
    toUpdate.socialServicePercent = Number(data.socialServicePercent),
    toUpdate.socialServiceHours = Number(data.socialServiceHours),
    toUpdate.socialServiceCondonationType = controlSocialServiceCondonationType,
    toUpdate.socialServiceCondonationPercent = controlSocialServiceCondonationPercent,

    //Campos para transferencia de conocimiento.
    toUpdate.applyKnowledgeTransfer = Boolean(data.applyKnowledgeTransfer),
    toUpdate.knowledgeTransferPercent = Number(data.knowledgeTransferPercent),
    toUpdate.knowledgeTransferHours = Number(data.knowledgeTransferHours),
    toUpdate.knowledgeTransferCondonationType = controlKnowledgeTransferCondonationType,
    toUpdate.knowledgeTransferCondonationPercent = controlKnowledgeTransferCondonationPercent,

    //Campos para periodo de gracia.
    toUpdate.applyGracePeriod = Boolean(data.applyGracePeriod),
    toUpdate.gracePeriodMonths = Number(data.gracePeriodMonths),
    toUpdate.graceDateApplication = data.graceDateApplication!,

    //Campos para tema de suspenciones.
    toUpdate.applyContinuousSuspension = Boolean(data.applyContinuousSuspension),
    toUpdate.continuosSuspencionQuantity = Number(data.continuosSuspencionQuantity),
    toUpdate.applyDiscontinuousSuspension = Boolean(data.applyDiscontinuousSuspension),
    toUpdate.discontinuousSuspensionQuantity = Number(data.discontinuousSuspensionQuantity),
    toUpdate.applySpecialSuspensions = Boolean(data.applySpecialSuspensions),
    toUpdate.specialSuspensionsQuantity = Number(data.specialSuspensionsQuantity),

    //Campos para tema de prorroga
    toUpdate.applyExtension = Boolean(data.applyExtension),
    toUpdate.extensionQuantity = Number(data.extensionQuantity),

    //Campos para aplicación de condonación por periodo y rendimiento acumulado
    toUpdate.applyCondonationPerformancePeriod = controlApplyCondonationPerformancePeriod,
    toUpdate.performancePeriodStructure = controlPerformancePeriodStructure!,
    toUpdate.applyAccomulatedIncomeCondonation = controlApplyAccomulatedIncomeCondonation,
    toUpdate.accumulatedPerformanceDataTable = controlAccumulatedPerformanceDataTable!,

    //Datos numéricos de campos de fecha
    toUpdate.initialPeriodNumber = assigInitialPeriodNumber,
    toUpdate.endPeriodNumber = assigIndPeriodNumber,

    //Campos de información de usuario de transacción
    toUpdate.modifyUser = data.modifyUser!,
    toUpdate.modifyDate = new Date(),

    await toUpdate.save();
    return toUpdate.serialize() as IReglamentConsolidationSave;

  }

  //Actualización de requisitos del reglamento
  async updateRequirements(data: IRequirementsForReglament[], id: number): Promise<boolean> {

    if( !data || data.length === 0 ) return true;

    const getRequirements = await Requeriment
      .query()
      .where("codReglament", id);

    const convertInitialRequirements: IRequirementsForReglament[] = getRequirements.map((i) => i.serialize() as IRequirementsForReglament);
    if( convertInitialRequirements.length == 0 ) return false;

    //* ******************************************************************************************************************
    //* Lógica de trabajo:
    //* Si no se encuentra el id del requisito en la petición, quiere decir que se trata de un requerimiento nuevo.
    //* Si se encuentra el id del requisito quiere decir que no hay necesidad de hacer nada
    //* Si en los requisitos que se tenían al compararlos con la edición no halla alguno, quiere decir que elimino
    //* ******************************************************************************************************************

    //No habían requisitos generados, entonces guardemos lo que nos llegue
    if( convertInitialRequirements.length === 0 ){

      for (const addAll of data) {

        const addRequirement = new Requeriment();
        addRequirement.fill({ ...addAll });
        await addRequirement.save();

      }

      return true;

    }

    //Habían requisitos con anterioridad, entonces:
    const arrayNewsRequirements: IRequirementsForReglament[] = data.filter( d => !d.id );
    const getDataNow: IRequirementsForReglament[] = data.filter( d => d.id );
    const arrayDeletesRequirements: IRequirementsForReglament[] = [];

    //Si tenemos que hacer ajustes entonces:
    for (const iterReqInitials of convertInitialRequirements) {

      let ifFind: boolean = false;

      for (const iterReqEdition of getDataNow) {

        //Interacciones para revisar lo que retiraremos
        if( iterReqInitials.id !== iterReqEdition.id) {

          ifFind = true;

        }else{

          ifFind = false;
          break;

        }

      }

      if( ifFind ) arrayDeletesRequirements.push(iterReqInitials);

    }

    // Actualizamos lo que tengamos que actualizar
      for (const updateAll of data) {

        //Actualizamos en general si existe el id, si existe es porque ya estaba el campo
        if( updateAll.id && updateAll.id != null && updateAll.id != undefined ){

          const updateRequirement = await Requeriment.find(Number(updateAll.id));
          if (!updateRequirement) return false; //No se encontró el requisito del reglamento

          updateRequirement.active = updateAll.active!;
          updateRequirement.mandatoryFor = updateAll.mandatoryFor!;
          updateRequirement.description = updateAll.description!;
          await updateRequirement.save();

        }

      }

    //Borramos lo que tengamos que borrar
    for (const iterDelete of arrayDeletesRequirements) {
      const deleteRequirement = await Requeriment.findBy("id", iterDelete.id);
      if (deleteRequirement && deleteRequirement !== null && deleteRequirement !== undefined) await deleteRequirement.delete();
    }

    //Agregamos lo que tengamos que agregar
    for (const iterAddition of arrayNewsRequirements) {
      const addRequirement = new Requeriment();
      addRequirement.fill({ ...iterAddition });
      await addRequirement.save();
    }

    return true;

  }

}
