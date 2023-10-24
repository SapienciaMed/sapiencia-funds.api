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
  Route.get("/get-by-id/:id", "VotingResultsController.getVotingResultsById");
  Route.get("/getActivityProgram/:id", "VotingResultsController.getActivityProgram");

})
  .prefix("/api/v1/voting")
  .middleware("auth");



Route.group(() => {
  
  Route.get("/programtypes", "MasterActivitiesController.getProgramTypes");
  Route.post("/create", "MasterActivitiesController.createActivity");
  Route.get("/:id", "MasterActivitiesController.getActivityById");
  Route.post("get-paginated","MasterActivitiesController.getMasterActivityPaginate");
  Route.get("/","MasterActivitiesController.getMasterActivity");
  Route.put("/edit/:id", "MasterActivitiesController.updateActivity");
  
}).prefix("/api/v1/activities") 
.middleware("auth");


Route.group(() => {
  
  Route.post("/mail-notification", "UploadInformationController.emailNotification");
  Route.get("/files/get-by-project/:id", "UploadInformationController.getuploadFiles");
  Route.post("/files/get-file", "UploadInformationController.getuploadFile");
  Route.post("/upload/:id", "UploadInformationController.uploadInformation");
  Route.get("/","UploadInformationController.getUploadInformation");
  Route.post("get-paginated","UploadInformationController.getUploadInformationPaginate");
  Route.get("/comunetype","UploadInformationController.getComuneType");
  Route.get("/:id", "UploadInformationController.getUploadInformationById");
  Route.post("/create","UploadInformationController.createUploadInformation");
  
}).prefix("/api/v1/uploadInformation") 
//.middleware("auth");