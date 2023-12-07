import {
  IAbsorptionPercentaje,
  IAbsortionPercentageFullCreateSchema,
} from "App/Interfaces/AbsorptionPercentage";
import AbsorptionPercentaje from "App/Models/AbsorptionPercentage";

export interface IAbsorptionPercentageRepository {
  createAbsortionPercentage(
    payload: IAbsortionPercentageFullCreateSchema
  ): Promise<IAbsorptionPercentaje>;
}

export default class AbsorptionPercentageRepository
  implements IAbsorptionPercentageRepository
{
  // CREATE AN ABSORPTION PERCENTAGE
  public async createAbsortionPercentage(
    payload: IAbsortionPercentageFullCreateSchema
  ) {
    const newAbsorptionPercentage = new AbsorptionPercentaje();
    await newAbsorptionPercentage.fill(payload).save();
    return newAbsorptionPercentage.serialize() as IAbsorptionPercentaje;
  }
}
