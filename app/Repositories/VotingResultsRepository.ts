import { IVotingFilters, IVotingResults } from "App/Interfaces/VotingResultsInterfaces";
import VotingResults from "../Models/VotingResults";
import MasterActivity from "App/Models/MasterActivity";
import { IMasterActivityVoting } from "App/Interfaces/MasterActivityInterface";
import Item from "App/Models/Item";
import { IPagingData } from "App/Utils/ApiResponses";
import { IItemResults, ISVotinResultGrid } from "App/Interfaces/ItemInterface";

export interface IVotingResultsRepository {
  getVotingResultsById(id: string): Promise<IVotingResults | null>;
  getActivityProgram(id: number): Promise<IMasterActivityVoting[]>;
  createVotingResult(voting: IVotingResults): Promise<IVotingResults>;
  updateVotingResult(voting: IVotingResults, id: number): Promise<IVotingResults | null>;
  getVotingPaginate(filters: IVotingFilters): Promise<IPagingData<IItemResults>>;
  getVotingPaginateXlsx(filters: IVotingFilters): Promise<any>;
  getPaginatedtotal(filters: IVotingFilters): Promise<any>;

}

export default class VotingResultsRepository implements IVotingResultsRepository {
  constructor() { }

  async getVotingPaginate(
    filters: IVotingFilters
  ): Promise<IPagingData<IItemResults>> {
    const toReturn: ISVotinResultGrid[] = [];

    const query = Item.query()
      .select(
        "PMA_NOMBRE as programa45",
        "ITM_CODIGO as iditem",
        "ITM_PORCENTAJE_123 as pct123",
        "ITM_PORCENTAJE_456 as pct456",
        "ITM_OBJETIVO_DIRECTO as aimStraight",
        "ITM_PRODUCTO_CATALOGO_DNP as productCatalogueDnp",
        "ITM_CODIGO_PRODUCTO_DNP as codProductgueDnp",
        "MTA_NOMBRE as activity454", 
        "MTA_CODIGO as idactivity",
        "MTA_VALOR as activitytotalValue",
        "ITM_CANTIDAD as amountitem",
        "ITM_COSTO_TOTAL as costTotaliten",
        "RTV_CODIGO as codRtVotingResultid",
        "PMA_CODIGO as codProgram",
        "MTA_CODPMA_PROGRAMA as codProgramCoder",
        "MTA_DESCRIPCION as descriptions",
        "MTA_USUARIO_MODIFICO as userModifiedd",
        "MTA_FECHA_MODIFICO as dateModifiedd",
        "MTA_USUARIO_CREO as userCreater",
        "MTA_FECHA_CREO as dateCreatee"
      )
      .leftJoin("RTV_RESULTADO_VOTACION", "ITM_CODRTV_RESULTADO_VOTACION", "RTV_RESULTADO_VOTACION.RTV_CODIGO")
      .leftJoin("MTA_MAESTRO_ACTIVIDAD", "ITM_CODMTA_MAESTRO_ACTIVIDAD", "MTA_MAESTRO_ACTIVIDAD.MTA_CODIGO")
      .leftJoin("PMA_PROGRAMA", "MTA_CODPMA_PROGRAMA", "PMA_PROGRAMA.PMA_CODIGO")
    
  

    if (filters.communeNeighborhood) {
      query.whereILike(
        "RTV_COMUNA_BARRIO",
        `%${filters.communeNeighborhood}%`
      );
    }
    if (filters.numberProject) {
      query.whereILike("RTV_NUMERO_PROYECTO", `%${filters.numberProject}%`);
    }
    if (filters.validity) {
      query.whereILike("RTV_VIGENCIA", `%${filters.validity}%`);
    }

    if (filters.ideaProject) {
      query.whereILike("RTV_IDEA_PROYECTO", `%${filters.ideaProject}%`);
    }


    const res = await query.paginate(filters.page, filters.perPage);

    res
      .map((i) => i.$extras)
      .forEach((i: any) => {

        toReturn.push({
          id: i.iditem ,
          aimStraight: i.aimStraight,
          productCatalogueDnp: i.productCatalogueDnp,
          codProductgueDnp: i.codProductgueDnp ,
          codPmaProgram: i.codProgram,
          amount: i.amountitem,
          costTotal: i.costTotaliten,
          percentage123: i.pct123 ,
          percentage456: i.pct456 ,
          codMtaTeacherActivity: i.idactivity ,
          codRtVotingResult: i.codRtVotingResultid ,
          activity: {
            userCreate: i.userCreater,
            id: i.idactivity,
            name: i.activity454,
            totalValue: i.activitytotalValue,
            codProgramCode: i.codProgramCoder,
            description: i.descriptions,
            userModified: i.asuserModifiedd,
            dateModified: i.dateModifiedd,
            dateCreate: i.dateCreatee,
            typesProgram: {
                id: i.codProgram,
                name: i.programa45
            }
          }
        });
      });



    const { meta } = res.serialize();

    // const itemsArray = dataArray.flatMap((votingResult) => votingResult.items);

    return {
      array: toReturn as any[],
      meta,
    };
  }

