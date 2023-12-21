import { ILegalizedPaginatedFilters } from "App/Interfaces/Legalized";

export interface ILegalizedRepository {
  getAllLegalizedPaginated(filters: ILegalizedPaginatedFilters): Promise<null>;
}

export default class LegalizedRepository implements ILegalizedRepository {
  // GET ALL ABSORPTION PERCENTAGE PAGINATED
  public async getAllLegalizedPaginated(filters: ILegalizedPaginatedFilters) {
    console.log(filters);
    return null;
  }
}
