import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ICallPeriod } from "App/Interfaces/CallPeriodInterfaces";
import {
  ICallBudget,
  ICallBudgetFilters,
} from "App/Interfaces/CallBudgetInterfaces";
import { ICallPeriodRepository } from "App/Repositories/Sapiencia/CallPeriodRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import {
  IConsolidationTrayForTechnicianCollection,
  IConsolidationTrayForTechnicianCollectionParams,
  IConsolidationTrayForTransactions,
  IPqrsdfResultSimple,
  IRequerimentsResultSimple,
  IComplianceAssignment,
  IApplyKnowledgeTransfer,
  IChageStatusKnowledgeTransfer,
} from "../Interfaces/ConsolidationTrayInterface";
import { IConsolidationTrayTechnicianCollectionRepository } from "../Repositories/Sapiencia/ConsolidationTrayTechnicianCollectionRepository";
import { ICutInterface } from "../Interfaces/CutInterface";
import { ICallFound } from "App/Interfaces/CallfundInterfaces";

//* ************************************************************* *//
//* ***** Para la subida de archivos al BUCKET DE SAPIENCIA ***** *//
//* ************************************************************* *//
import { IFiles } from "../Interfaces/StorageInterfaces";
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import { Storage } from "@google-cloud/storage";

import RequirementsConsolidate from "../Models/RequirementsConsolidate";

// const keyFilename = process.env.GCLOUD_KEYFILE;  //-->Local
const bucketName = process.env.GCLOUD_BUCKET ?? ""; //-->Pdxn

export interface ISapienciaService {
  getAllCallPeriod(): Promise<ApiResponse<ICallPeriod[]>>;
  getAllCallBudget(): Promise<ApiResponse<ICallBudget[]>>;
  getAllCallfond(): Promise<ApiResponse<ICallFound[]>>;
  geCallBudgetPaginate(
    filters: ICallBudgetFilters
  ): Promise<ApiResponse<IPagingData<ICallBudget>>>;

  //* ************************************************************* *//
  //* ********** TEMAS DEL BANDEJA TÉCNICO PASO AL COBRO ********** *//
  //* ************************************************************* *//
  geConsolidationTrayTechnicianCollection(
    filters: IConsolidationTrayForTechnicianCollection
  ): Promise<
    ApiResponse<IPagingData<IConsolidationTrayForTechnicianCollectionParams>>
  >;
  getCutsForConsolidationTray(): Promise<ApiResponse<ICutInterface[] | null>>;
  geConsolidationTrayTechnicianCollectionByCut(
    filters: IConsolidationTrayForTechnicianCollection
  ): Promise<
    ApiResponse<IPagingData<IConsolidationTrayForTechnicianCollectionParams>>
  >;
  geBeneficiaryById(
    id: number
  ): Promise<
    ApiResponse<IConsolidationTrayForTechnicianCollectionParams | null>
  >;
  updateCutBeneficiary(
    data: IConsolidationTrayForTransactions
  ): Promise<
    ApiResponse<IConsolidationTrayForTechnicianCollectionParams | null>
  >;

  //* ********************************************* *//
  //* ********** TEMAS DEL TAB DE PQRSDF ********** *//
  //* ********************************************* *//
  getPQRSDFExternal(
    filters: IConsolidationTrayForTechnicianCollection
  ): Promise<ApiResponse<IPagingData<IPqrsdfResultSimple>>>;

  //* ************************************************* *//
  //* ********** TEMAS DEL TAB DE REQUISITOS ********** *//
  //* ************************************************* *//
  getRequirementsByBeneficiary(
    filters: IConsolidationTrayForTechnicianCollection
  ): Promise<ApiResponse<boolean>>;
  getRequirementsByBeneficiaryList(
    filters: IConsolidationTrayForTechnicianCollection
  ): Promise<ApiResponse<IPagingData<IRequerimentsResultSimple>>>;
  complianceAssignmentBeneficiary(
    data: IComplianceAssignment[]
  ): Promise<ApiResponse<IComplianceAssignment[] | null>>;
  uploadRequirementFile(
    file: MultipartFileContract,
    path?: string,
    requirement?: number
  ): Promise<boolean>;
  getUploadFiles(path?: string): Promise<ApiResponse<IFiles[]>>;
  deleteUploadFiles(path?: string, beneficiary?: number): Promise<boolean>;
  dowloadUploadFiles(path: string, beneficiary?: number): Promise<Buffer>;

