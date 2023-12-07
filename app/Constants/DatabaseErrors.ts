export type IDatabaseError = {
  code: string;
  message: string;
  sqlMessage: string;
};

export const enum DATABASE_ERRORS {
  ER_DUP_ENTRY = "ER_DUP_ENTRY",
  ER_ROW_IS_REFERENCED_2 = "ER_ROW_IS_REFERENCED_2",
  E_ROW_NOT_FOUND = "E_ROW_NOT_FOUND",
  ER_NO_REFERENCED_ROW_2 = "ER_NO_REFERENCED_ROW_2",
}
