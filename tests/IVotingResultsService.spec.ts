import test from "japa";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import VotingResultsService from "App/Services/VotingResultsService";
import { VotingResultsRepositoryFake } from "./FakeClass/VotingResultsRepositoryFake";
import { ApiResponse } from "App/Utils/ApiResponses";
import VotingResultsRepository from 'App/Repositories/VotingResultsRepository'

const service = new VotingResultsService(new VotingResultsRepositoryFake());


test.group("RolService TEST for getVotingResultsById", () => {
  test("class service must have a method getVotingResultsById with a return", async (assert) => {
    const result = service.getVotingResultsById("filter");
    assert.isNotNull(result);
  });
  
  test("the method getVotingResultsById must be a promise", async (assert) => {
    const result = service.getVotingResultsById("filter");
    assert.typeOf(result, "Promise");
  });
  
  test("the method getVotingResultsById must return a ApiResponse", async (assert) => {
    const result = await service.getVotingResultsById("filter");
    assert.instanceOf(result, ApiResponse);
  });
  
  test("the method getVotingResultsById must return a OK code ", async (assert) => {
    const result = await service.getVotingResultsById("filter");
    assert.isTrue(result.operation.code === EResponseCodes.OK);
  });

  const filters = {
    communeNeighborhood: 1,
    numberProject: 1,
    validity: "2024",
    ideaProject: "prueba",
    page: 1,
    perPage: 10
  }

  test("the method getVotingPaginated must return a OK code ", async (assert) => {
    const votingRepo = new VotingResultsRepository()
    const result = await votingRepo.getVotingPaginate(filters);
    assert.isArray(result.array)
  });

  /* test('should paginate masters', async (assert) => {
    const masterRepo = new MasterRepository()
    const filters = {codtlmo: 1, page: 1, perPage: 10 }
    const paginatedMasters = await masterRepo.getMasterPaginate(filters)
    assert.isArray(paginatedMasters.array)
  }) */

  const datos =

  {
    "communeNeighborhood": 1,
    "numberProject": 1,
    "validity": "2024",
    "ideaProject": "pruebas",
    "items": [
      {
        "aimStraight": 90,
        "productCatalogueDnp": 120,
        "codProductgueDnp": 1,
        "codPmaProgram": "1",
        "codMtaTeacherActivity": "1",
        "amount": "1000",
        "costTotal": "2000",
        "percentage123": "25",
        "percentage456": "30"
      },
      {
        "aimStraight": 85,
        "productCatalogueDnp": 110,
        "codProductgueDnp": 1,
        "codPmaProgram": "1",
        "codMtaTeacherActivity": "1",
        "amount": "1500",
        "costTotal": "3000",
        "percentage123": "20",
        "percentage456": "35"
      }
    ]
  };

  test("the method createVotingResult must return a OK code ", async (assert) => {
    const result = await service.createVotingResult(datos);
    assert.isTrue(result.operation.code === EResponseCodes.OK);
  });
});
