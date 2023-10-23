declare module "@ioc:core.StorageProvider" {
    import { IStorageService } from "App/Services/StorageService";

    const StorageProvider: IStorageService;
    export default StorageProvider;
}
