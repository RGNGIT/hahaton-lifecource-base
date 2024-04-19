import { Model, BelongsTo, Column, HasMany, Table, ForeignKey } from "sequelize-typescript";
import { Blob } from "../../cdn/entities/blob.entity";
import { Department } from "src/departments/entities/department.entity";
import { Test } from "../../test/entities/test.entity";

@Table
export class Topic extends Model {
  @Column
  name: string;

  @ForeignKey(() => Blob)
  @Column
  blob_id: number;

  @BelongsTo(() => Blob)
  blob: Blob;

  @ForeignKey(() => Department)
  @Column
  department_id: number;

  @BelongsTo(() => Department)
  department: Department;

  @HasMany(() => Test)
  test: Test[];
}