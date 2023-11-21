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
    size: 10,
  },
  {
    name: "Fecha",
    size: 15,
  },
  {
    name: "Hora inicio",
    size: 15,
  },
  {
    name: "Estado",
    size: 12,
  },
  {
    name: "Nombre",
    size: 40,
  },
  {
    name: "identificación",
    size: 15,
  },

];

export const furnitureXLSXRows = (
  accountStatementsFound: IPagingData<ICallDating>
) =>
  accountStatementsFound.array.reduce((prev, curr) => {
    return [
      ...prev,
      [
        String(curr.id_usuario),
        String(curr.taquilla),
        String(curr.fecha),
        String(curr.hora_inicio),
        String(curr.estado),
        String(curr.nombre),
        String(curr.cedula),

      ],
    ];
  }, []);

export const furnitureXLSXFilePath = Application.tmpPath(
  "/activos_fijos.xlsx"
);
