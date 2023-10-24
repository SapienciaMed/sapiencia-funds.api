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

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    toCreate.fill({ ...acta,creationDate: formattedDate });
    await toCreate.save();

    const saveItemPromises = acta.items!.map(itemData => {
      const item = new ActaItems();
      const serializedPeriods = JSON.stringify(itemData.periods);
      item.fill({ ...itemData, periods: serializedPeriods, idActa: toCreate.id.toString() });
      return item.save();
    });

    await Promise.all(saveItemPromises);

    await toCreate.load('items');

    return toCreate.serialize() as IActa;
  }

}