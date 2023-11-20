import Application from "@ioc:Adonis/Core/Application";
import { ICallDating } from "App/Interfaces/CallDatingInterfaces";
import { IPagingData } from "App/Utils/ApiResponses";

export const furnitureXLSXcolumnNames = [
  {
    name: "Usuario",
    size: 15,
  },
  {
    name: "Taquilla",
    size: 25,
  },
  {
    name: "Fecha",
    size: 30,
  },
  {
    name: "Hora inicio",
    size: 15,
  },
  {
    name: "Estado",
    size: 20,
  },
  {
    name: "Nombre",
    size: 20,
  },
  {
    name: "identificación",
    size: 25,
  },

];

export const furnitureXLSXRows = (
  accountStatementsFound: IPagingData<ICallDating>
) =>
  accountStatementsFound.array.reduce((prev, curr) => {
    return [
      ...prev,
      [
        String(curr.usuario),
        String(curr.taquilla),
        String(curr.fecha),
        String(curr.hora_inicio),
        String(curr.estado),
        String(curr.nombre),
        String(curr.identificacion),

      ],
    ];
  }, []);

export const furnitureXLSXFilePath = Application.tmpPath(
  "/activos_fijos.xlsx"
);
