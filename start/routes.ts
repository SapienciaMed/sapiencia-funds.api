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
  Route.get("/call-fondo/get-all", "SapienciaController.getAllCallfondo");
  Route.post(
    "/getbudget-paginated/",
    "SapienciaController.geCallBudgetPaginate"
  );
}).prefix("/api/v1/sapiencia");

Route.group(() => {
  Route.post(
    "/get-paginated/",
    "ResourcePrioritizationController.getResourcePrioritizationPaginate"
  );
  Route.post(
    "/get-totals/",
    "ResourcePrioritizationController.getResourcePrioritizationTotals"
  );
  Route.post(
    "/set/",
    "ResourcePrioritizationController.setResourcePrioritization"
  );
  Route.post(
    "/generate-excel/",
    "ResourcePrioritizationController.getResourcePrioritizationExcel"
  );
})
  .prefix("/api/v1/resource-prioritization")
  .middleware("auth");

Route.group(() => {
  Route.get("/get-by-id/:id", "VotingResultsController.getVotingResultsById");
  Route.get(
    "/getActivityProgram/:id",
    "VotingResultsController.getActivityProgram"
  );
  Route.post("/create", "VotingResultsController.createVotingResult");
  Route.put("/update/:id", "VotingResultsController.updateVotingResult");
  Route.post("/get-paginated/", "VotingResultsController.getVotingPaginate");
  Route.post(
    "/get-paginatedxlsx/",
    "VotingResultsController.getVotingPaginateXlsx"
  );
  Route.post(
    "/get-paginatedtotal/",
    "VotingResultsController.getPaginatedtotal"
  );
  Route.get("/search", "VotingResultsController.getActivityProgram");
})
  .prefix("/api/v1/voting")
  .middleware("auth");

Route.group(() => {
  Route.post(
    "/get-paginated/",
    "SummaryPriorizacionsController.getSummaryPriorizacionPaginate"
  );
  Route.post(
    "/get-report/",
    "SummaryPriorizacionsController.getSummaryPriorizacionReportXLS"
  );
}).prefix("/api/v1/summary-priorizacion");
// .middleware("auth");

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
  Route.post("/create", "ActaController.createActa").middleware(
    "auth:CREAR_ACTAS"
  );
  Route.post("get-paginated", "MasterController.getMasterPaginate");
  Route.post("/getActa", "ActaController.getActa").middleware(
    "auth:CONSULTAR_ACTAS"
  );
  Route.put("/updateCitation", "ActaController.approveCitation");
  Route.get("/getLastId", "ActaController.lastInsertId");
  Route.put("/updateActa", "ActaController.updateActa").middleware(
    "auth:EDITAR_ACTAS"
  );
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
  // Route.get("/FondocomunaList/", "BudgetController.getFundList");
  Route.post("/generate-xlsx", "BudgetController.generateXLSX");
}).prefix("/api/v1/presupuesto");
//.middleware("auth");

Route.group(() => {
  Route.post("/create", "RequerimentController.createRequeriment");
  Route.post("get-paginated", "RequerimentController.getRequerimentPaginate");
  Route.put("/edit/:id", "RequerimentController.updateRequeriment");
  Route.delete("/delete/:id", "RequerimentController.deleteRequeriment");
  Route.delete(
    "/delete-by-reglament-id/:id",
    "RequerimentController.deleteByReglamentId"
  );
})
  .prefix("/api/v1/requeriments")
  .middleware("auth");

Route.group(() => {
  Route.get("/get-by-id/:id", "ReglamentController.getReglamentById");
  Route.get("/get-last-id", "ReglamentController.getLastId");
  Route.post("/create", "ReglamentController.createReglament");
  Route.post("get-paginated", "ReglamentController.getReglamentPaginate");
  Route.put("/edit/:id", "ReglamentController.updateReglament");
  Route.delete("/delete/:id", "ReglamentController.deleteReglament");
  Route.get("/programs", "ReglamentController.getPrograms");
})
  .prefix("/api/v1/reglament")
  .middleware("auth");

