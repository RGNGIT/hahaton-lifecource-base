import { Model, BelongsTo, Column, Table, ForeignKey } from "sequelize-typescript";
import { Test } from "./test.entity";
import { User } from "src/user/entities/user.entity";

@Table
export class TestResult extends Model {
  @Column
  score: number;

  @ForeignKey(() => Test)
  @Column
  test_id: number;

  @BelongsTo(() => Test)
  test: Test;

  @Column
  is_vr: boolean;

  @ForeignKey(()=>User)
  @Column 
  user_id: number;

  @BelongsTo(()=>User)
  user: User;

}