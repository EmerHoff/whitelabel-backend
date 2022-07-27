import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableEmailLog1658868928130 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'email_log',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isUnique: true,
          },
          {
            name: 'user_id',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'content',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp without time zone',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'email_log',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        name: 'fk_email_log_user_id',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('email_log', true, true);
  }
}
