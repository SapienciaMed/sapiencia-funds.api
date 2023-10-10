import type { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    // Register your own bindings

    /**************************************************************************/
    /******************************** SERVICES ********************************/
    /**************************************************************************/
    const VotingResultsService = await import("App/Services/VotingResultsService");
    const IMasterActivityService = await import("App/Services/MasterActivityService");
    const MasterService = await import("App/Services/MasterService");
    const TypeMasterListService = await import("App/Services/TypeMasterListService");

    /**************************************************************************/
    /************************ EXTERNAL SERVICES ********************************/
    /**************************************************************************/

    /**************************************************************************/
    /******************************** REPOSITORIES ****************************/
    /**************************************************************************/
    const VotingResultsRepository = await import(
      "App/Repositories/VotingResultsRepository"
    );
    const MasterActivityRepository = await import(
      "App/Repositories/MasterActivityRepository"
    );
    const MasterRepository = await import(
      "App/Repositories/MasterRepository"
    );
    const TypeMasterListRepository = await import(
      "App/Repositories/TypeMasterListRepository"
    );
    

    /**************************************************************************/
    /******************************** CORE  ***********************************/
    /**************************************************************************/

    this.app.container.singleton(
      "core.VotingResultsProvider",
      () => new VotingResultsService.default(new VotingResultsRepository.default())
    );
    this.app.container.singleton(
      "core.MasterActivityProvider",
      () => new IMasterActivityService.default(new MasterActivityRepository.default())
    );
    this.app.container.singleton(
      "core.MasterProvider",
      () => new MasterService.default(new MasterRepository.default())
    );    
    this.app.container.singleton(
      "core.TypeMasterListProvider",
      () => new TypeMasterListService.default(new TypeMasterListRepository.default())
    );    
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
