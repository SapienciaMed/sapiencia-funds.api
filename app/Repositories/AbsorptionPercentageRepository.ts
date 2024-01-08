import { DATABASE_ERRORS } from "App/Constants/DatabaseErrors";
import {
  IAbsorptionPercentaje,
  IAbsortionPercentageFullCreateSchema,
  IAbsortionPercentagePaginatedFilters,
  IAbsortionPercentagePayload,
} from "App/Interfaces/AbsorptionPercentage";
import AbsorptionPercentaje from "App/Models/AbsorptionPercentage";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IAbsorptionPercentageRepository {
  createAbsortionPercentage(
    payload: IAbsortionPercentageFullCreateSchema
  ): Promise<
    Omit<
      IAbsortionPercentageFullCreateSchema,
      "userCreated" | "updatedAt" | "createdAt" | "absorptionItems"
    >
  >;
  getAllAbsorptionPercentagePaginated(
    filters: IAbsortionPercentagePaginatedFilters
  ): Promise<
    IPagingData<
      Omit<
        IAbsorptionPercentaje,
        "userModified" | "updatedAt" | "userCreated" | "createdAt"
      >
    >
  >;
  getAbsorptionPercentageById(id: number): Promise<AbsorptionPercentaje>;
  updateAbsorptionPercentageById(
    id: number,
    payload: IAbsortionPercentagePayload
  ): Promise<IAbsorptionPercentaje>;
  deleteAbsorptionPercentageById(id: number): Promise<void>;
}

export default class AbsorptionPercentageRepository
  implements IAbsorptionPercentageRepository
{
  // CREATE AN ABSORPTION PERCENTAGE
  public async createAbsortionPercentage(
    payload: IAbsortionPercentageFullCreateSchema
  ) {
    delete payload.absorptionItems;
    const newAbsorptionPercentage = new AbsorptionPercentaje();
    await newAbsorptionPercentage.fill(payload).save();
    return newAbsorptionPercentage.serialize({
      fields: {
        omit: ["userCreated", "updatedAt", "createdAt"],
      },
    }) as Omit<
      IAbsortionPercentageFullCreateSchema,
      "userCreated" | "updatedAt" | "createdAt" | "absorptionItems"
    >;
  }
  // GET ALL ABSORPTION PERCENTAGE PAGINATED
  public async getAllAbsorptionPercentagePaginated(
    filters: IAbsortionPercentagePaginatedFilters
  ) {
    const { announcementId, page, perPage } = filters;
    const absorptionPercentageQuery = AbsorptionPercentaje.query();
    if (announcementId) {
      absorptionPercentageQuery.where("announcementId", announcementId);
    }
    const { data, meta } = (
      await absorptionPercentageQuery.paginate(page, perPage)
    ).serialize({
      fields: {
        omit: ["userModified", "updatedAt", "userCreated", "createdAt"],
      },
    });
    return {
      array: data as Omit<
        IAbsorptionPercentaje,
        "userModified" | "updatedAt" | "userCreated" | "createdAt"
      >[],
      meta,
    };
  }
  // GET ABSORPTION PERCENTAGE BY ID
  public async getAbsorptionPercentageById(id: number) {
    try {
      return await AbsorptionPercentaje.findOrFail(id);
    } catch (err) {
      if (err.message?.includes(DATABASE_ERRORS.E_ROW_NOT_FOUND)) {
        throw new Error("Porcentaje de absorción inexistente");
      }
      throw new Error(err);
    }
  }
  // UPDATE ABSORPTION PERCENTAGE BY ID
  public async updateAbsorptionPercentageById(
    id: number,
    payload: IAbsortionPercentagePayload
  ) {
    const absorptionPercentage = await this.getAbsorptionPercentageById(id);
    return absorptionPercentage.merge(payload).save();
  }
  // DELETE ABSORPTION PERCENTAGE BY ID
  public async deleteAbsorptionPercentageById(id: number) {
    return (await this.getAbsorptionPercentageById(id)).delete();
  }
}
