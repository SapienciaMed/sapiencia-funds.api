import { IActa } from "App/Interfaces/ActaInterface";
import Acta from "App/Models/Acta";
import ActaItems from "App/Models/ActaItems";


export interface IActaRepository {
    createActa(acta: IActa): Promise<IActa>;
}

export default class ActaRepository implements IActaRepository {
    constructor() {}

    
  async createActa(acta: IActa): Promise<IActa> {
    const toCreate = new Acta();

    toCreate.fill({ ...acta });
    await toCreate.save();

    const saveItemPromises = acta.items!.map(itemData => {
      const item = new ActaItems();
      item.fill({ ...itemData, idActa: toCreate.id.toString() });
      return item.save();
    });

    await Promise.all(saveItemPromises);

    await toCreate.load('items');

    return toCreate.serialize() as IActa;
  }

}