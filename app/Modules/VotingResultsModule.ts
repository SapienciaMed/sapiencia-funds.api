declare module "@ioc:core.VotingResultsProvider" {
  import { IVotingResultsService } from "App/Services/VotingResultsService";

  const VotingResultsProvider: IVotingResultsService;
  export default VotingResultsProvider;
}