  //* **************************************************************************************************** *//
  //* ********** TEMAS DE TAB DE TRANSFERENCIA DE CONOCIMIENTO (TAMBIÉN PARA MANEJAR HISTÓRICO) ********** *//
  //* **************************************************************************************************** *//
  getKnowledgeTransferByBeneficiary(
    filters: IConsolidationTrayForTechnicianCollection
  ): Promise<ApiResponse<IPagingData<IApplyKnowledgeTransfer> | boolean>>;
  changeApproveOrRejectKnowledgeTransfer(
    data: IChageStatusKnowledgeTransfer
  ): Promise<ApiResponse<IApplyKnowledgeTransfer | boolean>>;
  uploadKnowledgeTransferFile(
    file: MultipartFileContract,
    path?: string,
    knowledgeTransfer?: number,
    beneficiary?: number
  ): Promise<boolean>;
  getUploadKnowledgeTransferFiles(
    path?: string
  ): Promise<ApiResponse<IFiles[]>>;
  getRequirementsKnowledgeTransfer(
    data: IConsolidationTrayForTechnicianCollection
  ): Promise<ApiResponse<IRequerimentsResultSimple[] | null>>;
}

export default class SapienciaService implements ISapienciaService {
  storage: Storage;

  constructor(
    private callPeriodRepository: ICallPeriodRepository,
    private callConsolidationTrayTechnicianCollectionRepository: IConsolidationTrayTechnicianCollectionRepository
  ) {
    //this.storage = new Storage({ keyFilename }); //-->Local
    this.storage = new Storage(); //-->Pdxn
  }

