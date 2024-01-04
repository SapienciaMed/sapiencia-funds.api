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
import { PERMISSIONS } from "App/Constants/Permissions";

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
  Route.post(
    "/files/get-file-v2",
    "UploadInformationController.getuploadFileCitizen"
  );

  Route.post("/upload/:id", "UploadInformationController.uploadInformation");
  Route.get("/", "UploadInformationController.getUploadInformation");
  Route.post(
    "get-paginated",
    "UploadInformationController.getUploadInformationPaginate"
  );
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
  Route.delete("/deleteCitation/:id", "ActaController.deleteCitation");
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
}).prefix("/api/v1/reglament");
//.middleware("auth");

Route.group(() => {
  Route.post("/getbudget-paginated/", "BudgetController.geCallBudgetPaginate");
  Route.get("/FondocomunaList/", "BudgetController.getFundList");
  Route.get("/generate-xlsx", "BudgetController.generateXLSX");
}).prefix("/api/v1/presupuesto");
//.middleware("auth");
Route.group(() => {
  Route.post("/getInfoConsolidatepay", "ControlSelectController.getInfopay");
  Route.post(
    "/getInfoConsolidate",
    "ControlSelectController.getInfoConsolidate"
  );
  Route.post(
    "/getInfoConsolidateTotals",
    "ControlSelectController.getInfoConsolidateTotals"
  );
  Route.post(
    "/createInfoConsolidado",
    "ControlSelectController.createInfoConsolidado"
  );
  Route.put(
    "/updateInfoConsolidado",
    "ControlSelectController.updateinfoConsolidado"
  );
  Route.put(
    "/updateInfoLegalization",
    "ControlSelectController.updateInfoLegalization"
  );
  Route.put(
    "/updateEstrato456",
    "ControlSelectController.updateInfoStratum456"
  );
  Route.post(
    "/getInfoLegalization",
    "ControlSelectController.getInfoLegalization"
  );
  Route.post(
    "/getInfoLegalizationTotals",
    "ControlSelectController.getInfoLegalization"
  );
  Route.post("/getInfoControl", "ControlSelectController.getInfoControl");
  Route.post(
    "/getInfoControlSubtotales",
    "ControlSelectController.getInfoControlSubtotales"
  );
  Route.post(
    "/getInfoEstratos123",
    "ControlSelectController.getInfoEstratos123"
  );
  Route.post(
    "/getInfoEstratos123Totals",
    "ControlSelectController.getInfoEstratos123Totals"
  );
  Route.put("/updateStratum123", "ControlSelectController.updateStratum123");
  Route.post(
    "/getInfoEstratos123Xlsx",
    "ControlSelectController.getInfoEstratos123Xlsx"
  );
  Route.post(
    "/getInfoEstratos456",
    "ControlSelectController.getInfoStratum456"
  );
  Route.post(
    "/getInfoEstratos456Totals",
    "ControlSelectController.getInfoStratum456Totals"
  );
})
  .prefix("/api/v1/controlSelect")
  .middleware("auth:INFORME_CONTROL");
