import excel4node from "excel4node";
import * as XLSX from "xlsx";

type IColumn = {
  size?: number;
  name: string;
};

type IGenerateXLSX = {
  worksheetName?: string;
  columns: IColumn[];
  data: string[][];
  filePath: string;
};

export const generateXLSX = (config: IGenerateXLSX) => {
  return new Promise((resolve, reject) => {
    const { worksheetName, columns, data, filePath } = config;
    const workbook = new excel4node.Workbook();
    const worksheet = workbook.addWorksheet(worksheetName ?? "worksheet");
    let headingColumnIndex = 1;

    // Escribir encabezados
    columns.forEach((column) => {
      const { name, size } = column;
      worksheet.column(headingColumnIndex).setWidth(size);
      worksheet.cell(1, headingColumnIndex++).string(name);
    });

    // Escribir datos
    let rowIndex = 2;
    data.forEach((rowData) => {
      let columnIndex = 1;
      rowData.forEach((item) => {
        worksheet.cell(rowIndex, columnIndex++).string(item);
      });
      rowIndex++;
    });

    workbook.write(filePath, (err) => {
      if (err) reject(err);
      resolve(filePath);
    });
  });
};

export const generateExcel = (rows: any): Promise<any> => {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  return buffer;
};
