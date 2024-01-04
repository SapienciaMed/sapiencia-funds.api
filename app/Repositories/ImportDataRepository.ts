import AuroraEpmRenovado from "App/Models/Sapiencia/AuroraEpmRenovado";
import {
  IAuroraEM,
  IAuroraEPM,
  IAuroraEfe,
  IAuroraFa,
  IAuroraPP,
} from "App/Interfaces/SapienciaInterface";
import AuroraPpRenovado from "App/Models/Sapiencia/AuroraPpRenovado";
import AuroraEfeRenovado from "App/Models/Sapiencia/AuroraEfeRenovado";
import AuroraFaRenovado from "App/Models/Sapiencia/AuroraFaRenovado";
import AuroraEMRenovado from "App/Models/Sapiencia/AuroraEnlazamundo";

export interface IImportRepository {
  getSapienciaEPMBeneficiary(): Promise<IAuroraEPM[]>;
  getSapienciaPPBeneficiary(): Promise<IAuroraPP[]>;
  getSapienciaEfeBeneficiary(): Promise<IAuroraEfe[]>;
  getSapienciaFaBeneficiary(): Promise<IAuroraFa[]>;
  getSapienciaEMBeneficiary(): Promise<IAuroraEM[]>;
}

export default class ImportRepository implements IImportRepository {
  public async getSapienciaEPMBeneficiary(): Promise<IAuroraEPM[]> {
    const res = await AuroraEpmRenovado.all();
    return res as unknown as IAuroraEPM[];
  }

  public async getSapienciaPPBeneficiary(): Promise<IAuroraPP[]> {
    const res = await AuroraPpRenovado.all();
    return res as unknown as IAuroraPP[];
  }

  public async getSapienciaEfeBeneficiary(): Promise<IAuroraEfe[]> {
    const res = await AuroraEfeRenovado.all();
    return res as IAuroraEfe[];
  }

  public async getSapienciaFaBeneficiary(): Promise<IAuroraFa[]> {
    const res = await AuroraFaRenovado.all();
    return res as IAuroraFa[];
  }

  public async getSapienciaEMBeneficiary(): Promise<IAuroraEM[]> {
    const res = await AuroraEMRenovado.all();
    return res as IAuroraEM[];
  }
}
