declare module "@ioc:core.LegalizedProvider" {
  import { ILegalizedService } from "App/Services/LegalizedService";
  const LegalizedProvider: ILegalizedService;
  export default LegalizedProvider;
}