Route.group(() => {
  Route.post(
    "/getrenewal-paginated/",
    "RenewalController.geCallRenewalPaginate"
  );
  Route.post("/create", "RenewalController.createCallRenewal");
  Route.get("/generate-xlsx", "RenewalController.generateXLSX");
  Route.get("/calculate/:period", "RenewalController.calculate");
  Route.get("/get-beca/:period/", "RenewalController.getBeca");
  Route.post(
    "/createReportRenewal/:period/",
    "RenewalController.createReportRenewal"
  );
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

//* ********************************************************************************
//* ********************************************************************************
//* Se usa la misma estructura y se cambia parámetros del body para condicionar ****
//*    Usaremos esta estrategia para re utilización total de métodos creados    ****
//* ********************************************************************************
//? ********** TÉCNICO PASO AL COBRO ********** ?//
Route.group(() => {
  Route.get(
    "/get-cuts-generic",
    "ConsolidationTrayController.getCutsForConsolidationTray"
  ).middleware("auth:TECNICO_PASO_COBRO");
  Route.post(
    "/get-consolidation-tray",
    "ConsolidationTrayController.geConsolidationTray"
  ).middleware("auth:TECNICO_PASO_COBRO");
  Route.post(
    "/get-consolidation-tray-by-cut",
    "ConsolidationTrayController.geConsolidationTrayByCut"
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
  )
    .middleware("auth:TECNICO_PASO_COBRO")
    .middleware("auth:VER_SOPORTES_PQRSDF");
  Route.post(
    "/get-requirements-by-beneficiary",
    "ConsolidationTrayController.getRequirementsByBeneficiary"
  )
    .middleware("auth:TECNICO_PASO_COBRO")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/get-requirements-by-beneficiary-list",
    "ConsolidationTrayController.getRequirementsByBeneficiaryList"
  )
    .middleware("auth:TECNICO_PASO_COBRO")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/compliance-assignment-beneficiary",
    "ConsolidationTrayController.complianceAssignmentBeneficiary"
  )
    .middleware("auth:TECNICO_PASO_COBRO")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/upload-requirement-file/:id",
    "ConsolidationTrayController.uploadRequirementFile"
  )
    .middleware("auth:TECNICO_PASO_COBRO")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.get(
    "/get-requirement-file/:id",
    "ConsolidationTrayController.getUploadFiles"
  )
    .middleware("auth:TECNICO_PASO_COBRO")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/delete-requirement-file/:id/:beneficiary",
    "ConsolidationTrayController.deleteUploadFiles"
  )
    .middleware("auth:TECNICO_PASO_COBRO")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/dowload-requirement-file/:id/:beneficiary",
    "ConsolidationTrayController.dowloadUploadFiles"
  )
    .middleware("auth:TECNICO_PASO_COBRO")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/get-knowledge-transfer-by-beneficiary",
    "ConsolidationTrayController.getKnowledgeTransferByBeneficiary"
  )
    .middleware("auth:TECNICO_PASO_COBRO")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/change-approve-or-reject-knowledge-transfer",
    "ConsolidationTrayController.changeApproveOrRejectKnowledgeTransfer"
  )
    .middleware("auth:TECNICO_PASO_COBRO")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/upload-knowledge-transfer-file/:id/:idBeneficiary",
    "ConsolidationTrayController.uploadKnowledgeTransferFile"
  )
    .middleware("auth:TECNICO_PASO_COBRO")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.get(
    "/get-knowledge-transfer-file/:idBeneficiary",
    "ConsolidationTrayController.getUploadKnowledgeTransferFiles"
  )
    .middleware("auth:TECNICO_PASO_COBRO")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/get-requirements-knowledge-transfer",
    "ConsolidationTrayController.getRequirementsKnowledgeTransfer"
  )
    .middleware("auth:TECNICO_PASO_COBRO")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
})
  .prefix("/api/v1/consolidation-tray-collection-technician")
  .middleware("auth");

