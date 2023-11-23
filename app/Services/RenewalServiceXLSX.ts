import Application from "@ioc:Adonis/Core/Application";
import { ICallRenewal } from "App/Interfaces/CallRenewalInterface";
import { IPagingData } from "App/Utils/ApiResponses";

export const furnitureXLSXcolumnNames = [
  {
    name: "Fondo",
    size: 30,
  },
  {
    name: "N°. habilitados",
    size: 15,
  },
  {
    name: "N°. renovados",
    size: 15,
  },
  {
    name: "%",
    size: 10,
  },

];

export const furnitureXLSXRows = (
  accountStatementsFound: IPagingData<ICallRenewal>
) =>
  accountStatementsFound.array.reduce((prev, curr) => {
    return [
      ...prev,
      [
        String(curr.fund),
        String(curr.enabled),
        String(curr.renewed),
        String(curr.percentage),
      ],
    ];
  }, []);

export const furnitureXLSXFilePath = Application.tmpPath(
  "/activos_fijos.xlsx"
);