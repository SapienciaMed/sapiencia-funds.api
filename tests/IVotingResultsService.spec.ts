import test from "japa";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import VotingResultsService from "App/Services/VotingResultsService";

import { ApiResponse } from "App/Utils/ApiResponses";
import VotingResultsRepository from "App/Repositories/VotingResultsRepository";
import { VotingResultsRepositoryFake } from "./FakeClass/VotingResultsRepositoryFake";

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
    perPage: 10,
  };

  test("the method getVotingPaginated must return a OK code ", async (assert) => {
    const votingRepo = new VotingResultsRepository();
    const result = await votingRepo.getVotingPaginate(filters);
    assert.isArray(result.array);
  });

  const datos = {
    communeNeighborhood: 1,
    numberProject: 1,
    validity: 2024,
    ideaProject: "pruebas",
  };

  test("the method createVotingResult must return a OK code ", async (assert) => {
    const result = await service.createVotingResult(datos);
    assert.isTrue(result.operation.code === EResponseCodes.OK);
  });
});