//? ********** TÉCNICO PROFESIONAL ********** ?//
Route.group(() => {
  Route.get(
    "/get-cuts-generic",
    "ConsolidationTrayController.getCutsForConsolidationTray"
  ).middleware("auth:TECNICO_PROFESIONAL");
  Route.post(
    "/get-consolidation-tray",
    "ConsolidationTrayController.geConsolidationTray"
  ).middleware("auth:TECNICO_PROFESIONAL");
  Route.post(
    "/get-consolidation-tray-by-cut",
    "ConsolidationTrayController.geConsolidationTrayByCut"
  ).middleware("auth:TECNICO_PROFESIONAL");
  Route.get(
    "/get-beneficiary-by-id/:id",
    "ConsolidationTrayController.geBeneficiaryById"
  ).middleware("auth:TECNICO_PROFESIONAL");
  Route.post(
    "/update-cut-beneficiary",
    "ConsolidationTrayController.updateCutBeneficiary"
  ).middleware("auth:TECNICO_PROFESIONAL");
  Route.post(
    "/get-pqrsdf-external",
    "ConsolidationTrayController.getPQRSDFExternal"
  )
    .middleware("auth:TECNICO_PROFESIONAL")
    .middleware("auth:VER_SOPORTES_PQRSDF");
  Route.post(
    "/get-requirements-by-beneficiary",
    "ConsolidationTrayController.getRequirementsByBeneficiary"
  )
    .middleware("auth:TECNICO_PROFESIONAL")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/get-requirements-by-beneficiary-list",
    "ConsolidationTrayController.getRequirementsByBeneficiaryList"
  )
    .middleware("auth:TECNICO_PROFESIONAL")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/compliance-assignment-beneficiary",
    "ConsolidationTrayController.complianceAssignmentBeneficiary"
  )
    .middleware("auth:TECNICO_PROFESIONAL")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/upload-requirement-file/:id",
    "ConsolidationTrayController.uploadRequirementFile"
  )
    .middleware("auth:TECNICO_PROFESIONAL")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.get(
    "/get-requirement-file/:id",
    "ConsolidationTrayController.getUploadFiles"
  )
    .middleware("auth:TECNICO_PROFESIONAL")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/delete-requirement-file/:id/:beneficiary",
    "ConsolidationTrayController.deleteUploadFiles"
  )
    .middleware("auth:TECNICO_PROFESIONAL")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/dowload-requirement-file/:id/:beneficiary",
    "ConsolidationTrayController.dowloadUploadFiles"
  )
    .middleware("auth:TECNICO_PROFESIONAL")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/get-knowledge-transfer-by-beneficiary",
    "ConsolidationTrayController.getKnowledgeTransferByBeneficiary"
  )
    .middleware("auth:TECNICO_PROFESIONAL")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/change-approve-or-reject-knowledge-transfer",
    "ConsolidationTrayController.changeApproveOrRejectKnowledgeTransfer"
  )
    .middleware("auth:TECNICO_PROFESIONAL")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/upload-knowledge-transfer-file/:id/:idBeneficiary",
    "ConsolidationTrayController.uploadKnowledgeTransferFile"
  )
    .middleware("auth:TECNICO_PROFESIONAL")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.get(
    "/get-knowledge-transfer-file/:idBeneficiary",
    "ConsolidationTrayController.getUploadKnowledgeTransferFiles"
  )
    .middleware("auth:TECNICO_PROFESIONAL")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/get-requirements-knowledge-transfer",
    "ConsolidationTrayController.getRequirementsKnowledgeTransfer"
  )
    .middleware("auth:TECNICO_PROFESIONAL")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
})
  .prefix("/api/v1/consolidation-tray-professional-technician")
  .middleware("auth");

