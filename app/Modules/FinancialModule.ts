declare module "@ioc:core.FinancialProvider" {
    import { IMasterActivityService } from "App/Services/MasterActivityService";
    const FinancialProvider: IMasterActivityService;
    export default FinancialProvider;
}