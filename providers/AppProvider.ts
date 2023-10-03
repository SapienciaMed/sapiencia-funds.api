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
    const IUploadInformationService = await import("App/Services/UploadInformationService");

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
    const UploadInformationRepository = await import(
      "App/Repositories/UploadInformationRepository"
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
      "core.UploadInformationProvider",
      () => new IUploadInformationService.default(new UploadInformationRepository.default())
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
