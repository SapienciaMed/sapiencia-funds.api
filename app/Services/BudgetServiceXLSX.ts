import Application from "@ioc:Adonis/Core/Application";
import { ICallBudget } from "App/Interfaces/CallBudgetInterfaces";
import { IPagingData } from "App/Utils/ApiResponses";

export const furnitureXLSXcolumnNames = [
  {
    name: "Fondo comuna",
    size: 20,
  },
  {
    name: "Presupuesto fondo comuna",
    size: 12,
  },
  {
    name: "Recurso otorgado de legalizacion",
    size: 20,
  },
  {
    name: "Restante",
    size: 20,
  },
  {
    name: "Usuarios por comuna",
    size: 12,
  },

];

export const furnitureXLSXRows = (
  accountStatementsFound: IPagingData<ICallBudget>
) =>
  accountStatementsFound.array.reduce((prev, curr) => {
    return [
      ...prev,
      [
        String(curr.id_comuna),
        String(curr.presupuesto_comuna),
        String(curr.legaliza_comuna),
        String(curr.restante_presupuesto),
        String(curr.usuarios_comuna)

      ],
    ];
  }, []);

export const furnitureXLSXFilePath = Application.tmpPath(
  "/activos_fijos.xlsx"
);
