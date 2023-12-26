import Application from "@ioc:Adonis/Core/Application";
import { ILegalizedItem } from "App/Interfaces/Legalized";
import { formaterNumberToCurrency } from "App/Utils/helpers";

export const legalizedXLSXColumns = [
  {
    name: "ID comuna",
    size: 15,
  },
  {
    name: "Recurso",
    size: 20,
  },
  {
    name: "Fiducia",
    size: 15,
  },
  {
    name: "Fecha de actualización",
    size: 20,
  },
  {
    name: "Orden",
    size: 10,
  },
];

export const legalizedXLSXRows = (legalizedData: ILegalizedItem[]) =>
  legalizedData.reduce((prev, curr) => {
    return [
      ...prev,
      [
        curr.communeFundId.toString(),
        formaterNumberToCurrency(curr.resource),
        curr.fiduciaryName,
        "25/08/2023",
        curr.order.toString(),
      ],
    ];
  }, []);

export const legalizedXLSXFilePath = Application.tmpPath("/legalizados.xlsx");