//? ********** COORDINADOR ********** ?//
Route.group(() => {
  Route.get(
    "/get-cuts-generic",
    "ConsolidationTrayController.getCutsForConsolidationTray"
  ).middleware("auth:COORDINADOR");
  Route.post(
    "/get-consolidation-tray",
    "ConsolidationTrayController.geConsolidationTray"
  ).middleware("auth:COORDINADOR");
  Route.post(
    "/get-consolidation-tray-by-cut",
    "ConsolidationTrayController.geConsolidationTrayByCut"
  ).middleware("auth:COORDINADOR");
  Route.get(
    "/get-beneficiary-by-id/:id",
    "ConsolidationTrayController.geBeneficiaryById"
  ).middleware("auth:COORDINADOR");
  Route.post(
    "/update-cut-beneficiary",
    "ConsolidationTrayController.updateCutBeneficiary"
  ).middleware("auth:COORDINADOR");
  Route.post(
    "/get-pqrsdf-external",
    "ConsolidationTrayController.getPQRSDFExternal"
  )
    .middleware("auth:COORDINADOR")
    .middleware("auth:VER_SOPORTES_PQRSDF");
  Route.post(
    "/get-requirements-by-beneficiary",
    "ConsolidationTrayController.getRequirementsByBeneficiary"
  )
    .middleware("auth:COORDINADOR")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/get-requirements-by-beneficiary-list",
    "ConsolidationTrayController.getRequirementsByBeneficiaryList"
  )
    .middleware("auth:COORDINADOR")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/compliance-assignment-beneficiary",
    "ConsolidationTrayController.complianceAssignmentBeneficiary"
  )
    .middleware("auth:COORDINADOR")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/upload-requirement-file/:id",
    "ConsolidationTrayController.uploadRequirementFile"
  )
    .middleware("auth:COORDINADOR")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.get(
    "/get-requirement-file/:id",
    "ConsolidationTrayController.getUploadFiles"
  )
    .middleware("auth:COORDINADOR")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/delete-requirement-file/:id/:beneficiary",
    "ConsolidationTrayController.deleteUploadFiles"
  )
    .middleware("auth:COORDINADOR")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/dowload-requirement-file/:id/:beneficiary",
    "ConsolidationTrayController.dowloadUploadFiles"
  )
    .middleware("auth:COORDINADOR")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/get-knowledge-transfer-by-beneficiary",
    "ConsolidationTrayController.getKnowledgeTransferByBeneficiary"
  )
    .middleware("auth:COORDINADOR")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/change-approve-or-reject-knowledge-transfer",
    "ConsolidationTrayController.changeApproveOrRejectKnowledgeTransfer"
  )
    .middleware("auth:COORDINADOR")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/upload-knowledge-transfer-file/:id/:idBeneficiary",
    "ConsolidationTrayController.uploadKnowledgeTransferFile"
  )
    .middleware("auth:COORDINADOR")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.get(
    "/get-knowledge-transfer-file/:idBeneficiary",
    "ConsolidationTrayController.getUploadKnowledgeTransferFiles"
  )
    .middleware("auth:COORDINADOR")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/get-requirements-knowledge-transfer",
    "ConsolidationTrayController.getRequirementsKnowledgeTransfer"
  )
    .middleware("auth:COORDINADOR")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
})
  .prefix("/api/v1/consolidation-tray-coordinator")
  .middleware("auth");

