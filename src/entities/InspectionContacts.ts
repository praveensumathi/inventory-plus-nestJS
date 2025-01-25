import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Contacts } from "./Contacts";
import { Inspections } from "./Inspections";

@Index("PK_InspectionContacts", ["id"], { unique: true })
@Entity("InspectionContacts", { schema: "dbo" })
export class InspectionContacts {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @ManyToOne(() => Contacts, (contacts) => contacts.inspectionContacts)
  @JoinColumn([{ name: "ContactId", referencedColumnName: "id" }])
  contact: Contacts;

  @ManyToOne(() => Inspections, (inspections) => inspections.inspectionContacts)
  @JoinColumn([{ name: "InspectionId", referencedColumnName: "id" }])
  inspection: Inspections;
}
