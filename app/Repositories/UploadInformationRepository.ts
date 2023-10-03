import {
    IUploadInformation,
    IUploadInformationFilters
} from "App/Interfaces/UploadInformationInterface";
import UploadInformation from "../Models/UploadInformation";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IUploadInformationRepository {

    getUploadInformation(): Promise<IUploadInformation[]>;
    getUploadInformationPaginate(
        filters: IUploadInformationFilters
    ): Promise<IPagingData<IUploadInformation>>;
  }

export default class UploadInformationRepository
  implements IUploadInformationRepository
  {
    constructor() {}

    async getUploadInformation(): Promise<IUploadInformation[]> {
        const res = await UploadInformation.query();
        return res.map((i) => i.serialize() as IUploadInformation);
    }

    async getUploadInformationPaginate(
        filters: IUploadInformationFilters
      ): Promise<IPagingData<IUploadInformation>> {
        const res = UploadInformation.query();
    
        if (filters.commune) {
          res.whereILike("commune", `%${filters.commune}%`);
        }
    
        if (filters.validity) {
          res.where("validity", filters.validity);
        }

        if (filters.information) {
            res.where("information", filters.information);
          }
      
        const workerUploadInformationPaginated = await res.paginate(
          filters.page,
          filters.perPage
        );
    
        const { data, meta } = workerUploadInformationPaginated.serialize();
        const dataArray = data ?? [];
    
        return {
          array: dataArray as IUploadInformation[],
          meta,
        };
    }
    
  }