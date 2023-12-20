declare module "@ioc:core.RemnantProvider" {
    import { IRemnantService } from "App/Services/RemnantService";
    const RemnantProvider: IRemnantService;
    export default RemnantProvider;
  }