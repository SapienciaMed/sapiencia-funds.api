import { ICallBudget } from "App/Interfaces/CallBudgetInterfaces";
import CallBudget from "App/Models/Sapiencia/Callbudget";


export interface ICallBudgetRepository {
  getAllCallBudget(): Promise<ICallBudget[]>;
}

export default class CallBudgetRepository implements ICallBudgetRepository {
  constructor() {}

  async getAllCallBudget(): Promise<ICallBudget[]> {
    
    const res = await CallBudget.query();

    return res.map((i) => i.serialize() as ICallBudget);
  }
}
