export enum RolesEnum {
  Admin = 1,
  Clerk,
  Manager,
  Typist,
}

export enum StatusEnum {
  Active = 1,
  InActive = 0,
}

export enum InspectionType {
  INVENTORY_MAKE_AND_CHECK_IN = 1,
  INVENTORY = 2,
  CHECK_IN = 3,
  CHECK_OUT = 4,
  MID_TERM_INSPECTION = 5,
  SNAGGING_REPORT = 6,
  HMO = 7,
  SCHEDULE_CONDITION_CHECK_IN = 8,
  SCHEDULE_CONDITION_CHECK_OUT = 9,
}