  async getAllCallPeriod(): Promise<ApiResponse<ICallPeriod[]>> {
    const res = await this.callPeriodRepository.getAllCallPeriod();
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getAllCallBudget(): Promise<ApiResponse<ICallBudget[]>> {
    const res = await this.callPeriodRepository.getAllCallBudget();
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getAllCallfond(): Promise<ApiResponse<ICallFound[]>> {
    const res = await this.callPeriodRepository.getAllCallFond();
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async geCallBudgetPaginate(
    filters: ICallBudgetFilters
  ): Promise<ApiResponse<IPagingData<ICallBudget>>> {
    const Activity = await this.callPeriodRepository.geCallBudgetPaginate(
      filters
    );
    return new ApiResponse(Activity, EResponseCodes.OK);
  }

  async geConsolidationTrayTechnicianCollection(
    filters: IConsolidationTrayForTechnicianCollection
  ): Promise<
    ApiResponse<IPagingData<IConsolidationTrayForTechnicianCollectionParams>>
  > {
    const technicianCollection =
      await this.callConsolidationTrayTechnicianCollectionRepository.geConsolidationTrayTechnicianCollection(
        filters
      );
    return new ApiResponse(technicianCollection, EResponseCodes.OK);
  }

  async getCutsForConsolidationTray(): Promise<
    ApiResponse<ICutInterface[] | null>
  > {
    const res =
      await this.callConsolidationTrayTechnicianCollectionRepository.getCutGeneric();
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async geConsolidationTrayTechnicianCollectionByCut(
    filters: IConsolidationTrayForTechnicianCollection
  ): Promise<
    ApiResponse<IPagingData<IConsolidationTrayForTechnicianCollectionParams>>
  > {
    const technicianCollection =
      await this.callConsolidationTrayTechnicianCollectionRepository.geConsolidationTrayTechnicianCollectionByCut(
        filters
      );
    return new ApiResponse(technicianCollection, EResponseCodes.OK);
  }

  async geBeneficiaryById(
    id: number
  ): Promise<
    ApiResponse<IConsolidationTrayForTechnicianCollectionParams | null>
  > {
    const getBeneficiary =
      await this.callConsolidationTrayTechnicianCollectionRepository.geBeneficiaryById(
        id
      );
    if (!getBeneficiary || getBeneficiary == null)
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se encontró información"
      );
    return new ApiResponse(
      getBeneficiary,
      EResponseCodes.OK,
      "Información encontrada"
    );
  }

  async updateCutBeneficiary(
    data: IConsolidationTrayForTransactions
  ): Promise<
    ApiResponse<IConsolidationTrayForTechnicianCollectionParams | null>
  > {
    const technicianTransaction =
      await this.callConsolidationTrayTechnicianCollectionRepository.updateCutBeneficiary(
        data
      );

    if (!technicianTransaction || technicianTransaction == null)
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se pudo actualizar el corte"
      );

    return new ApiResponse(
      technicianTransaction,
      EResponseCodes.OK,
      "Se actualizó el corte para el beneficiario"
    );
  }

  async getPQRSDFExternal(
    filters: IConsolidationTrayForTechnicianCollection
  ): Promise<ApiResponse<IPagingData<IPqrsdfResultSimple>>> {
    const getGetPQRSDF =
      await this.callConsolidationTrayTechnicianCollectionRepository.getPQRSDFExternal(
        filters
      );
    return new ApiResponse(
      getGetPQRSDF,
      EResponseCodes.OK,
      "Listado de PQRSDF"
    );
  }

  async getRequirementsByBeneficiary(
    filters: IConsolidationTrayForTechnicianCollection
  ): Promise<ApiResponse<boolean>> {
    const getRequirements =
      await this.callConsolidationTrayTechnicianCollectionRepository.getRequirementsByBeneficiary(
        filters
      );
    if (!getRequirements)
      return new ApiResponse(
        false,
        EResponseCodes.FAIL,
        "Ocurrio un error realizando la transacción"
      );
    return new ApiResponse(
      true,
      EResponseCodes.OK,
      "Transacción realizada con éxito"
    );
  }

  async getRequirementsByBeneficiaryList(
    filters: IConsolidationTrayForTechnicianCollection
  ): Promise<ApiResponse<IPagingData<IRequerimentsResultSimple>>> {
    const getGetRequirements =
      await this.callConsolidationTrayTechnicianCollectionRepository.getRequirementsByBeneficiaryList(
        filters
      );
    return new ApiResponse(
      getGetRequirements,
      EResponseCodes.OK,
      "Listado de Requisitos"
    );
  }

  async complianceAssignmentBeneficiary(
    data: IComplianceAssignment[]
  ): Promise<ApiResponse<IComplianceAssignment[] | null>> {
    const changeCompliance =
      await this.callConsolidationTrayTechnicianCollectionRepository.complianceAssignmentBeneficiary(
        data
      );
    if (!changeCompliance || changeCompliance == null)
      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "Ocurrió un error al intentar cambiar los estados de cumplimiento"
      );

    return new ApiResponse(
      changeCompliance,
      EResponseCodes.OK,
      "Estados de cumplimiento cambiados"
    );
  }

  async uploadRequirementFile(
    file: MultipartFileContract,
    path?: string,
    requirement?: number
  ): Promise<boolean> {
    try {
      const bucket = this.storage.bucket(bucketName);

      if (!file.tmpPath) return false;

      const id: number = Number(requirement);
      const getRequirement = await RequirementsConsolidate.find(id);

      if (!getRequirement) return false;

      const beneficiary: number = getRequirement?.idBeneficiary;
      const nameFile: string = `beneficiary_${beneficiary}_aurora.pdf`;

      const [fileCloud] = await bucket.upload(file.tmpPath, {
        destination: `${path}${nameFile}`,
      });

      return !!fileCloud;
    } catch (error) {
      return false;
    }
  }

  async getUploadFiles(path?: string): Promise<ApiResponse<IFiles[]>> {
    const [files] = await this.storage
      .bucket(bucketName)
      .getFiles({ prefix: path });

    const response = files.map((file) => {
      const fileName = file.metadata.name?.split("/");

      return {
        name: fileName ? fileName[fileName.length - 1] : "",
        path: file.metadata.name ?? "",
        size: Number(file.metadata.size ?? 0),
        date: file.metadata.timeCreated ?? "",
      };
    });

    return new ApiResponse(
      response.filter((file) => file.name),
      EResponseCodes.OK
    );
  }

  async deleteUploadFiles(
    path?: string,
    beneficiary?: number
  ): Promise<boolean> {
    const urlComplement: string = `${path}beneficiary_${beneficiary}_aurora.pdf`;
    const result = await this.storage
      .bucket(bucketName)
      .file(urlComplement)
      .delete();
    console.log(result);

    return true;
  }

  async dowloadUploadFiles(
    path: string,
    beneficiary?: number
  ): Promise<Buffer> {
    const urlComplement: string = `${path}beneficiary_${beneficiary}_aurora.pdf`;
    const [archivo] = await this.storage
      .bucket(bucketName)
      .file(urlComplement)
      .download();
    console.log(archivo);
    return archivo;
  }

  async getKnowledgeTransferByBeneficiary(
    filters: IConsolidationTrayForTechnicianCollection
  ): Promise<ApiResponse<IPagingData<IApplyKnowledgeTransfer> | boolean>> {
    const getKnowledgeTransfers =
      await this.callConsolidationTrayTechnicianCollectionRepository.getKnowledgeTransferByBeneficiary(
        filters
      );
    if (!getKnowledgeTransfers)
      return new ApiResponse(
        false,
        EResponseCodes.FAIL,
        "Ocurrio un error realizando la transacción, es posible que no se encontrara al beneficiario o al reglamento que aplique a la fecha de legalicación del beneficiario en cuestión."
      );
    return new ApiResponse(
      getKnowledgeTransfers,
      EResponseCodes.OK,
      "Transacción realizada con éxito, obteniendo transferencia de conocimiento"
    );
  }

  async changeApproveOrRejectKnowledgeTransfer(
    data: IChageStatusKnowledgeTransfer
  ): Promise<ApiResponse<IApplyKnowledgeTransfer | boolean>> {
    const applyChangeKnowledgeTransfer =
      await this.callConsolidationTrayTechnicianCollectionRepository.changeApproveOrRejectKnowledgeTransfer(
        data
      );
    if (!applyChangeKnowledgeTransfer)
      return new ApiResponse(
        false,
        EResponseCodes.FAIL,
        "Ocurrio un error realizando la transacción, no pudo cambiarse el estado de la transferencia de conocimiento."
      );
    return new ApiResponse(
      applyChangeKnowledgeTransfer,
      EResponseCodes.OK,
      "Transacción realizada con éxito, obteniendo transferencia de conocimiento"
    );
  }

  async uploadKnowledgeTransferFile(
    file: MultipartFileContract,
    path?: string,
    knowledgeTransfer?: number,
    beneficiary?: number
  ): Promise<boolean> {
    try {
      const bucket = this.storage.bucket(bucketName);

      if (!file.tmpPath) return false;

      //* ****** Como puede haber varios archivos por grupo          ****** *//
      //* ****** entonces debemos nombrar diferente PERO mantener el ****** *//
      //* ****** usuario alineado con su grupo específico            ****** *//
      const getNameDate: number = Date.parse(Date());
      const clientName: string = file.clientName.split(".")[0];
      // const descriptionName: string = `${getNameDate}-TC${knowledgeTransfer}-BENEF${beneficiary}`;
      const descriptionName: string = `${clientName}-${getNameDate}-T${knowledgeTransfer}-B${beneficiary}`;

      const nameFile: string = `${descriptionName}.pdf`;

      const [fileCloud] = await bucket.upload(file.tmpPath, {
        destination: `${path}${nameFile}`,
      });

      return !!fileCloud;
    } catch (error) {
      return false;
    }
  }

  async getUploadKnowledgeTransferFiles(
    path?: string
  ): Promise<ApiResponse<IFiles[]>> {
    const [files] = await this.storage
      .bucket(bucketName)
      .getFiles({ prefix: path });

    const response = files.map((file) => {
      const fileName = file.metadata.name?.split("/");

      return {
        name: fileName ? fileName[fileName.length - 1] : "",
        path: file.metadata.name ?? "",
        size: Number(file.metadata.size ?? 0),
        date: file.metadata.timeCreated ?? "",
      };
    });

    return new ApiResponse(
      response.filter((file) => file.name),
      EResponseCodes.OK
    );
  }

  async getRequirementsKnowledgeTransfer(
    data: IConsolidationTrayForTechnicianCollection
  ): Promise<ApiResponse<IRequerimentsResultSimple[] | null>> {
    const { idBeneficiary } = data;
    const getRequirementsMandatory =
      await this.callConsolidationTrayTechnicianCollectionRepository.getRequirementsKnowledgeTransfer(
        Number(idBeneficiary)
      );
    return new ApiResponse(
      getRequirementsMandatory,
      EResponseCodes.OK,
      "Listado de Requisitos Obligatorios"
    );
  }
}
