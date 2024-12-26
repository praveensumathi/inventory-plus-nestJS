import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('test_pkey', ['id'], { unique: true })
@Entity('test', { schema: 'public' })
export class Test {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('character varying', { name: 'name', nullable: true })
  name: string | null;
}
