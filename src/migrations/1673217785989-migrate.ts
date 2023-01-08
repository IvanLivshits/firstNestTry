import { MigrationInterface, QueryRunner } from 'typeorm';

export class CatRefactoring1673214886955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cat" RENAME COLUMN "name" to "title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cat" RENAME COLUMN "title" to "name"`,
    );
  }
}
