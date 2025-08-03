import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ZODIAC_SIGN } from "../utils/horoscopeService";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "date" })
  birthdate: Date;

  @Column({
    type: "enum",
    enum: ZODIAC_SIGN,
  })
  zodiacSign: ZODIAC_SIGN;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
