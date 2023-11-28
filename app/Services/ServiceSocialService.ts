import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IImportServiceSocial } from "App/Interfaces/ImportServiceSocialInterface";
import { IServiceSocialRepository } from "App/Repositories/ServiceSocialRepository";
import { ApiResponse } from "App/Utils/ApiResponses";



export interface IServiceSocialService {   
    import(): Promise<ApiResponse<IImportServiceSocial[]>>;   
    insert(data: any[]): Promise<ApiResponse<any[]>>; 
}


export default class ServiceSocialService implements IServiceSocialService {

    constructor(
        private serviceSocialRepository: IServiceSocialRepository
    ) { }

    async import(): Promise<ApiResponse<IImportServiceSocial[]>> {
        try {
            const resPP = await this.serviceSocialRepository.import();

            if (!resPP || resPP.length === 0) {
                return new ApiResponse(
                    {} as any[],
                    EResponseCodes.FAIL,
                    "Registro no encontrado"
                );
            }                      

            const validateResponse = await this.validate({ data: resPP });

            if (validateResponse.data.length > 0) {
                const insertResponse = await this.insert({ data: validateResponse.data });
                return insertResponse;
            } 

            return validateResponse;
           
        } catch (error) {
            console.error("Error en el método 'import':", error);
            return new ApiResponse(
                {} as any[],
                EResponseCodes.FAIL,
                "Error al procesar la importación"
            );
        }
    }

    async insert(receivedData: any): Promise<ApiResponse<any[]>> {
       
        if (!receivedData || !Array.isArray(receivedData.data)) {
            return new ApiResponse(
                {} as any[],
                EResponseCodes.FAIL,
                "Datos inválidos o no proporcionados"
            );
        }
       
        const dataArray = receivedData.data;

        const transformedData = dataArray.map(item => ({
            legalizationPeriod: item.periodRenew,
            consolidationBeneficiary: item.id,
            hoursBorrowed: item.hoursServicePerform,
            // Agrega aquí cualquier otro campo que necesites
        }));

       try {
            const res = await this.serviceSocialRepository.insert(transformedData);
            return new ApiResponse(res, EResponseCodes.OK);
        } catch (error) {
            console.error("Error en el método 'insert':", error);
            return new ApiResponse(
                {} as any[],
                EResponseCodes.FAIL,
                "Error al insertar datos"
            );
        }      
    }

    async validate(receivedData): Promise<ApiResponse<any[]>> {

        // Extraer los registros del JSON
        const records = receivedData.data;
    
        // Lista para almacenar los registros nuevos
        let newRecords = [];
    
        // Iterar sobre cada registro
        for (const record of records) {
            // Extraer los campos necesarios para la validación
            const consolidationBeneficiary = record.id; 
            const legalizationPeriod = record.periodRenew;
            const hoursBorrowed = record.hoursServicePerform;           
         
            if (consolidationBeneficiary != null && legalizationPeriod != null) {
                // Verificar si el registro existe en la base de datos
                const existingRecord = await this.serviceSocialRepository.validate(consolidationBeneficiary, legalizationPeriod, hoursBorrowed);             
                
                // Si el registro no existe, añadirlo a la lista de nuevos registros
                if (!existingRecord) {
                    newRecords.push(record as never);
                }
            }    
        }    
        // Retornar la lista de registros nuevos
        return new ApiResponse(newRecords, EResponseCodes.OK);
    }    

}