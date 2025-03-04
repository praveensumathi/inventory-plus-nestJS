import { Injectable } from "@nestjs/common";
import {
  BuildingTypeEnum,
  FurnishingStatusEnum,
  InspectionStatusEnum,
  InspectionStatusTypistEnum,
  InspectionType,
  PersonTitleEnum,
  RolesEnum,
} from "src/common/enums/enum";

@Injectable()
export class StaticService {
  getStaticData() {
    return {
      inspectionTypes: this.getInspectionTypes(),
      roles: this.getRoles(),
      inspectionStatuses: this.getInspectionStatuses(),
      inspectionStatusesForTypist: this.getInspectionStatusesForTypist(),
      furnishingTypes: this.getFurnishingTypes(),
      buildingTypes: this.getBuildingTypes(),
      personTitles: this.PersonTitles(),
    };
  }

  private getInspectionTypes() {
    return [
      {
        id: 1,
        value: InspectionType.INVENTORY_MAKE_AND_CHECK_IN,
        label: "Inventory Make and Check-In",
      },
      { id: 2, value: InspectionType.INVENTORY, label: "Inventory" },
      { id: 3, value: InspectionType.CHECK_IN, label: "Check-In" },
      { id: 4, value: InspectionType.CHECK_OUT, label: "Check-Out" },
      {
        id: 5,
        value: InspectionType.MID_TERM_INSPECTION,
        label: "Mid Term Inspection",
      },
      {
        id: 6,
        value: InspectionType.SNAGGING_REPORT,
        label: "Snagging Report",
      },
      { id: 7, value: InspectionType.HMO, label: "HMO" },
      {
        id: 8,
        value: InspectionType.SCHEDULE_CONDITION_CHECK_IN,
        label: "Schedule of Condition Check-In",
      },
      {
        id: 9,
        value: InspectionType.SCHEDULE_CONDITION_CHECK_OUT,
        label: "Schedule of Condition Check-Out",
      },
    ];
  }

  private getRoles() {
    return [
      //{ value: RolesEnum.SUPERADMIN, label: "Superadmin" },
      {
        value: RolesEnum.ADMIN,
        label: "Admin",
        description:
          "Admins have full access to all areas of the system, like managing settings, clients and other users.",
      },
      {
        value: RolesEnum.MANAGER,
        label: "Manager",
        description:
          "Managers have access to all properties, inspections, users, and clients.",
      },
      {
        value: RolesEnum.CLERK,
        label: "Clerk",
        description:
          "Standard Clerks are limited to being able to see and manage inspections assigned to them.",
      },
      {
        value: RolesEnum.TYPIST,
        label: "Typist",
        description:
          "Typists are limited to only being able to access and update inspections in the Processing stage",
      },
    ];
  }

  private getInspectionStatuses() {
    return [
      { value: InspectionStatusEnum.PENDING, label: "Pending" },
      { value: InspectionStatusEnum.ASSIGNED, label: "Assigned" },
      { value: InspectionStatusEnum.ACTIVE, label: "Active" },
      { value: InspectionStatusEnum.PROCESSING, label: "Processing" },
      { value: InspectionStatusEnum.REVIEW, label: "Review" },
      { value: InspectionStatusEnum.COMPLETE, label: "Complete" },
      { value: InspectionStatusEnum.CLOSED, label: "Closed" },
    ];
  }

  private getInspectionStatusesForTypist() {
    return [
      { value: InspectionStatusTypistEnum.PENDING, label: "Pending" },
      { value: InspectionStatusTypistEnum.IN_PROGRESS, label: "In Progress" },
      { value: InspectionStatusTypistEnum.ACTIVE, label: "Active" },
      { value: InspectionStatusTypistEnum.COMPLETE, label: "Complete" },
      { value: InspectionStatusTypistEnum.CLOSED, label: "Closed" },
    ];
  }

  private getFurnishingTypes() {
    return [
      { value: FurnishingStatusEnum.FURNISHED, label: "Furnished" },
      { value: FurnishingStatusEnum.UNFURNISHED, label: "Unfurnished" },
      { value: FurnishingStatusEnum.PART_FURNISHED, label: "Part Furnished" },
    ];
  }

  private getBuildingTypes() {
    return [
      { value: BuildingTypeEnum.HOUSE, label: "House" },
      { value: BuildingTypeEnum.APARTMENT, label: "Apartment" },
      { value: BuildingTypeEnum.MAISONETTE, label: "Maisonette" },
      { value: BuildingTypeEnum.TERRACE_HOUSE, label: "Terrace House" },
      { value: BuildingTypeEnum.BUNGALOW, label: "Bungalow" },
      { value: BuildingTypeEnum.TOWN_HOUSE, label: "Town House" },
      { value: BuildingTypeEnum.OTHER, label: "Other" },
    ];
  }

  private PersonTitles() {
    return [
      { value: PersonTitleEnum.MR, label: "Mr" },
      { value: PersonTitleEnum.MRS, label: "Mrs" },
      { value: PersonTitleEnum.MISS, label: "Miss" },
      { value: PersonTitleEnum.MS, label: "Ms" },
      { value: PersonTitleEnum.MX, label: "Mx" },
      { value: PersonTitleEnum.DR, label: "Dr." },
      { value: PersonTitleEnum.LORD, label: "Lord" },
    ];
  }
}
