import {
  IReglamentFiltersInterface,
  IReglamentInterface,
  IReglamentPrograms,
} from "App/Interfaces/IReglamentInterface";
import Programs from "App/Models/Programs";
import Reglament from "App/Models/Reglament";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IReglamentRepository {
  getLastId(): Promise<number | null>;
  getReglamentById(id: number): Promise<IReglamentInterface[] | null>;
  getReglamentPrograms(): Promise<IReglamentPrograms[] | null>;
  createReglament(
    reglament: IReglamentInterface
  ): Promise<IReglamentInterface | null>;
  getReglamentPaginate(
    filters: IReglamentFiltersInterface
  ): Promise<IPagingData<IReglamentInterface>>;
  updateReglament(
    reglament: IReglamentInterface,
    id: number
  ): Promise<IReglamentInterface | null>;
  deleteReglament(id: number): Promise<IReglamentInterface | null>;
}

export default class ReglamentRepository implements IReglamentRepository {
  constructor() {}

  async getLastId(): Promise<number> {
    const result = await Reglament.query()
      .max("RCO_CODIGO as maxRCO_CODIGO")
      .first();
    const maxRCO_CODIGO = result ? result.$extras.maxRCO_CODIGO : null;
    return maxRCO_CODIGO;
  }

  async getReglamentPrograms(): Promise<IReglamentPrograms[] | null> {
    const queryReglament = Programs.query();
    const reglament = await queryReglament;

    if (reglament.length === 0) {
      return null;
    }
    return reglament.map((i) => i.serialize() as IReglamentPrograms);
  }

  async getReglamentById(id: number): Promise<IReglamentInterface[] | null> {
    const queryReglament = Reglament.query().where("id", id);
    const reglament = await queryReglament;

    if (reglament.length === 0) {
      return null;
    }
    return reglament.map((i) => i.serialize() as IReglamentInterface);
  }

  async createReglament(
    reglament: IReglamentInterface
  ): Promise<IReglamentInterface | null> {
    const existReglament = Reglament.query()
      .where("program", reglament.program)
      .andWhere("initialPeriod", reglament.initialPeriod)
      .andWhere("isOpenPeriod", reglament.isOpenPeriod)
      .orWhere("endPeriod", reglament.endPeriod ? reglament.endPeriod : "");

    const execute = await existReglament;

    if (execute.length > 0) return null;

    const toCreate = new Reglament();
    toCreate.fill({ ...reglament });
    await toCreate.save();
    return toCreate.serialize() as IReglamentInterface;
  }

  async getReglamentPaginate(
    filters: IReglamentFiltersInterface
  ): Promise<IPagingData<IReglamentInterface>> {
    const res = Reglament.query();

    if (filters.program) {
      res.where("program", filters.program);
    }

    if (filters.initialPeriod) {
      res.andWhere("initialPeriod", filters.initialPeriod);
    }

    if (filters?.endPeriod) {
      res.andWhere("endPeriod", filters.endPeriod);
    }

    const workerReglamentPaginated = await res.paginate(
      filters.page,
      filters.perPage
    );

    const { data, meta } = workerReglamentPaginated.serialize();
    const dataArray = data ?? [];

    return {
      array: dataArray as IReglamentInterface[],
      meta,
    };
  }

  async updateReglament(
    requeriment: IReglamentInterface,
    id: number
  ): Promise<IReglamentInterface | null> {
    const toUpdate = await Reglament.find(id);

    const buildUpdate = {
      ...requeriment,
      isOpenPeriod: requeriment?.isOpenPeriod ? true : false,
      endPeriod: requeriment?.isOpenPeriod ? null : requeriment?.endPeriod,
      applySocialService: requeriment?.applySocialService ? true : false,
      socialServicePercentage: requeriment?.applySocialService
        ? requeriment?.socialServicePercentage
        : null,
      socialServiceHours: requeriment?.applySocialService
        ? requeriment?.socialServiceHours
        : null,
      knowledgeTransferApply: requeriment?.knowledgeTransferApply
        ? true
        : false,
      knowledgeTransferPercentage: requeriment?.knowledgeTransferApply
        ? requeriment?.knowledgeTransferPercentage
        : null,
      knowledgeTransferHours: requeriment?.knowledgeTransferApply
        ? requeriment?.knowledgeTransferHours
        : null,
      gracePeriodApply: requeriment?.gracePeriodApply ? true : false,
      gracePeriodMonths: requeriment?.gracePeriodApply
        ? requeriment?.gracePeriodMonths
        : null,
      gracePeriodApplication: requeriment?.gracePeriodApply
        ? requeriment?.gracePeriodApplication
        : null,
      continuousSuspensionApplies: requeriment?.continuousSuspensionApplies
        ? true
        : false,
      continuosSuspencionQuantity: requeriment?.continuousSuspensionApplies
        ? requeriment?.continuosSuspencionQuantity
        : null,
      applyDiscontinuousSuspension: requeriment?.applyDiscontinuousSuspension
        ? true
        : false,
      discontinuousSuspensionQuantity: requeriment?.applyDiscontinuousSuspension
        ? requeriment?.discontinuousSuspensionQuantity
        : null,
      applySpecialSuspensions: requeriment?.applySpecialSuspensions
        ? true
        : false,
      applySpecialSuspensionsQuantity: requeriment?.applySpecialSuspensions
        ? requeriment?.applySpecialSuspensionsQuantity
        : null,
      extensionApply: requeriment?.extensionApply ? true : false,
      extensionApplyQuantity: requeriment?.extensionApply
        ? requeriment?.extensionApplyQuantity
        : null,
      applyCondonationPerformancePeriod:
        requeriment?.applyCondonationPerformancePeriod ? true : false,
      performancePeriod: requeriment?.applyCondonationPerformancePeriod
        ? requeriment?.performancePeriod
        : null,
      accomulatedIncomeCondonationApplies:
        requeriment?.accomulatedIncomeCondonationApplies ? true : false,
      accumulatedPerformance: requeriment?.accomulatedIncomeCondonationApplies
        ? requeriment?.accumulatedPerformance
        : null,
    };

    if (!toUpdate) {
      return null;
    }

    toUpdate.fill({ ...toUpdate, ...buildUpdate });

    await toUpdate.save();

    return toUpdate.serialize() as IReglamentInterface;
  }

  async deleteReglament(id: number): Promise<IReglamentInterface | null> {
    const toDelete = await Reglament.find(id);

    if (!toDelete) {
      return null;
    }

    toDelete.fill({ ...toDelete });

    await toDelete.delete();

    return toDelete.serialize() as IReglamentInterface;
  }
}
