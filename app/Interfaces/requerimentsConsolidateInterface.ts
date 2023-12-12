import { IBeneficiariesConsolidateInterface } from "./BeneficiariesConsolidateInterface";
import { IReglamentInterface } from "./IReglamentInterface";

export interface IRequerimentsConsolidate {
  id: number;
  idBeneficiary: number;
  idReglament: number;
  idRequirement: number;
  descriptionRequirement: string;
  activeRequirement: boolean;
  percentRequirement?: number;
  accomplished: boolean;
  mandatoryFor: string;
  reglament?: IReglamentInterface;
  beneficiary?: IBeneficiariesConsolidateInterface;
}
