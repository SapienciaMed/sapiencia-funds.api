import BeneficiariesConsolidate from "App/Models/BeneficiariesConsolidate";
import Reglament from "App/Models/Reglament";
import AuroraEpmRenovado from "App/Models/Sapiencia/AuroraEpmRenovado";

export interface IConsolidationRepository {
  createConsolidationByState();
  createConsolidationBiannual();
}

export default class ConsolidationRepository
  implements IConsolidationRepository
{
  constructor() {}

  async createConsolidationByState() {
    const statusFilter = ["Desertor", "Finalizacion"];
    const motiveFilter = ["Renuncia por Expresa Voluntad", "Expresa Voluntad"];

    //falta el campo motivos y estados para poder realizar el filtro
    const filterAuroraEpmRenovado = AuroraEpmRenovado.query()
      .whereIn("estado", statusFilter)
      .andWhereIn("motivo", motiveFilter);

    const execute = await filterAuroraEpmRenovado;

    if (execute.length > 0) {
      execute.map(async (student) => {
        //excluir los que ya estan almacenados en la tabla beneficiarios
        const existBeneficiarieQuery = BeneficiariesConsolidate.query().where(
          "numberDocument",
          student.document
        );
        const executeBeneficiarie = await existBeneficiarieQuery;
        if (executeBeneficiarie.length > 0) return;

        const period = student.period;
        const regulations = Reglament.query()
          .where("program", period)
          .andWhere("gracePeriodApply", 1)
          .andWhere("gracePeriodMonths", 6);
        const executeRegulation = await regulations;

        if (executeRegulation.length === 0) return;

        // const buildData = {
        //   numberDocument: student.document,
        //   //idcredito
        //   // Nro suspensiones continuas.
        //   // Nro suspensiones discontinuas.
        //   // Nro suspensiones especiales.
        //   // estado
        //   // Caracterización.
        //   // Motivo estado.
        //   // Id Fondo.
        //   // Nombre fondo.
        //   // Cantidad semestres proyectados.
        //   // Cantidad de giros.
        //   // Periodo último giro.
        //   // Cantidad de renovaciones.
        //   // Número de contrato fiduciario.
        //   legalPeriod: student.period,
        // };

        // se debe de almacenar gracePeriodApplication en el campo en gracePeriod
        console.log(regulations);
      });
    }

    return "ok";
  }

  async createConsolidationBiannual() {
    const statusFilter = [
      "Suspencion Temporal",
      "Suspencion especial",
      "Finalizacion",
    ];
    const motiveFilter = [
      "Motivos de Salud (Fuerza Mayor)",
      "Motivos de Salud (No es Fuerza Mayor)",
      "Anormalidad Academica",
      "Matricula Cero",
      "Beca",
      "Practicas",
      "Pasantia",
      "Intercambios",
      "Servicio Militar",
      "Otro",
      "Obtiene grado",
    ];

    // //falta el campo motivos y estados para poder realizar el filtro
    const filterAuroraEpmRenovado = AuroraEpmRenovado.query()
      .whereIn("estado", statusFilter)
      .andWhereIn("motivo", motiveFilter);

    const execute = await filterAuroraEpmRenovado;

    if (execute.length > 0) {
      execute.map(async (student) => {
        //excluir los que ya estan almacenados en la tabla beneficiarios
        const existBeneficiarieQuery = BeneficiariesConsolidate.query().where(
          "numberDocument",
          student.document
        );
        const executeBeneficiarie = await existBeneficiarieQuery;
        if (executeBeneficiarie.length > 0) return;

        const period = student.period;
        const regulations = Reglament.query()
          .where("program", period)
          .andWhere("gracePeriodApply", 1)
          .andWhere("gracePeriodMonths", 6);
        const executeRegulation = await regulations;

        if (executeRegulation.length === 0) return;

        // const buildData = {
        //   numberDocument: student.document,
        //   //idcredito
        //   // Nro suspensiones continuas.
        //   // Nro suspensiones discontinuas.
        //   // Nro suspensiones especiales.
        //   // estado
        //   // Caracterización.
        //   // Motivo estado.
        //   // Id Fondo.
        //   // Nombre fondo.
        //   // Cantidad semestres proyectados.
        //   // Cantidad de giros.
        //   // Periodo último giro.
        //   // Cantidad de renovaciones.
        //   // Número de contrato fiduciario.
        //   legalPeriod: student.period,
        // };

        // se debe de almacenar gracePeriodApplication en el campo en gracePeriod
        console.log(regulations);
      });
    }

    //preguntas
    //si ya tiene el último giro proyectado y la última renovación
    // por programa y periodo validar en que programa y rango de periodos se encuentra y si aplica periodo de gracia?

    return "ok";
  }
}