Route.group(() => {
  Route.post("/getbudget-paginated/", "BudgetController.geCallBudgetPaginate");
  Route.get("/FondocomunaList/", "BudgetController.getFundList");
  Route.get("/generate-xlsx", "BudgetController.generateXLSX");
}).prefix("/api/v1/presupuesto");
//.middleware("auth");
Route.group(() => {
  Route.post("/getInfopay", "ControlSelectController.getInfopay")
  Route.post("/getInfo", "ControlSelectController.getInfo");
  Route.post(
    "/createInfoConsolidado",
    "ControlSelectController.createInfoConsolidado"
  );
  Route.put(
    "/updateInfoConsolidado",
    "ControlSelectController.updateinfoConsolidado"
  );
}).prefix("/api/v1/controlSelect");
Route.group(() => {
  Route.post(
    "/getrenewal-paginated/",
    "RenewalController.geCallRenewalPaginate"
  );
  Route.post("/create", "RenewalController.createCallRenewal");
  Route.get("/generate-xlsx", "RenewalController.generateXLSX");
}).prefix("/api/v1/renovacion");
//.middleware("auth");

Route.group(() => {
  Route.get("/get-by-id/:id", "CutsController.getCutsById");
  Route.post("/create", "CutsController.createCuts");
  Route.post("get-paginated", "CutsController.getCutsPaginate");
  Route.put("/edit/:id", "CutsController.updateCuts");
  Route.delete("/delete/:id", "CutsController.deleteCuts");
})
  .prefix("/api/v1/cuts")
  .middleware("auth");

Route.group(() => {
  Route.get(
    "/get-cuts-generic",
    "ConsolidationTrayController.getCutsForConsolidationTray"
  ).middleware("auth:TECNICO_PASO_COBRO");
  Route.post(
    "/get-consolidation-tray-technician-collection",
    "ConsolidationTrayController.geConsolidationTrayTechnicianCollection"
  ).middleware("auth:TECNICO_PASO_COBRO");
  Route.post(
    "/get-consolidation-tray-technician-collection-by-cut",
    "ConsolidationTrayController.geConsolidationTrayTechnicianCollectionByCut"
  ).middleware("auth:TECNICO_PASO_COBRO");
  Route.get(
    "/get-beneficiary-by-id/:id",
    "ConsolidationTrayController.geBeneficiaryById"
  ).middleware("auth:TECNICO_PASO_COBRO");
  Route.post(
    "/update-cut-beneficiary",
    "ConsolidationTrayController.updateCutBeneficiary"
  ).middleware("auth:TECNICO_PASO_COBRO");
  Route.post(
    "/get-pqrsdf-external",
    "ConsolidationTrayController.getPQRSDFExternal"
  ).middleware("auth:TECNICO_PASO_COBRO");
})
  .prefix("/api/v1/consolidation-tray")
  .middleware("auth");

Route.group(() => {
  Route.get(
    "/get-by-id/:id",
    "BeneficiariesConsolidateContoller.getBeneficiariesConsolidateById"
  );
  Route.post(
    "/create",
    "BeneficiariesConsolidateContoller.createBeneficiariesConsolidate"
  );
  Route.post(
    "get-paginated",
    "BeneficiariesConsolidateContoller.getBeneficiariesConsolidatePaginate"
  );
  Route.put(
    "/edit/:id",
    "BeneficiariesConsolidateContoller.updateBeneficiariesConsolidate"
  );
  Route.delete(
    "/delete/:id",
    "BeneficiariesConsolidateContoller.deleteBeneficiariesConsolidate"
  );
})
  .prefix("/api/v1/beneficiaries-consolidate")
  .middleware("auth");

Route.group(() => {
  Route.post("/getdating-paginated/", "DatingController.geCallDatingPaginate");
  Route.get("/generate-xlsx", "DatingController.generateXLSX");
})
  .prefix("/api/v1/citas")
  .middleware("auth");

Route.group(() => {
  Route.get("/import", "ServiceSocialController.import");
})
  .prefix("/api/v1/service-social")
  .middleware("auth");

Route.group(() => {
  Route.post(
    "/create-by-state",
    "ConsolidationController.createConsolidationByState"
  );
  Route.post(
    "/create-biannual",
    "ConsolidationController.createConsolidationBiannual"
  );
}).prefix("/api/v1/consolidation");
// .middleware("auth");
