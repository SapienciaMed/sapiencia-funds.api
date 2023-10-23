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
    const ActaService = await import("App/Services/ActaService");
    const SapienciaService = await import("App/Services/SapienciaService");
    const ItemService = await import("App/Services/ItemService");

    const IUploadInformationService = await import("App/Services/UploadInformationService");
    const StorageService = await import("App/Services/StorageService");

    /**************************************************************************/
    /************************ EXTERNAL SERVICES ********************************/
    /**************************************************************************/

    /**************************************************************************/
    /******************************** REPOSITORIES ****************************/
    /**************************************************************************/
    const CallPeriodRepository = await import(
      "App/Repositories/Sapiencia/CallPeriodRepository"
    );
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
    const ActaRepository = await import(
      "App/Repositories/ActaRepository"
    );
    
    const ItemRepository = await import(
      "App/Repositories/ItemRepository"
    );
    
    const UploadInformationRepository = await import(
      "App/Repositories/UploadInformationRepository"
    );

    /**************************************************************************/
    /******************************** CORE  ***********************************/
    /**************************************************************************/

    this.app.container.singleton(
      "core.SapienciaProvider",
      () => new SapienciaService.default(new CallPeriodRepository.default())
    );
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
    this.app.container.singleton(
      "core.ActaProvider",
      () => new ActaService.default(new ActaRepository.default())
    );    
    this.app.container.singleton(
      "core.ItemsProvider",
      () => new ItemService.default(new ItemRepository.default())
    );
    this.app.container.singleton(    
      "core.UploadInformationProvider",
      () => new IUploadInformationService.default(new UploadInformationRepository.default())
    );
    this.app.container.singleton(
      "core.StorageProvider",
      () => new StorageService.default()
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
