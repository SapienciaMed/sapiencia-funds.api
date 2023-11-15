declare module "@ioc:core.CutsProvider" {
  import { ICutService } from "App/Services/CutService";

  const CutsProvider: ICutService;
  export default CutsProvider;
}
