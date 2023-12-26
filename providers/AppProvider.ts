import type { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    // Register your own bindings

    /**************************************************************************/
    /******************************** SERVICES ********************************/
    /**************************************************************************/
    const CoreService = await import("App/Services/External/CoreService");
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

    const RenewalService = await import("App/Services/RenewalService");

    const ResourcePrioritizationService = await import(
      "App/Services/ResourcePrioritizationService"
    );

    const CutService = await import("App/Services/CutService");

    const ControlSelectService = await import("App/Services/ControlSelect");

    const BeneficiariesConsolidateService = await import(
      "App/Services/BeneficiariesConsolidateService"
    );

    const DatingService = await import("App/Services/DatingService");

    const ServiceSocialService = await import(
      "App/Services/ServiceSocialService"
    );

    const ConsolidationService = await import(
      "App/Services/ConsolidationService"
    );
    const AbsorptionPercentageService = await import(
      "App/Services/AbsorptionPercentageService"
    );

    const ReglamentConsolidationService = await import(
      "App/Services/ReglamentConsolidationService"
    );
    const FiduciaService = await import("App/Services/FiduciaService");

    const RemnantService = await import("App/Services/RemnantService");

    const LegalizedService = await import("App/Services/LegalizedService");
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

    const CallRenewalRepository = await import(
      "App/Repositories/Sapiencia/CallRenewalRepository"
    );
    const CutRepository = await import("App/Repositories/CutRepository");

    const ResourcePrioritizationRepository = await import(
      "App/Repositories/ResourcePrioritizationRepository"
    );

    const ConsolidationTrayTechnicianCollectionRepository = await import(
      "App/Repositories/Sapiencia/ConsolidationTrayTechnicianCollectionRepository"
    );

    const BeneficiariesConsolidateRepository = await import(
      "App/Repositories/BeneficiariesConsolidateRepository"
    );

    const DatingRepository = await import(
      "App/Repositories/Sapiencia/CallDatingRepository"
    );

    const ControlSelectRepository = await import(
      "App/Repositories/ControlSelectRepository"
    );

    const ServiceSocialRepository = await import(
      "App/Repositories/ServiceSocialRepository"
    );

    const ConsolidationRepository = await import(
      "App/Repositories/ConsolidationRepository"
    );
    const AbsorptionPercentageRepository = await import(
      "App/Repositories/AbsorptionPercentageRepository"
    );
    const CallBudgetRepository = await import(
      "App/Repositories/Sapiencia/CallBudgetRepository"
    );
    const FiduciaRepository = await import(
      "App/Repositories/FiduciaRepository"
    );
    const RemnantRepository = await import(
      "App/Repositories/RemnantRepository"
    );

    const ReglamentConsolidationRepository = await import(
      "App/Repositories/ReglamentConsolidationRepository"
    );

    const StorageRepository = await import(
      "App/Repositories/StorageRepository"
    );

    const LegalizedRepository = await import(
      "App/Repositories/LegalizedRepository"
    );
    /**************************************************************************/
    /******************************** CORE  ***********************************/
    /**************************************************************************/
    this.app.container.singleton(
      "core.ResourcePrioritizationProvider",
      () =>
        new ResourcePrioritizationService.default(
          new ResourcePrioritizationRepository.default(),
          new CoreService.default()
        )
    );
    this.app.container.singleton(
      "core.SapienciaProvider",
      () =>
        new SapienciaService.default(
          new CallPeriodRepository.default(),
          new ConsolidationTrayTechnicianCollectionRepository.default()
        )
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
    this.app.container.singleton(
      "core.RenewalProvider",
      () => new RenewalService.default(new CallRenewalRepository.default())
    );
    this.app.container.singleton(
      "core.BeneficiariesConsolidateProvider",
      () =>
        new BeneficiariesConsolidateService.default(
          new BeneficiariesConsolidateRepository.default()
        )
    );
    this.app.container.singleton(
      "core.DatingProvider",
      () => new DatingService.default(new DatingRepository.default())
    );
    this.app.container.singleton(
      "core.ControlSelectProvider",
      () =>
        new ControlSelectService.default(new ControlSelectRepository.default())
    );
    this.app.container.singleton(
      "core.ServiceSocialProvider",
      () =>
        new ServiceSocialService.default(
          new ServiceSocialRepository.default(),
          new StorageRepository.default()
        )
    );
    this.app.container.singleton(
      "core.ConsolidationProvider",
      () =>
        new ConsolidationService.default(new ConsolidationRepository.default())
    );
    this.app.container.singleton(
      "core.AbsorptionPercentageProvider",
      () =>
        new AbsorptionPercentageService.default(
          new AbsorptionPercentageRepository.default(),
          new CallBudgetRepository.default()
        )
    );

    this.app.container.singleton(
      "core.ReglamentConsolidationProvider",
      () =>
        new ReglamentConsolidationService.default(
          new ReglamentConsolidationRepository.default()
        )
    );
    this.app.container.singleton(
      "core.FiduciaProvider",
      () => new FiduciaService.default(new FiduciaRepository.default())
    );
    this.app.container.singleton(
      "core.RemnantProvider",
      () => new RemnantService.default(new RemnantRepository.default())
    );
    this.app.container.singleton(
      "core.LegalizedProvider",
      () =>
        new LegalizedService.default(
          new LegalizedRepository.default(),
          new CallBudgetRepository.default(),
          new CallPeriodRepository.default()
        )
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
