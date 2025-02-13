CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"content" text,
	"published" boolean DEFAULT false,
	"published_at" timestamp,
	"meta_description" text,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;