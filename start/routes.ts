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
  Route.post("get-paginated", "MasterActivitiesController.getMasterActivityPaginate");
  Route.get("/", "MasterActivitiesController.getMasterActivity");
  Route.put("/edit/:id", "MasterActivitiesController.updateActivity");
  
}).prefix("/api/v1/activities")
.middleware("auth");

Route.group(() => {
  Route.post("/create", "MasterController.createMaster");
  Route.post("get-paginated", "MasterController.getMasterPaginate");
}).prefix("/api/v1/master")
  //.middleware("auth");

Route.group(() => {
  Route.get("/", "TypeMasterListController.getTypeMasterList");
}).prefix("/api/v1/typemasterlist")
  //.middleware("auth");