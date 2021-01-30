import {MigrationInterface, QueryRunner} from "typeorm";

export class creatorID1611966148794 implements MigrationInterface {
    name = 'creatorID1611966148794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "is_admin" boolean NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "orphanages" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "about" varchar NOT NULL, "instructions" varchar NOT NULL, "opening_hours" varchar NOT NULL, "open_on_weekends" boolean NOT NULL, "approved" boolean NOT NULL, "creator_id" integer)`);
        await queryRunner.query(`CREATE TABLE "images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "orphanage_id" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_orphanages" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "about" varchar NOT NULL, "instructions" varchar NOT NULL, "opening_hours" varchar NOT NULL, "open_on_weekends" boolean NOT NULL, "approved" boolean NOT NULL, "creator_id" integer, CONSTRAINT "FK_8b6bede5a36097eba8a04720c1b" FOREIGN KEY ("creator_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_orphanages"("id", "name", "latitude", "longitude", "about", "instructions", "opening_hours", "open_on_weekends", "approved", "creator_id") SELECT "id", "name", "latitude", "longitude", "about", "instructions", "opening_hours", "open_on_weekends", "approved", "creator_id" FROM "orphanages"`);
        await queryRunner.query(`DROP TABLE "orphanages"`);
        await queryRunner.query(`ALTER TABLE "temporary_orphanages" RENAME TO "orphanages"`);
        await queryRunner.query(`CREATE TABLE "temporary_images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "orphanage_id" integer, CONSTRAINT "FK_aa7e04fdd620f748adad5b96bbb" FOREIGN KEY ("orphanage_id") REFERENCES "orphanages" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_images"("id", "path", "orphanage_id") SELECT "id", "path", "orphanage_id" FROM "images"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`ALTER TABLE "temporary_images" RENAME TO "images"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" RENAME TO "temporary_images"`);
        await queryRunner.query(`CREATE TABLE "images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "orphanage_id" integer)`);
        await queryRunner.query(`INSERT INTO "images"("id", "path", "orphanage_id") SELECT "id", "path", "orphanage_id" FROM "temporary_images"`);
        await queryRunner.query(`DROP TABLE "temporary_images"`);
        await queryRunner.query(`ALTER TABLE "orphanages" RENAME TO "temporary_orphanages"`);
        await queryRunner.query(`CREATE TABLE "orphanages" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "about" varchar NOT NULL, "instructions" varchar NOT NULL, "opening_hours" varchar NOT NULL, "open_on_weekends" boolean NOT NULL, "approved" boolean NOT NULL, "creator_id" integer)`);
        await queryRunner.query(`INSERT INTO "orphanages"("id", "name", "latitude", "longitude", "about", "instructions", "opening_hours", "open_on_weekends", "approved", "creator_id") SELECT "id", "name", "latitude", "longitude", "about", "instructions", "opening_hours", "open_on_weekends", "approved", "creator_id" FROM "temporary_orphanages"`);
        await queryRunner.query(`DROP TABLE "temporary_orphanages"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "orphanages"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
