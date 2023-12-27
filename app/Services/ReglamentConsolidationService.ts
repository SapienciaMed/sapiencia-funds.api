import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IReglamentConsolidationRepository } from "App/Repositories/ReglamentConsolidationRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { ICallPeriodSapi, IReglamentConsolidation, IFiltersForReglament } from '../Interfaces/SapienciaGenericInterface';
import { IPagingData } from '../Utils/ApiResponses';

export interface IReglamenConsolidationtService {

  getPeriodsSapi(): Promise<ApiResponse<ICallPeriodSapi[]>>;
  getReglamentPaginate(filters: IFiltersForReglament): Promise<ApiResponse<IPagingData<IReglamentConsolidation>>>;
  getReglamentById(id: number): Promise<ApiResponse<IReglamentConsolidation[] | null>>;
  createReglament(data: IReglamentConsolidation): Promise<ApiResponse<IReglamentConsolidation | string | null>>;
  updateReglament(data: IReglamentConsolidation, id: number): Promise<ApiResponse<IReglamentConsolidation | string | null>>;

}

export default class ReglamentConsolidationService implements IReglamenConsolidationtService {

  constructor(
    private reglamentConsolidationRepository: IReglamentConsolidationRepository,
  ) {}

  async getPeriodsSapi(): Promise<ApiResponse<ICallPeriodSapi[]>> {

    const getResult = await this.reglamentConsolidationRepository.getPeriodsSapi();
    return new ApiResponse(getResult, EResponseCodes.OK, "Obteniendo periodos desde Sapiencia");

  }

  async getReglamentPaginate(filters: IFiltersForReglament): Promise<ApiResponse<IPagingData<IReglamentConsolidation>>> {

    const getReglament = await this.reglamentConsolidationRepository.getReglamentPaginate(filters);
    return new ApiResponse(getReglament, EResponseCodes.OK);

  }

  async getReglamentById(id: number): Promise<ApiResponse<IReglamentConsolidation[] | null>> {

    const res = await this.reglamentConsolidationRepository.getReglamentById(id);

    if (!res) {

      return new ApiResponse({} as IReglamentConsolidation[], EResponseCodes.FAIL, "Reglamento no encontrado");

    } else {

      return new ApiResponse(res, EResponseCodes.OK);

    }

  }

  async createReglament(data: IReglamentConsolidation): Promise<ApiResponse<IReglamentConsolidation | string | null>> {

    const res = await this.reglamentConsolidationRepository.createReglament(data);

    if (!res)
      return new ApiResponse(
        {} as IReglamentConsolidation,
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción");

    if( res == "Error1" )
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "Ya existe un reglamento para el periodo y programa seleccionado");

    if( res == "Error2" )
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "Se debe cubrir el 100% del rango de los valores parciales para el servicio social.");

    if( res == "Error3" )
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "Se debe cubrir el 100% del rango de los valores parciales para la transferencia de conocimiento.");

    if( res == "Error4" )
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se ha configurado completamente los rangos de promedios de la condonación por rendimiento académico por periodo, debe finalizarla para poder guardar");

    if( res == "Error5" )
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se ha configurado completamente los rangos de promedios de la condonación por rendimiento académico final acumulado, debe finalizarla para poder guardar");

    if( res == "Error6" )
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "La sumatoria de los porcentajes de servicio social, rendimiento académico, requisitos o transferencia de conocimiento debe ser igual a 100%");

    if( res == "Error7" )
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "Ocurrió un error al registrar el reglamento, consulte con el admin");

    return new ApiResponse(res, EResponseCodes.OK, "Creación exitosa.");

  }

  async updateReglament(data: IReglamentConsolidation, id: number): Promise<ApiResponse<IReglamentConsolidation | string | null>> {

    const res = await this.reglamentConsolidationRepository.updateReglament(data, id);

    if (!res)
      return new ApiResponse(
        {} as IReglamentConsolidation,
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción");

    if( res == "Error1" )
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "Ya existe un reglamento para el periodo y programa seleccionado");

    if( res == "Error2" )
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "Se debe cubrir el 100% del rango de los valores parciales para el servicio social.");

    if( res == "Error3" )
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "Se debe cubrir el 100% del rango de los valores parciales para la transferencia de conocimiento.");

    if( res == "Error4" )
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se ha configurado completamente los rangos de promedios de la condonación por rendimiento académico por periodo, debe finalizarla para poder guardar");

    if( res == "Error5" )
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se ha configurado completamente los rangos de promedios de la condonación por rendimiento académico final acumulado, debe finalizarla para poder guardar");

    if( res == "Error6" )
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "La sumatoria de los porcentajes de servicio social, rendimiento académico, requisitos o transferencia de conocimiento debe ser igual a 100%");

    if( res == "Error7" )
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "Ocurrió un error al registrar el reglamento, consulte con el admin");

    if( res == "Error8" )
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "Ocurrió un error al intentar actualizar los requisitos del reglamento, consulte con el admin");

    return new ApiResponse(res, EResponseCodes.OK, "Actualización exitosa.");

  }

}
