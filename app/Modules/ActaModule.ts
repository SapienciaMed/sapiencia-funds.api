declare module "@ioc:core.ActaProvider" {
  import { IActaService } from "App/Services/ActaService";  

  const ActaProvider: IActaService;
  export default ActaProvider;
}
