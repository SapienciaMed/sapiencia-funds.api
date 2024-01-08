import Application from "@ioc:Adonis/Core/Application";
import { IAbsorptionPercentaje } from "App/Interfaces/AbsorptionPercentage";
import { IPagingData } from "App/Utils/ApiResponses";
import { formaterNumberToCurrency } from "App/Utils/helpers";

export const absorptionPercentageXLSXColumns = [
  {
    name: "FONDO COMUNA",
    size: 20,
  },
  {
    name: "RECURSO",
    size: 25,
  },
  {
    name: "%1",
    size: 15,
  },
  {
    name: "%2",
    size: 15,
  },
  {
    name: "%3",
    size: 15,
  },
  {
    name: "Valor 1",
    size: 25,
  },
  {
    name: "VALOR 2",
    size: 25,
  },
  {
    name: "VALOR 3",
    size: 25,
  },
];

export const absorptionPercentageXLSXRows = (
  absorptionPercentage: IPagingData<
    Omit<
      IAbsorptionPercentaje,
      "userModified" | "updatedAt" | "userCreated" | "createdAt"
    >
  >
) =>
  absorptionPercentage.array.reduce((prev, curr) => {
    return [
      ...prev,
      [
        curr.communeFundId.toString(),
        formaterNumberToCurrency(curr.resource),
        curr.sceneryPercentage1.toString(),
        curr.sceneryPercentage2.toString(),
        curr.sceneryPercentage3.toString(),
        formaterNumberToCurrency(curr.sceneryValue1),
        formaterNumberToCurrency(curr.sceneryValue2),
        formaterNumberToCurrency(curr.sceneryValue3),
      ],
    ];
  }, []);

export const absorptionPercentageXLSXFilePath = Application.tmpPath(
  "/porcentaje_absorcion.xlsx"
);
