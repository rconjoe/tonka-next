import { Migration } from '@mikro-orm/migrations';

export class Migration20241126225835 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "post" ("id" text not null, "title" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "post_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "post" cascade;');
  }

}