//? ********** JURÍDICA ********** ?//
Route.group(() => {
  Route.get(
    "/get-cuts-generic",
    "ConsolidationTrayController.getCutsForConsolidationTray"
  ).middleware("auth:JURIDICA");
  Route.post(
    "/get-consolidation-tray",
    "ConsolidationTrayController.geConsolidationTray"
  ).middleware("auth:JURIDICA");
  Route.post(
    "/get-consolidation-tray-by-cut",
    "ConsolidationTrayController.geConsolidationTrayByCut"
  ).middleware("auth:JURIDICA");
  Route.get(
    "/get-beneficiary-by-id/:id",
    "ConsolidationTrayController.geBeneficiaryById"
  ).middleware("auth:JURIDICA");
  Route.post(
    "/update-cut-beneficiary",
    "ConsolidationTrayController.updateCutBeneficiary"
  ).middleware("auth:JURIDICA");
  Route.post(
    "/get-pqrsdf-external",
    "ConsolidationTrayController.getPQRSDFExternal"
  )
    .middleware("auth:JURIDICA")
    .middleware("auth:VER_SOPORTES_PQRSDF");
  Route.post(
    "/get-requirements-by-beneficiary",
    "ConsolidationTrayController.getRequirementsByBeneficiary"
  )
    .middleware("auth:JURIDICA")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/get-requirements-by-beneficiary-list",
    "ConsolidationTrayController.getRequirementsByBeneficiaryList"
  )
    .middleware("auth:JURIDICA")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/compliance-assignment-beneficiary",
    "ConsolidationTrayController.complianceAssignmentBeneficiary"
  )
    .middleware("auth:JURIDICA")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/upload-requirement-file/:id",
    "ConsolidationTrayController.uploadRequirementFile"
  )
    .middleware("auth:JURIDICA")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.get(
    "/get-requirement-file/:id",
    "ConsolidationTrayController.getUploadFiles"
  )
    .middleware("auth:JURIDICA")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/delete-requirement-file/:id/:beneficiary",
    "ConsolidationTrayController.deleteUploadFiles"
  )
    .middleware("auth:JURIDICA")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/dowload-requirement-file/:id/:beneficiary",
    "ConsolidationTrayController.dowloadUploadFiles"
  )
    .middleware("auth:JURIDICA")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/get-knowledge-transfer-by-beneficiary",
    "ConsolidationTrayController.getKnowledgeTransferByBeneficiary"
  )
    .middleware("auth:JURIDICA")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/change-approve-or-reject-knowledge-transfer",
    "ConsolidationTrayController.changeApproveOrRejectKnowledgeTransfer"
  )
    .middleware("auth:JURIDICA")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/upload-knowledge-transfer-file/:id/:idBeneficiary",
    "ConsolidationTrayController.uploadKnowledgeTransferFile"
  )
    .middleware("auth:JURIDICA")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.get(
    "/get-knowledge-transfer-file/:idBeneficiary",
    "ConsolidationTrayController.getUploadKnowledgeTransferFiles"
  )
    .middleware("auth:JURIDICA")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/get-requirements-knowledge-transfer",
    "ConsolidationTrayController.getRequirementsKnowledgeTransfer"
  )
    .middleware("auth:JURIDICA")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
})
  .prefix("/api/v1/consolidation-tray-legal")
  .middleware("auth");

//? ********** LÍDER DE PROYECTO ********** ?//
Route.group(() => {
  Route.get(
    "/get-cuts-generic",
    "ConsolidationTrayController.getCutsForConsolidationTray"
  ).middleware("auth:LIDER_PROYECTO");
  Route.post(
    "/get-consolidation-tray",
    "ConsolidationTrayController.geConsolidationTray"
  ).middleware("auth:LIDER_PROYECTO");
  Route.post(
    "/get-consolidation-tray-by-cut",
    "ConsolidationTrayController.geConsolidationTrayByCut"
  ).middleware("auth:LIDER_PROYECTO");
  Route.get(
    "/get-beneficiary-by-id/:id",
    "ConsolidationTrayController.geBeneficiaryById"
  ).middleware("auth:LIDER_PROYECTO");
  Route.post(
    "/update-cut-beneficiary",
    "ConsolidationTrayController.updateCutBeneficiary"
  ).middleware("auth:LIDER_PROYECTO");
  Route.post(
    "/get-pqrsdf-external",
    "ConsolidationTrayController.getPQRSDFExternal"
  )
    .middleware("auth:LIDER_PROYECTO")
    .middleware("auth:VER_SOPORTES_PQRSDF");
  Route.post(
    "/get-requirements-by-beneficiary",
    "ConsolidationTrayController.getRequirementsByBeneficiary"
  )
    .middleware("auth:LIDER_PROYECTO")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/get-requirements-by-beneficiary-list",
    "ConsolidationTrayController.getRequirementsByBeneficiaryList"
  )
    .middleware("auth:LIDER_PROYECTO")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/compliance-assignment-beneficiary",
    "ConsolidationTrayController.complianceAssignmentBeneficiary"
  )
    .middleware("auth:LIDER_PROYECTO")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/upload-requirement-file/:id",
    "ConsolidationTrayController.uploadRequirementFile"
  )
    .middleware("auth:LIDER_PROYECTO")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.get(
    "/get-requirement-file/:id",
    "ConsolidationTrayController.getUploadFiles"
  )
    .middleware("auth:LIDER_PROYECTO")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/delete-requirement-file/:id/:beneficiary",
    "ConsolidationTrayController.deleteUploadFiles"
  )
    .middleware("auth:LIDER_PROYECTO")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/dowload-requirement-file/:id/:beneficiary",
    "ConsolidationTrayController.dowloadUploadFiles"
  )
    .middleware("auth:LIDER_PROYECTO")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/get-knowledge-transfer-by-beneficiary",
    "ConsolidationTrayController.getKnowledgeTransferByBeneficiary"
  )
    .middleware("auth:LIDER_PROYECTO")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/change-approve-or-reject-knowledge-transfer",
    "ConsolidationTrayController.changeApproveOrRejectKnowledgeTransfer"
  )
    .middleware("auth:LIDER_PROYECTO")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/upload-knowledge-transfer-file/:id/:idBeneficiary",
    "ConsolidationTrayController.uploadKnowledgeTransferFile"
  )
    .middleware("auth:LIDER_PROYECTO")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.get(
    "/get-knowledge-transfer-file/:idBeneficiary",
    "ConsolidationTrayController.getUploadKnowledgeTransferFiles"
  )
    .middleware("auth:LIDER_PROYECTO")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/get-requirements-knowledge-transfer",
    "ConsolidationTrayController.getRequirementsKnowledgeTransfer"
  )
    .middleware("auth:LIDER_PROYECTO")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
})
  .prefix("/api/v1/consolidation-tray-project-leader")
  .middleware("auth");

