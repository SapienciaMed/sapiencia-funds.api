import Application from "@ioc:Adonis/Core/Application";
import { ICallBudget } from "App/Interfaces/CallBudgetInterfaces";
import { IPagingData } from "App/Utils/ApiResponses";

export const furnitureXLSXcolumnNames = [
  {
    name: "Fondo comuna",
    size: 15,
  },
  {
    name: "Presupuesto fondo comuna",
    size: 30,
  },
  {
    name: "Recurso otorgado de legalizacion",
    size: 30,
  },
  {
    name: "Restante",
    size: 15,
  },
  {
    name: "Usuarios por comuna",
    size: 20,
  },
  {
    name: "Total proyectado",
    size: 20,
  },
  {
    name: "Diferencia por comprometer",
    size: 25,
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
        String(curr.acumulado_legali_comuna),
        String(curr.restante_presupuesto_comuna),
        String(curr.numero_usuarios_comuna),
        String(curr.total_proyectado),
        String(curr.Diferencia),

      ],
    ];
  }, []);

export const furnitureXLSXFilePath = Application.tmpPath(
  "/activos_fijos.xlsx"
);
