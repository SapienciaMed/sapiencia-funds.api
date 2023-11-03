declare module "@ioc:core.BudgetProvider" {
    import { IBudgetService } from "App/Services/BudgetService";
    const BudgetProvider: IBudgetService;
    export default BudgetProvider;
}