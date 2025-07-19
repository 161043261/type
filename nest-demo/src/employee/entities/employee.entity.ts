import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Employee /** 表名 */ {
  @PrimaryGeneratedColumn()
  id: number; // 自增主键
  @Column({ type: 'varchar', length: 255 })
  name: string; // 字段名
  @Column({ type: 'enum', enum: [1, 2, 3], default: 1 })
  age: number;
  @Column({ select: true, comment: 'myComment', nullable: false })
  password: string;
  @Generated('uuid')
  uuid: string;
  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @Column('simple-array')
  // 使用 roles.join(',') 存储到数据库
  roles: string[];
  @Column('simple-json')
  // 使用 JSON.stringify(user) 存储到数据库
  user: { name: string; age: number };
}