  async getVotingPaginateXlsx(
    filters: IVotingFilters
    ): Promise<any> {
    
    const toReturn: ISVotinResultGrid[] = [];

    const query = Item.query()
      .select(
        "PMA_NOMBRE as programa45",
        "ITM_CODIGO as iditem",
        "ITM_PORCENTAJE_123 as pct123",
        "ITM_PORCENTAJE_456 as pct456",
        "ITM_OBJETIVO_DIRECTO as aimStraight",
        "ITM_PRODUCTO_CATALOGO_DNP as productCatalogueDnp",
        "ITM_CODIGO_PRODUCTO_DNP as codProductgueDnp",
        "MTA_NOMBRE as activity454", 
        "MTA_CODIGO as idactivity",
        "MTA_VALOR as activitytotalValue",
        "ITM_CANTIDAD as amountitem",
        "ITM_COSTO_TOTAL as costTotaliten",
        "RTV_CODIGO as codRtVotingResultid",
        "PMA_CODIGO as codProgram",
        "MTA_CODPMA_PROGRAMA as codProgramCoder",
        "MTA_DESCRIPCION as descriptions",
        "MTA_USUARIO_MODIFICO as userModifiedd",
        "MTA_FECHA_MODIFICO as dateModifiedd",
        "MTA_USUARIO_CREO as userCreater",
        "MTA_FECHA_CREO as dateCreatee"
      )
      .leftJoin("RTV_RESULTADO_VOTACION", "ITM_CODRTV_RESULTADO_VOTACION", "RTV_RESULTADO_VOTACION.RTV_CODIGO")
      .leftJoin("MTA_MAESTRO_ACTIVIDAD", "ITM_CODMTA_MAESTRO_ACTIVIDAD", "MTA_MAESTRO_ACTIVIDAD.MTA_CODIGO")
      .leftJoin("PMA_PROGRAMA", "MTA_CODPMA_PROGRAMA", "PMA_PROGRAMA.PMA_CODIGO")
    
    
    if (filters.communeNeighborhood) {
      query.whereILike(
        "RTV_COMUNA_BARRIO",
        `%${filters.communeNeighborhood}%`
      );
    }
    if (filters.numberProject) {
      query.whereILike("RTV_NUMERO_PROYECTO", `%${filters.numberProject}%`);
    }
    if (filters.validity) {
      query.whereILike("RTV_VIGENCIA", `%${filters.validity}%`);
    }

    if (filters.ideaProject) {
      query.whereILike("RTV_IDEA_PROYECTO", `%${filters.ideaProject}%`);
    }

    const res = await query;

    res
      .map((i) => i.$extras)
      .forEach((i: any) => {

        toReturn.push({
          id: i.iditem ,
          aimStraight: i.aimStraight,
          productCatalogueDnp: i.productCatalogueDnp,
          codProductgueDnp: i.codProductgueDnp ,
          codPmaProgram: i.codProgram,
          amount: i.amountitem,
          costTotal: i.costTotaliten,
          percentage123: i.pct123 ,
          percentage456: i.pct456 ,
          codMtaTeacherActivity: i.idactivity ,
          codRtVotingResult: i.codRtVotingResultid ,
          activity: {
            userCreate: i.userCreater,
            id: i.idactivity,
            name: i.activity454,
            totalValue: 9999999999,
            codProgramCode: i.codProgramCoder,
            description: i.descriptions,
            userModified: i.asuserModifiedd,
            dateModified: i.dateModifiedd,
            dateCreate: i.dateCreatee,
            typesProgram: {
                id: i.codProgram,
                name: i.programa45
            }
          }
        });
      });

   const arrayResp: any = [];
      toReturn.map((e : any) => {
      arrayResp.push({
        "Objetivo directo": e.aimStraight,
        "Producto catalogo dnp": e.codProductgueDnp,
        "Código catalogo dnp": e.productCatalogueDnp,
        "Programa": e.activity.typesProgram.name,
        "Actividad": e.activity.name,
        "Valor Actividad" : e.activity.totalValue,
        "Cantidad" : e.amount,
        "Costo Total" : e.costTotal,
        "Porcentaje 123" : e.percentage123,
        "Porcentaje 456" : e.percentage456,

      });
    })
    return arrayResp as any[]
    

  }