//? ********** COMITÉ ********** ?//
Route.group(() => {
  Route.get(
    "/get-cuts-generic",
    "ConsolidationTrayController.getCutsForConsolidationTray"
  ).middleware("auth:COMITE");
  Route.post(
    "/get-consolidation-tray",
    "ConsolidationTrayController.geConsolidationTray"
  ).middleware("auth:COMITE");
  Route.post(
    "/get-consolidation-tray-by-cut",
    "ConsolidationTrayController.geConsolidationTrayByCut"
  ).middleware("auth:COMITE");
  Route.get(
    "/get-beneficiary-by-id/:id",
    "ConsolidationTrayController.geBeneficiaryById"
  ).middleware("auth:COMITE");
  Route.post(
    "/update-cut-beneficiary",
    "ConsolidationTrayController.updateCutBeneficiary"
  ).middleware("auth:COMITE");
  Route.post(
    "/get-pqrsdf-external",
    "ConsolidationTrayController.getPQRSDFExternal"
  )
    .middleware("auth:COMITE")
    .middleware("auth:VER_SOPORTES_PQRSDF");
  Route.post(
    "/get-requirements-by-beneficiary",
    "ConsolidationTrayController.getRequirementsByBeneficiary"
  )
    .middleware("auth:COMITE")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/get-requirements-by-beneficiary-list",
    "ConsolidationTrayController.getRequirementsByBeneficiaryList"
  )
    .middleware("auth:COMITE")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/compliance-assignment-beneficiary",
    "ConsolidationTrayController.complianceAssignmentBeneficiary"
  )
    .middleware("auth:COMITE")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/upload-requirement-file/:id",
    "ConsolidationTrayController.uploadRequirementFile"
  )
    .middleware("auth:COMITE")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.get(
    "/get-requirement-file/:id",
    "ConsolidationTrayController.getUploadFiles"
  )
    .middleware("auth:COMITE")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/delete-requirement-file/:id/:beneficiary",
    "ConsolidationTrayController.deleteUploadFiles"
  )
    .middleware("auth:COMITE")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/dowload-requirement-file/:id/:beneficiary",
    "ConsolidationTrayController.dowloadUploadFiles"
  )
    .middleware("auth:COMITE")
    .middleware("auth:VER_REQUISITOS_REGLAMENTO");
  Route.post(
    "/get-knowledge-transfer-by-beneficiary",
    "ConsolidationTrayController.getKnowledgeTransferByBeneficiary"
  )
    .middleware("auth:COMITE")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/change-approve-or-reject-knowledge-transfer",
    "ConsolidationTrayController.changeApproveOrRejectKnowledgeTransfer"
  )
    .middleware("auth:COMITE")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/upload-knowledge-transfer-file/:id/:idBeneficiary",
    "ConsolidationTrayController.uploadKnowledgeTransferFile"
  )
    .middleware("auth:COMITE")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.get(
    "/get-knowledge-transfer-file/:idBeneficiary",
    "ConsolidationTrayController.getUploadKnowledgeTransferFiles"
  )
    .middleware("auth:COMITE")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
  Route.post(
    "/get-requirements-knowledge-transfer",
    "ConsolidationTrayController.getRequirementsKnowledgeTransfer"
  )
    .middleware("auth:COMITE")
    .middleware("auth:VER_TRANSFERENCIA_CONOCIMIENTO");
})
  .prefix("/api/v1/consolidation-tray-committee")
  .middleware("auth");

