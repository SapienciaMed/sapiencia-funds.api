import test from "japa";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import VotingResultsService from "App/Services/VotingResultsService";
import { VotingResultsRepositoryFake } from "./FakeClass/VotingResultsRepositoryFake";
import { ApiResponse } from "App/Utils/ApiResponses";

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
});