  async getPaginatedtotal(
    filters: IVotingFilters
    ): Promise<any> {
    
    const toReturn: ISVotinResultGrid[] = [];

    const query = Item.query()
      .select(
        "PMA_NOMBRE as programa45",
        "ITM_CODIGO as iditem",
        "ITM_PORCENTAJE_123 as pct123",
        "ITM_PORCENTAJE_456 as pct456",
        "ITM_OBJETIVO_DIRECTO as aimStraight",
        "ITM_PRODUCTO_CATALOGO_DNP as productCatalogueDnp",
        "ITM_CODIGO_PRODUCTO_DNP as codProductgueDnp",
        "MTA_NOMBRE as activity454", 
        "MTA_CODIGO as idactivity",
        "MTA_VALOR as activitytotalValue",
        "ITM_CANTIDAD as amountitem",
        "ITM_COSTO_TOTAL as costTotaliten",
        "RTV_CODIGO as codRtVotingResultid",
        "PMA_CODIGO as codProgram",
        "MTA_CODPMA_PROGRAMA as codProgramCoder",
        "MTA_DESCRIPCION as descriptions",
        "MTA_USUARIO_MODIFICO as userModifiedd",
        "MTA_FECHA_MODIFICO as dateModifiedd",
        "MTA_USUARIO_CREO as userCreater",
        "MTA_FECHA_CREO as dateCreatee"
      )
      .leftJoin("RTV_RESULTADO_VOTACION", "ITM_CODRTV_RESULTADO_VOTACION", "RTV_RESULTADO_VOTACION.RTV_CODIGO")
      .leftJoin("MTA_MAESTRO_ACTIVIDAD", "ITM_CODMTA_MAESTRO_ACTIVIDAD", "MTA_MAESTRO_ACTIVIDAD.MTA_CODIGO")
      .leftJoin("PMA_PROGRAMA", "MTA_CODPMA_PROGRAMA", "PMA_PROGRAMA.PMA_CODIGO")
    
    
    if (filters.communeNeighborhood) {
      query.whereILike(
        "RTV_COMUNA_BARRIO",
        `%${filters.communeNeighborhood}%`
      );
    }
    if (filters.numberProject) {
      query.whereILike("RTV_NUMERO_PROYECTO", `%${filters.numberProject}%`);
    }
    if (filters.validity) {
      query.whereILike("RTV_VIGENCIA", `%${filters.validity}%`);
    }

    if (filters.ideaProject) {
      query.whereILike("RTV_IDEA_PROYECTO", `%${filters.ideaProject}%`);
    }

    const res = await query;

    res
      .map((i) => i.$extras)
      .forEach((i: any) => {

        toReturn.push({
          id: i.iditem ,
          aimStraight: i.aimStraight,
          productCatalogueDnp: i.productCatalogueDnp,
          codProductgueDnp: i.codProductgueDnp ,
          codPmaProgram: i.codProgram,
          amount: i.amountitem,
          costTotal: i.costTotaliten,
          percentage123: i.pct123 ,
          percentage456: i.pct456 ,
          codMtaTeacherActivity: i.idactivity ,
          codRtVotingResult: i.codRtVotingResultid ,
          activity: {
            userCreate: i.userCreater,
            id: i.idactivity,
            name: i.activity454,
            totalValue: 9999999999,
            codProgramCode: i.codProgramCoder,
            description: i.descriptions,
            userModified: i.asuserModifiedd,
            dateModified: i.dateModifiedd,
            dateCreate: i.dateCreatee,
            typesProgram: {
                id: i.codProgram,
                name: i.programa45
            }
          }
        });
      });



    return {
      data: toReturn as any[],
    };

  }

  async getVotingResultsById(id: string): Promise<IVotingResults | null> {
    const res = await VotingResults.find(id);
    if (res) {
      await res.load('items');
      return res.serialize() as IVotingResults;
    }
    return null;
  }

  async getActivityProgram(id: number): Promise<IMasterActivityVoting[]> {
    const res = MasterActivity.query().where("codProgramCode", id);
    const rsp = await res;
    return rsp.map((i) => i.serialize() as IMasterActivityVoting);
  }

  async createVotingResult(voting: IVotingResults): Promise<IVotingResults> {
    const toCreate = new VotingResults();

    toCreate.fill({ ...voting });
    await toCreate.save();

    const saveItemPromises = voting.items!.map(itemData => {
      const item = new Item();
      item.fill({ ...itemData, codRtVotingResult: toCreate.id });
      return item.save();
    });

    await Promise.all(saveItemPromises);

    await toCreate.load('items');

    return toCreate.serialize() as IVotingResults;
  }

  async updateVotingResult(voting: IVotingResults, id: number): Promise<IVotingResults | null> {
    const toUpdate = await VotingResults.find(id);

    if (!toUpdate) {
      return null;
    }

    await Item.query().where('ITM_CODRTV_RESULTADO_VOTACION', id).delete();

    toUpdate.communeNeighborhood = voting.communeNeighborhood;
    toUpdate.numberProject = voting.numberProject;
    toUpdate.validity = voting.validity;
    toUpdate.ideaProject = voting.ideaProject;

    await toUpdate.save();

    const saveItemPromises = voting.items!.map(itemData => {
      const item = new Item();
      item.fill({ ...itemData, codRtVotingResult: toUpdate.id });
      return item.save();
    });

    await Promise.all(saveItemPromises);

    await toUpdate.load('items');

    return toUpdate.serialize() as IVotingResults;
  }

}