//? ********** SERVICIO SOCIAL ********** ?//
Route.group(() => {
  Route.get("/import", "ServiceSocialController.import");
  Route.get(
    "/get-cuts-generic",
    "ConsolidationTrayController.getCutsForConsolidationTray"
  ).middleware("auth:SERVICIO_SOCIAL");
  Route.post(
    "/get-consolidation-tray-by-cut",
    "ConsolidationTrayController.geConsolidationTrayByCut"
  ).middleware("auth:SERVICIO_SOCIAL");
  Route.post(
    "/get-consolidation-tray",
    "ConsolidationTrayController.geConsolidationTray"
  ).middleware("auth:SERVICIO_SOCIAL");
  Route.post(
    "/update-cut-beneficiary",
    "ConsolidationTrayController.updateCutBeneficiary"
  ).middleware("auth:SERVICIO_SOCIAL");
  Route.get(
    "/get-beneficiary-by-id/:id",
    "ConsolidationTrayController.geBeneficiaryById"
  ).middleware("auth:SERVICIO_SOCIAL");
  Route.post(
    "/get-paginated/consolidate",
    "ServiceSocialController.getConsolidationSocialService"
  ).middleware("auth:SERVICIO_SOCIAL");
  Route.post(
    "/get-service-social-file/",
    "ServiceSocialController.dowloadUploadFiles"
  ).middleware("auth:SERVICIO_SOCIAL");
  Route.post(
    "/get-service-social-by-beneficiary",
    "ServiceSocialController.getServiceSocialPaginate"
  ).middleware("auth:SERVICIO_SOCIAL");
  Route.put(
    "/update-service-social/",
    "ServiceSocialController.updateServiceSocial"
  ).middleware("auth:SERVICIO_SOCIAL");
})
  .prefix("/api/v1/consolidation-tray-social-service")
  .middleware("auth");

//* ********************************************************************************
//* ********************************************************************************
//* ********************************************************************************
//? ******** ESTRUCTURACIÓN DE REGLAMENTO (VERSIÓN 2.0) Y AJUSTES GENERALES ********

Route.group(() => {
  Route.post(
    "/get-periods-sapi",
    "ReglamentConsolidationController.getPeriodsSapi"
  )//.middleware("auth:REGLAMENTO");
  Route.post(
    "/create-reglament",
    "ReglamentConsolidationController.createReglament"
  )//.middleware("auth:REGLAMENTO");
  Route.post(
    "/get-paginated",
    "ReglamentConsolidationController.getReglamentPaginate"
  )//.middleware("auth:REGLAMENTO");
  Route.get(
    "/get-by-id/:id",
    "ReglamentConsolidationController.getReglamentById"
  )//.middleware("auth:REGLAMENTO");
  Route.post(
    "/edit-reglament/:id",
    "ReglamentConsolidationController.updateReglament"
  )//.middleware("auth:REGLAMENTO");
})
  .prefix("/api/v1/reglament-v2")
  //.middleware("auth");

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
}).prefix("/api/v1/citas");

