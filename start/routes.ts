/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return "Api de servicios Fondos de SAPIENCIA";
});

Route.group(() => {
  Route.get("/call-periods/get-all", "SapienciaController.getAllCallPeriod");
  Route.get("/call-budget/get-all", "SapienciaController.getAllCallBudget");
  Route.post(
    "/getbudget-paginated/",
    "SapienciaController.geCallBudgetPaginate"
  );
}).prefix("/api/v1/sapiencia");

Route.group(() => {
  Route.get("/get-by-id/:id", "VotingResultsController.getVotingResultsById");
  Route.get(
    "/getActivityProgram/:id",
    "VotingResultsController.getActivityProgram"
  );
  Route.post("/create", "VotingResultsController.createVotingResult");
  Route.put("/update/:id", "VotingResultsController.updateVotingResult");
  Route.post("/get-paginated/", "VotingResultsController.getVotingPaginate");
  Route.get("/search", "VotingResultsController.getActivityProgram");
})
  .prefix("/api/v1/voting")
  .middleware("auth");

Route.group(() => {
  Route.get("/get-by-id/:id", "ItemsController.getItemsById");
  Route.put("/update/:id", "ItemsController.updateItems");
  Route.delete("/delete/:id", "ItemsController.deleteItem");
})
  .prefix("/api/v1/items")
  .middleware("auth");

Route.group(() => {
  Route.get("/programtypes", "MasterActivitiesController.getProgramTypes");
  Route.post("/create", "MasterActivitiesController.createActivity");
  Route.get("/:id", "MasterActivitiesController.getActivityById");
  Route.post(
    "get-paginated",
    "MasterActivitiesController.getMasterActivityPaginate"
  );
  Route.get("/", "MasterActivitiesController.getMasterActivity");
  Route.put("/edit/:id", "MasterActivitiesController.updateActivity");
})
  .prefix("/api/v1/activities")
  .middleware("auth");

Route.group(() => {
  Route.post(
    "/mail-notification",
    "UploadInformationController.emailNotification"
  );
  Route.get(
    "/files/get-by-project/:id",
    "UploadInformationController.getuploadFiles"
  );
  Route.post("/files/get-file", "UploadInformationController.getuploadFile");
  Route.post("/upload/:id", "UploadInformationController.uploadInformation");
  Route.get("/", "UploadInformationController.getUploadInformation");
  Route.post(
    "get-paginated",
    "UploadInformationController.getUploadInformationPaginate"
  );
  Route.get("/comunetype", "UploadInformationController.getComuneType");
  Route.get("/:id", "UploadInformationController.getUploadInformationById");
  Route.post("/create", "UploadInformationController.createUploadInformation");
})
  .prefix("/api/v1/uploadInformation")
  .middleware("auth");

Route.group(() => {
  Route.post("/create", "MasterController.createMaster").middleware(
    "auth:MAESTROS_CREAR"
  );
  Route.post("get-paginated", "MasterController.getMasterPaginate").middleware(
    "auth:MAESTROS_CONSULTAR"
  );
  Route.get("/masterlist", "MasterController.getMaster");
}).prefix("/api/v1/master");
//.middleware("auth");

Route.group(() => {
  Route.get("/typemasterlist", "TypeMasterListController.getTypeMasterList");
  Route.get("/estatusList", "StatusController.getStatusList");
})
  .prefix("/api/v1/")
  .middleware("auth");

Route.group(() => {
  Route.post("/create", "ActaController.createActa");
  Route.post("get-paginated", "MasterController.getMasterPaginate");
}).prefix("/api/v1/actas");
//.middleware("auth");

Route.group(() => {
  Route.get("/get-by-id/:id", "SocializationController.getSocializationById");
  Route.post("/create", "SocializationController.createSocialization");
  Route.post(
    "get-paginated",
    "SocializationController.getSocializationPaginate"
  );
  Route.put("/edit/:id", "SocializationController.updateSocialization");
})
  .prefix("/api/v1/socialization")
  .middleware("auth");

Route.group(() => {
  Route.get("/FondocomunaList/", "BudgetController.getFundList");
}).prefix("/api/v1/presupuesto");
//.middleware("auth");

Route.group(() => {
  Route.post("/create", "RequerimentController.createRequeriment");
  Route.post("get-paginated", "RequerimentController.getRequerimentPaginate");
  Route.put("/edit/:id", "RequerimentController.updateRequeriment");
  Route.delete("/delete/:id", "RequerimentController.deleteRequeriment");
})
  .prefix("/api/v1/requeriments")
  .middleware("auth");

Route.group(() => {
  Route.get("/get-by-id/:id", "ReglamentController.getReglamentById");
  Route.post("/create", "ReglamentController.createReglament");
  Route.post("get-paginated", "ReglamentController.getReglamentPaginate");
  Route.put("/edit/:id", "ReglamentController.updateReglament");
  Route.delete("/delete/:id", "ReglamentController.deleteReglament");
})
  .prefix("/api/v1/reglament")
  .middleware("auth");
