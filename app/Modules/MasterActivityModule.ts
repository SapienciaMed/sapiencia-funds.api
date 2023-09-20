declare module "@ioc:core.MasterActivityProvider" {
    import { IMasterActivityService } from "App/Services/MasterActivityService";
  
    const MasterActivityProvider: IMasterActivityService;
    export default MasterActivityProvider;
  }