import { Injectable } from "@nestjs/common";
import { InspectionType } from "src/common/enums/enum";

@Injectable()
export class StaticService {
  private getInspectionTypes() {
    return [
      {
        value: InspectionType.INVENTORY_MAKE_AND_CHECK_IN,
        label: "Inventory Make and Check-In",
      },
      { value: InspectionType.INVENTORY, label: "Inventory" },
      { value: InspectionType.CHECK_IN, label: "Check-In" },
      { value: InspectionType.CHECK_OUT, label: "Check-Out" },
      {
        value: InspectionType.MID_TERM_INSPECTION,
        label: "Mid Term Inspection",
      },
      { value: InspectionType.SNAGGING_REPORT, label: "Snagging Report" },
      { value: InspectionType.HMO, label: "HMO" },
      {
        value: InspectionType.SCHEDULE_CONDITION_CHECK_IN,
        label: "Schedule of Condition Check-In",
      },
      {
        value: InspectionType.SCHEDULE_CONDITION_CHECK_OUT,
        label: "Schedule of Condition Check-Out",
      },
    ];
  }

  getStaticData() {
    return {
      inspectionTypes: this.getInspectionTypes(),
    };
  }
}
