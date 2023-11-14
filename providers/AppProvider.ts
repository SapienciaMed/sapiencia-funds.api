import type { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    // Register your own bindings

    /**************************************************************************/
    /******************************** SERVICES ********************************/
    /**************************************************************************/
    const VotingResultsService = await import(
      "App/Services/VotingResultsService"
    );
    const SummaryPriorizacionService = await import(
      "App/Services/SummaryPriorizacionService"
    );
    const IMasterActivityService = await import(
      "App/Services/MasterActivityService"
    );
    const MasterService = await import("App/Services/MasterService");
    const TypeMasterListService = await import(
      "App/Services/TypeMasterListService"
    );
    const ActaService = await import("App/Services/ActaService");
    const SapienciaService = await import("App/Services/SapienciaService");
    const ItemService = await import("App/Services/ItemService");
    const StatusListService = await import("App/Services/StatusListService");
    const SocializationService = await import(
      "App/Services/SocializationService"
    );

    const IUploadInformationService = await import(
      "App/Services/UploadInformationService"
    );
    const StorageService = await import("App/Services/StorageService");
    const EmailService = await import("App/Services/EmailNotificationService");

    const RequerimentService = await import("App/Services/RequerimentService");

    const ReglamentService = await import("App/Services/ReglamentService");

    const BudgetService = await import("App/Services/BudgetService");

    const ResourcePrioritizationService = await import(
      "App/Services/ResourcePrioritizationService"
    );

    const CutService = await import("App/Services/CutService");

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
    const SummaryPriorizacionRepository = await import(
      "App/Repositories/SummaryPriorizacionRepository"
    );
    const MasterActivityRepository = await import(
      "App/Repositories/MasterActivityRepository"
    );
    const MasterRepository = await import("App/Repositories/MasterRepository");
    const TypeMasterListRepository = await import(
      "App/Repositories/TypeMasterListRepository"
    );
    const ActaRepository = await import("App/Repositories/ActaRepository");

    const ItemRepository = await import("App/Repositories/ItemRepository");
    const SocializationRepository = await import(
      "App/Repositories/SocializationRepository"
    );

    const UploadInformationRepository = await import(
      "App/Repositories/UploadInformationRepository"
    );

    const StatusListRepository = await import(
      "App/Repositories/StatusListRepository"
    );

    const RequerimentRepository = await import(
      "App/Repositories/RequerimentRepository"
    );

    const ReglamentRepository = await import(
      "App/Repositories/ReglamentRepository"
    );

    const BudgetRepository = await import("App/Repositories/BudgetRepository");

    const CutRepository = await import("App/Repositories/CutRepository");

    const ResourcePrioritizationRepository = await import(
      "App/Repositories/ResourcePrioritizationRepository"
    );

    /**************************************************************************/
    /******************************** CORE  ***********************************/
    /**************************************************************************/
    this.app.container.singleton(
      "core.ResourcePrioritizationProvider",
      () =>
        new ResourcePrioritizationService.default(
          new ResourcePrioritizationRepository.default()
        )
    );
    this.app.container.singleton(
      "core.SapienciaProvider",
      () => new SapienciaService.default(new CallPeriodRepository.default())
    );
    this.app.container.singleton(
      "core.VotingResultsProvider",
      () =>
        new VotingResultsService.default(new VotingResultsRepository.default())
    );
    this.app.container.singleton(
      "core.ReumenPriorizacionProvider",
      () =>
        new SummaryPriorizacionService.default(
          new SummaryPriorizacionRepository.default()
        )
    );
    this.app.container.singleton(
      "core.MasterActivityProvider",
      () =>
        new IMasterActivityService.default(
          new MasterActivityRepository.default()
        )
    );
    this.app.container.singleton(
      "core.SocializationProvider",
      () =>
        new SocializationService.default(new SocializationRepository.default())
    );
    this.app.container.singleton(
      "core.MasterProvider",
      () => new MasterService.default(new MasterRepository.default())
    );
    this.app.container.singleton(
      "core.TypeMasterListProvider",
      () =>
        new TypeMasterListService.default(
          new TypeMasterListRepository.default()
        )
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
      "core.StatusListProvider",
      () => new StatusListService.default(new StatusListRepository.default())
    );
    this.app.container.singleton(
      "core.UploadInformationProvider",
      () =>
        new IUploadInformationService.default(
          new UploadInformationRepository.default()
        )
    );
    this.app.container.singleton(
      "core.StorageProvider",
      () => new StorageService.default()
    );
    this.app.container.singleton(
      "core.EmailProvider",
      () => new EmailService.default()
    );
    this.app.container.singleton(
      "core.RequerimentProvider",
      () => new RequerimentService.default(new RequerimentRepository.default())
    );
    this.app.container.singleton(
      "core.ReglamentProvider",
      () => new ReglamentService.default(new ReglamentRepository.default())
    );
    this.app.container.singleton(
      "core.BudgetProvider",
      () => new BudgetService.default(new BudgetRepository.default())
    );
    this.app.container.singleton(
      "core.CutsProvider",
      () => new CutService.default(new CutRepository.default())
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
