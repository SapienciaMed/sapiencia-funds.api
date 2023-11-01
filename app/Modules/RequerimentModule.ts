declare module "@ioc:core.RequerimentProvider" {
  import { IRequerimentService } from "App/Services/RequerimentService";

  const RequerimentProvider: IRequerimentService;
  export default RequerimentProvider;
}
