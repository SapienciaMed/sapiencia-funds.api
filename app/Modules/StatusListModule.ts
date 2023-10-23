declare module "@ioc:core.StatusListProvider" {
  import { IStatusListService } from "App/Services/StatusListService";
  
  const StatusListProvider: IStatusListService;
  export default StatusListProvider;
}