Route.group(() => {
  Route.get("/import", "ServiceSocialController.import");
  Route.post(
    "/get-paginated",
    "ServiceSocialController.getServiceSocialPaginate"
  );
  Route.post(
    "/get-paginated/consolidate",
    "ServiceSocialController.getConsolidationSocialService"
  );
}).prefix("/api/v1/service-social");
//.middleware("auth");

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

Route.group(() => {
  Route.get("/test", "StoragesController.getFiles");
}).prefix("/api/v1/files");

Route.group(() => {
  Route.get(
    "/get-commune-resources",
    "AbsorptionPercentageController.getCommuneResources"
  ).middleware("auth");
  Route.post(
    "/create",
    "AbsorptionPercentageController.createAbsorptionPercentage"
  ).middleware(`auth:${PERMISSIONS.FUNDS_ABSORTION_PERCENTAGE_CREATE}`);
  Route.post(
    "/get-all-paginated",
    "AbsorptionPercentageController.getAllAbsorptionPercentagePaginated"
  ).middleware(`auth:${PERMISSIONS.FUNDS_ABSORTION_PERCENTAGE_CONSULT}`);
  Route.put(
    "/:id/update-by-id",
    "AbsorptionPercentageController.updateAbsorptionPercentageById"
  )
    .where("id", Route.matchers.number())
    .middleware(`auth:${PERMISSIONS.FUNDS_ABSORTION_PERCENTAGE_UPDATE}`);
  Route.delete(
    "/:id/delete-by-id",
    "AbsorptionPercentageController.deleteAbsorptionPercentageById"
  )
    .where("id", Route.matchers.number())
    .middleware(`auth:${PERMISSIONS.FUNDS_ABSORTION_PERCENTAGE_DELETE}`);
  Route.get(
    "/generate-xlsx",
    "AbsorptionPercentageController.generateAbsorptionPercentageXLSX"
  ).middleware(`auth:${PERMISSIONS.FUNDS_ABSORTION_PERCENTAGE_DOWNLOAD_XLSX}`);
}).prefix("/api/v1/absorption-percentage");

// Route.group(() => {
//   Route.get("/get-fiducias", "FiduciaController.getFiduciaList");
// }).prefix("/api/v1/fiducia");

Route.group(() => {
  Route.get("/get-all", "LegalizedController.getAllLegalized").middleware(
    `auth:${PERMISSIONS.FUNDS_LEGALIZED_CONSULT}`
  );
  Route.get(
    "/generate-xlsx",
    "LegalizedController.generateLegalizedXLSX"
  ).middleware(`auth:${PERMISSIONS.FUNDS_LEGALIZED_DOWNLOAD_XLSX}`);
  Route.put(
    "/update-commune-budget",
    "LegalizedController.updateLegalizedComunneBudget"
  ).middleware(`auth:${PERMISSIONS.FUNDS_LEGALIZED_UPDATE}`);
}).prefix("/api/v1/legalized");

Route.group(() => {
  Route.get("/get-fiducias", "FiduciaController.getFiduciaList");
}).prefix("/api/v1/fiducia");

Route.group(() => {
  Route.post(
    "/get-all-paginated",
    "RemnantController.getallRemnantsPaginated"
  ).middleware("auth:EXCEDENTE_CONTRATOS_CONSULTAR");
  Route.get("/get-by-id/:id", "RemnantController.getRemnantById");
  Route.put("/update/:id", "RemnantController.updateRemnan").middleware(
    "auth:EXCEDENTE_CONTRATOS_EDITAR"
  );
  Route.delete("/delete/:id", "RemnantController.deleteRemnan");
})
  .prefix("/api/v1/surplus-contracts")
  .middleware("auth");
