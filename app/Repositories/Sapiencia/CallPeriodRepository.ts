import { ICallPeriod } from "App/Interfaces/CallPeriodInterfaces";
import CallPeriod from "App/Models/Sapiencia/CallPeriod";

export interface ICallPeriodRepository {
  getAllCallPeriod(): Promise<ICallPeriod[]>;
}

export default class CallPeriodRepository implements ICallPeriodRepository {
  constructor() {}

  async getAllCallPeriod(): Promise<ICallPeriod[]> {
    const res = await CallPeriod.query();

    return res.map((i) => i.serialize() as ICallPeriod);
  }
}
