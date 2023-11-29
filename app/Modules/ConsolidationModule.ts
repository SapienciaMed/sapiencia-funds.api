declare module "@ioc:core.ConsolidationProvider" {
  import { IConsolidationService } from "App/Services/ConsolidationService";

  const ConsolidationProvider: IConsolidationService;
  export default ConsolidationProvider;
}
