declare module "@ioc:core.SocializationModule" {
  import { ISocializationService } from "App/Services/SocializationService";

  const SocializationModules: ISocializationService;
  export default SocializationModules;
}