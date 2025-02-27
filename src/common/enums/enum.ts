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

export enum RolesEnum {
  //SUPERADMIN = 1,
  ADMIN = 1,
  MANAGER = 2,
  CLERK = 3,
  TYPIST = 4,
}

export enum InspectionStatusEnum {
  PENDING = 1,
  ASSIGNED = 2,
  ACTIVE = 3,
  PROCESSING = 4,
  REVIEW = 5,
  COMPLETE = 6,
  CLOSED = 7,
}

export enum InspectionStatusTypistEnum {
  PENDING = 1,
  IN_PROGRESS = 2,
  ACTIVE = 3,
  COMPLETE = 4,
  CLOSED = 5,
}

export enum FurnishingStatusEnum {
  FURNISHED = 1,
  UNFURNISHED = 2,
  PART_FURNISHED = 3,
}

export enum BuildingTypeEnum {
  HOUSE = 1,
  APARTMENT = 2,
  MAISONETTE = 3,
  TERRACE_HOUSE = 4,
  BUNGALOW = 5,
  TOWN_HOUSE = 6,
  OTHER = 7,
}

export enum PersonTitleEnum {
  MR = 1,
  MRS = 2,
  MISS = 3,
  MS = 4,
  MX = 5,
  DR = 6,
  LORD = 7,
}
