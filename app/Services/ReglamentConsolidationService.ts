import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IReglamentConsolidationRepository } from "App/Repositories/ReglamentConsolidationRepository";
import { ApiResponse } from "App/Utils/ApiResponses";
import { ICallPeriodSapi, IReglamentConsolidation, IFiltersForReglament } from '../Interfaces/SapienciaGenericInterface';
import { IPagingData } from '../Utils/ApiResponses';

export interface IReglamenConsolidationtService {

  getPeriodsSapi(): Promise<ApiResponse<ICallPeriodSapi[]>>;
  getReglamentPaginate(filters: IFiltersForReglament): Promise<ApiResponse<IPagingData<IReglamentConsolidation>>>;
  getReglamentById(id: number): Promise<ApiResponse<IReglamentConsolidation[] | null>>;
  createReglament(data: IReglamentConsolidation): Promise<ApiResponse<IReglamentConsolidation | string>>;

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

  async createReglament(data: IReglamentConsolidation): Promise<ApiResponse<IReglamentConsolidation | string>> {

    const res = await this.reglamentConsolidationRepository.createReglament(data);

    if (!res)
      return new ApiResponse(
        {} as IReglamentConsolidation,
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción");

    if( res == "Error1" )
      return new ApiResponse(
        "Ya existe un reglamento para el periodo y programa seleccionado",
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción");

    if( res == "Error2" )
      return new ApiResponse(
        "Se debe cubrir el 100% del rango de los valores parciales para el servicio social.",
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción");

    if( res == "Error3" )
      return new ApiResponse(
        "Se debe cubrir el 100% del rango de los valores parciales para la transferencia de conocimiento.",
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción");

    if( res == "Error4" )
      return new ApiResponse(
        "No se ha configurado completamente los rangos de promedios de la condonación por rendimiento académico por periodo, debe finalizarla para poder guardar",
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción");

    if( res == "Error5" )
      return new ApiResponse(
        "No se ha configurado completamente los rangos de promedios de la condonación por rendimiento académico final acumulado, debe finalizarla para poder guardar",
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción");

    if( res == "Error6" )
      return new ApiResponse(
        "La sumatoria de los porcentajes de servicio social, rendimiento académico, requisitos o transferencia de conocimiento debe ser igual a 100%",
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción");

    if( res == "Error7" )
      return new ApiResponse(
        "Ocurrió un error al registrar el reglamento, consulte con el admin",
        EResponseCodes.FAIL,
        "Ocurrió un error en su Transacción");

    return new ApiResponse(res, EResponseCodes.OK, "Creación exitosa.");

}

}
