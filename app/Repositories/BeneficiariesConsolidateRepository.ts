import {
  IBeneficiariesConsolidateFiltersInterface,
  IBeneficiariesConsolidateInterface,
} from "App/Interfaces/BeneficiariesConsolidateInterface";
import BeneficiariesConsolidate from "App/Models/BeneficiariesConsolidate";
import { IPagingData } from "App/Utils/ApiResponses";
import moment from "moment";

export interface IBeneficiariesConsolidateRepository {
  getBeneficiariesConsolidateById(
    id: number
  ): Promise<IBeneficiariesConsolidateInterface[] | null>;
  createBeneficiariesConsolidate(
    BeneficiariesConsolidate: IBeneficiariesConsolidateInterface
  ): Promise<IBeneficiariesConsolidateInterface | null>;
  getBeneficiariesConsolidatePaginate(
    filters: IBeneficiariesConsolidateFiltersInterface
  ): Promise<IPagingData<IBeneficiariesConsolidateInterface>>;
  updateBeneficiariesConsolidate(
    BeneficiariesConsolidate: IBeneficiariesConsolidateInterface,
    id: number
  ): Promise<IBeneficiariesConsolidateInterface | null>;
  deleteBeneficiariesConsolidate(
    id: number
  ): Promise<IBeneficiariesConsolidateInterface | null>;
}

export default class BeneficiariesConsolidateRepository
  implements IBeneficiariesConsolidateRepository
{
  constructor() {}

  async getBeneficiariesConsolidateById(
    id: number
  ): Promise<IBeneficiariesConsolidateInterface[] | null> {
    const queryBeneficiariesConsolidate =
      BeneficiariesConsolidate.query().where("id", id);
    const beneficiaries = await queryBeneficiariesConsolidate;

    if (beneficiaries.length === 0) {
      return null;
    }
    return beneficiaries.map(
      (i) => i.serialize() as IBeneficiariesConsolidateInterface
    );
  }

  async createBeneficiariesConsolidate(
    beneficiaries: IBeneficiariesConsolidateInterface
  ): Promise<IBeneficiariesConsolidateInterface | null> {
    const existBeneficiariesConsolidate = BeneficiariesConsolidate.query()
      .where("name", BeneficiariesConsolidate.name)
      .orWhereBetween("from", [
        moment(beneficiaries.from).startOf("day").toDate(),
        moment(beneficiaries.until).startOf("day").toDate(),
      ])
      .orWhereBetween("until", [
        moment(beneficiaries.from).startOf("day").toDate(),
        moment(beneficiaries.until).startOf("day").toDate(),
      ])
      .orWhere((subquery) => {
        subquery
          .where(
            "from",
            "<=",
            moment(new Date(beneficiaries.from)).startOf("day").toDate()
          )
          .andWhere(
            "until",
            ">=",
            moment(new Date(beneficiaries.until)).endOf("day").toDate()
          );
      });

    const exeBeneficiariesConsolidatee = await existBeneficiariesConsolidate;

    if (exeBeneficiariesConsolidatee.length > 0) return null;

    const toCreate = new BeneficiariesConsolidate();
    toCreate.fill({
      ...beneficiaries,
    });
    await toCreate.save();
    return toCreate.serialize() as IBeneficiariesConsolidateInterface;
  }

  async getBeneficiariesConsolidatePaginate(
    filters: IBeneficiariesConsolidateFiltersInterface
  ): Promise<IPagingData<IBeneficiariesConsolidateInterface>> {
    const res = BeneficiariesConsolidate.query();

    if (filters.name) {
      res.where("name", filters.name);
    }

    if (filters.from && filters.until) {
      res.whereBetween("from", [
        moment(new Date(filters.from)).startOf("day").toDate(),
        moment(new Date(filters.until)).startOf("day").toDate(),
      ]);

      res.orWhereBetween("until", [
        moment(new Date(filters.from)).startOf("day").toDate(),
        moment(new Date(filters.until)).startOf("day").toDate(),
      ]);
    } else if (filters.from) {
      res.where(
        "from",
        ">=",
        moment(new Date(filters.from)).startOf("day").toDate()
      );
    } else if (filters.until) {
      res.where(
        "until",
        "<=",
        moment(new Date(filters.until)).endOf("day").toDate()
      );
    }

    const workerBeneficiariesConsolidatePaginated = await res.paginate(
      filters.page,
      filters.perPage
    );

    const { data, meta } = workerBeneficiariesConsolidatePaginated.serialize();
    const dataArray = data ?? [];

    return {
      array: dataArray as IBeneficiariesConsolidateInterface[],
      meta,
    };
  }

  async updateBeneficiariesConsolidate(
    beneficiaries: IBeneficiariesConsolidateInterface,
    id: number
  ): Promise<IBeneficiariesConsolidateInterface | null> {
    const toUpdate = await BeneficiariesConsolidate.find(id);

    if (!toUpdate) {
      return null;
    }

    const existBeneficiariesConsolidate = BeneficiariesConsolidate.query()
      .where("name", beneficiaries.name)
      .orWhereBetween("from", [
        moment(beneficiaries.from).startOf("day").toDate(),
        moment(beneficiaries.until).startOf("day").toDate(),
      ])
      .orWhereBetween("until", [
        moment(beneficiaries.from).startOf("day").toDate(),
        moment(beneficiaries.until).startOf("day").toDate(),
      ])
      .orWhere((subquery) => {
        subquery
          .where(
            "from",
            "<=",
            moment(new Date(beneficiaries.from)).startOf("day").toDate()
          )
          .andWhere(
            "until",
            ">=",
            moment(new Date(beneficiaries.until)).endOf("day").toDate()
          );
      });

    let exeBeneficiariesConsolidatee = await existBeneficiariesConsolidate;
    const index: number = exeBeneficiariesConsolidatee.findIndex(
      (item: BeneficiariesConsolidate, index: number) => {
        return item.id === id ? index : 0;
      }
    );

    if (index) {
      exeBeneficiariesConsolidatee.splice(index, 1);
    }

    if (exeBeneficiariesConsolidatee.length > 0) return null;

    toUpdate.fill({ ...toUpdate, ...BeneficiariesConsolidate });

    await toUpdate.save();

    return toUpdate.serialize() as IBeneficiariesConsolidateInterface;
  }

  async deleteBeneficiariesConsolidate(
    id: number
  ): Promise<IBeneficiariesConsolidateInterface | null> {
    const toDelete = await BeneficiariesConsolidate.find(id);

    if (!toDelete) {
      return null;
    }

    toDelete.fill({ ...toDelete });

    await toDelete.delete();

    return toDelete.serialize() as IBeneficiariesConsolidateInterface;
  }
}
