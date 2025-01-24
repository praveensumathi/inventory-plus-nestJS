import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Contacts } from "./Contacts";
import { Inspections } from "./Inspections";

@Entity("InspectionContacts", { schema: "dbo" })
export class InspectionContacts {
  @ManyToOne(() => Contacts, (contacts) => contacts.inspectionContacts)
  @JoinColumn([{ name: "ContactId", referencedColumnName: "id" }])
  contact: Contacts;

  @ManyToOne(() => Inspections, (inspections) => inspections.inspectionContacts)
  @JoinColumn([{ name: "InspectionId", referencedColumnName: "id" }])
  inspection: Inspections;
}
