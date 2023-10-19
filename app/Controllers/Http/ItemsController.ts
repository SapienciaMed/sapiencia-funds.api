import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ItemsProvider from '@ioc:core.ItemsProvider';
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';
import ItemValidator from 'App/Validators/itemValidator';

export default class ItemsController {
    public async getItemsById({
        request,
        response,
    }: HttpContextContract) {
        try {
            const { id } = request.params();
            return response.send(
                await ItemsProvider.getItemsById(id)
            );
        } catch (err) {
            return response.badRequest(
                new ApiResponse(null, EResponseCodes.FAIL, String(err))
            );
        }
    }


    public async updateItems({ response, request }: HttpContextContract) {
        try {
            const { id } = request.params();
            const item = await request.validate(
                ItemValidator
            ); 

            return response.send(await ItemsProvider.updateItems(item, id));

        } catch (err) {
            response.badRequest(                
                new ApiResponse(null, EResponseCodes.FAIL, String(err))
            );
        }
    }

    public async deleteItem({ request, response }: HttpContextContract) {
        try {
          const { id } = request.params();
          return response.send(await ItemsProvider.deleteItem(id));
        } catch (err) {
          return response.badRequest(
            new ApiResponse(null, EResponseCodes.FAIL, String(err))
          );
        }
      }
}
