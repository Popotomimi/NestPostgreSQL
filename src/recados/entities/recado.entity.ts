import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Recado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  texto: string;

  @Column({ type: 'varchar', length: 50 })
  de: string;

  @Column({ type: 'varchar', length: 50 })
  para: string;

  @Column({ default: false })
  lido: boolean;

  @Column({ type: 'date' })
  data: Date;

  @CreateDateColumn()
  createdAt?: Date; // CreatedAt

  @UpdateDateColumn()
  updatedAt?: Date; // UpdatedAt
}
