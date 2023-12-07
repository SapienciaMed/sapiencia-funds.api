import Env from "@ioc:Adonis/Core/Env";

import moment from "moment";

export const formaterNumberToCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
};

export const dateFormatted = (date: string, format: string) => {
  moment.locale("es");
  return moment(date).format(format);
};

export const getChangesBetweenTwoObjects = <T>(oldObject: T, newObject: T) => {
  let thereAreChanges = false;
  const changes = {
    oldChanges: {} as T,
    newChanges: {} as T,
  };
  for (let key in newObject) {
    if (oldObject[key] !== newObject[key]) {
      if (!thereAreChanges) thereAreChanges = true;
      changes.oldChanges[key] = oldObject[key];
      changes.newChanges[key] = newObject[key];
    }
  }
  return { changes, thereAreChanges };
};

export const getAuthHeaders = () => ({
  permissions: Env.get("CURRENT_PERMISSIONS"),
  authorization: Env.get("CURRENT_AUTHORIZATION"),
});

export const ENV = {
  CURRENT_USER_DOCUMENT: Env.get("CURRENT_USER_DOCUMENT"),
};

export const DATABASE_NAMES = {
  SAPIENCIA: "mysql_sapiencia",
};
