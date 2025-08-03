import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("horoscope_history")
export class HoroscopeHistory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column({ length: 20 })
  zodiacSign: string;

  @Column({ type: "text" })
  horoscopeText: string;

  @Column({ type: "date" })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateddAt: Date;
}
