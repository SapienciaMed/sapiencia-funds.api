declare module "@ioc:core.EmailProvider" {
    import { IEmailService } from "App/Services/EmailNotificationService";

    const IEmailProvider: IEmailService;
    export default IEmailProvider;
}
