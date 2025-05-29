-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."location_type" AS ENUM('country', 'state', 'city', 'neighborhood');--> statement-breakpoint
CREATE TABLE "migrations_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"filename" text NOT NULL,
	"applied_at" timestamp DEFAULT now(),
	CONSTRAINT "migrations_log_filename_key" UNIQUE("filename")
);
--> statement-breakpoint
CREATE TABLE "fb_entry" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"example" text,
	"see_also" text,
	"aka" text
);
--> statement-breakpoint
CREATE TABLE "fb_association" (
	"id" serial PRIMARY KEY NOT NULL,
	"main_entry" integer,
	"associated_entry" integer,
	"association_text" text NOT NULL,
	"strength" integer NOT NULL,
	"example" text[],
	"narrower" text[]
);
--> statement-breakpoint
CREATE TABLE "fb_affinity" (
	"id" serial PRIMARY KEY NOT NULL,
	"entry_id" integer
);
--> statement-breakpoint
CREATE TABLE "fb_dish" (
	"id" serial PRIMARY KEY NOT NULL,
	"entry_id" integer,
	"description" text NOT NULL,
	"attribution" text
);
--> statement-breakpoint
CREATE TABLE "fb_note" (
	"id" serial PRIMARY KEY NOT NULL,
	"entry_id" integer,
	"note" text NOT NULL,
	"attribution" text
);
--> statement-breakpoint
CREATE TABLE "restaurant_booking" (
	"url" text NOT NULL,
	"restaurant_id" integer,
	"provider_id" text,
	CONSTRAINT "unique_booking" UNIQUE("restaurant_id","provider_id")
);
--> statement-breakpoint
CREATE TABLE "booking_provider" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "fb_meta" (
	"id" serial PRIMARY KEY NOT NULL,
	"entry_id" integer,
	"key" text NOT NULL,
	"value" text
);
--> statement-breakpoint
CREATE TABLE "restaurant_schedules" (
	"restaurant_id" integer,
	"schedule_id" integer
);
--> statement-breakpoint
CREATE TABLE "restaurant_schedule" (
	"id" serial PRIMARY KEY NOT NULL,
	"day" integer NOT NULL,
	"closed" boolean DEFAULT false NOT NULL,
	"open" text,
	"close" text
);
--> statement-breakpoint
CREATE TABLE "currency" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"abbr" varchar(225) NOT NULL,
	"symbol" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"email" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "restaurant_award_distinction" (
	"id" serial PRIMARY KEY NOT NULL,
	"restaurant_award_id" integer NOT NULL,
	"distinction_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	CONSTRAINT "ingredients_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "ingredient_category" (
	"ingredient_id" integer NOT NULL,
	"category_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cuisine" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "cuisine_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" "location_type" NOT NULL,
	"parent_id" text,
	"abbr" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "award_type" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	CONSTRAINT "award_type_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "award_distinction" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"award_type_id" text NOT NULL,
	CONSTRAINT "award_distinction_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "restaurant" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"longitude" double precision,
	"latitude" double precision,
	"location_id" text,
	"website" text,
	"currency_id" text,
	"phone" text,
	"street_address" text,
	"postcode" text,
	CONSTRAINT "unique_name_loc" UNIQUE("name","longitude","latitude")
);
--> statement-breakpoint
CREATE TABLE "restaurant_award" (
	"id" serial PRIMARY KEY NOT NULL,
	"restaurant_id" integer NOT NULL,
	"award_type_id" text NOT NULL,
	"award_date" date NOT NULL,
	"rank" integer,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now(),
	"description" text,
	"url" text,
	CONSTRAINT "unique_awards" UNIQUE("restaurant_id","award_type_id","award_date")
);
--> statement-breakpoint
CREATE TABLE "coffee_roasters" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"location_id" text
);
--> statement-breakpoint
CREATE TABLE "coffee_farms" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"location_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "coffee_processes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "coffee_beans" (
	"id" serial PRIMARY KEY NOT NULL,
	"altitude" integer,
	"roast_date" date,
	"tasting_notes" text,
	"roaster_id" integer,
	"location_id" text,
	"producer_id" integer,
	"farm_id" integer,
	"varietal_id" integer
);
--> statement-breakpoint
CREATE TABLE "coffee_producers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "coffee_varietals" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fb_affinity_entry" (
	"affinity_id" integer NOT NULL,
	"entry_id" integer NOT NULL,
	CONSTRAINT "fb_affinity_entry_pkey" PRIMARY KEY("affinity_id","entry_id")
);
--> statement-breakpoint
CREATE TABLE "restaurant_cuisine" (
	"restaurant_id" integer NOT NULL,
	"cuisine_id" text NOT NULL,
	CONSTRAINT "restaurant_cuisine_pkey" PRIMARY KEY("restaurant_id","cuisine_id")
);
--> statement-breakpoint
ALTER TABLE "fb_association" ADD CONSTRAINT "fb_association_main_entry_fkey" FOREIGN KEY ("main_entry") REFERENCES "public"."fb_entry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fb_association" ADD CONSTRAINT "fb_association_associated_entry_fkey" FOREIGN KEY ("associated_entry") REFERENCES "public"."fb_entry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fb_affinity" ADD CONSTRAINT "fb_affinity_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "public"."fb_entry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fb_dish" ADD CONSTRAINT "fb_dish_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "public"."fb_entry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fb_note" ADD CONSTRAINT "fb_note_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "public"."fb_entry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurant_booking" ADD CONSTRAINT "restaurant_booking_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurant_booking" ADD CONSTRAINT "restaurant_booking_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "public"."booking_provider"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fb_meta" ADD CONSTRAINT "fb_meta_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "public"."fb_entry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurant_schedules" ADD CONSTRAINT "restaurant_schedules_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurant_schedules" ADD CONSTRAINT "restaurant_schedules_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "public"."restaurant_schedule"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurant_award_distinction" ADD CONSTRAINT "restaurant_award_distinction_restaurant_award_id_fkey" FOREIGN KEY ("restaurant_award_id") REFERENCES "public"."restaurant_award"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurant_award_distinction" ADD CONSTRAINT "restaurant_award_distinction_distinction_id_fkey" FOREIGN KEY ("distinction_id") REFERENCES "public"."award_distinction"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ingredient_category" ADD CONSTRAINT "ingredient_category_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ingredient_category" ADD CONSTRAINT "ingredient_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "award_distinction" ADD CONSTRAINT "award_distinction_award_type_id_fkey" FOREIGN KEY ("award_type_id") REFERENCES "public"."award_type"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "public"."currency"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurant_award" ADD CONSTRAINT "restaurant_award_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurant_award" ADD CONSTRAINT "restaurant_award_award_type_id_fkey" FOREIGN KEY ("award_type_id") REFERENCES "public"."award_type"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coffee_roasters" ADD CONSTRAINT "coffee_roasters_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coffee_farms" ADD CONSTRAINT "coffee_farms_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coffee_beans" ADD CONSTRAINT "coffee_beans_roaster_id_fkey" FOREIGN KEY ("roaster_id") REFERENCES "public"."coffee_roasters"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coffee_beans" ADD CONSTRAINT "coffee_beans_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coffee_beans" ADD CONSTRAINT "coffee_beans_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "public"."coffee_producers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coffee_beans" ADD CONSTRAINT "coffee_beans_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "public"."coffee_farms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coffee_beans" ADD CONSTRAINT "coffee_beans_varietal_id_fkey" FOREIGN KEY ("varietal_id") REFERENCES "public"."coffee_varietals"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fb_affinity_entry" ADD CONSTRAINT "fb_affinity_entry_affinity_id_fkey" FOREIGN KEY ("affinity_id") REFERENCES "public"."fb_affinity"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fb_affinity_entry" ADD CONSTRAINT "fb_affinity_entry_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "public"."fb_entry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurant_cuisine" ADD CONSTRAINT "restaurant_cuisine_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurant_cuisine" ADD CONSTRAINT "restaurant_cuisine_cuisine_id_fkey" FOREIGN KEY ("cuisine_id") REFERENCES "public"."cuisine"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE VIEW "public"."restaurant_booking_view" AS (SELECT r.id, COALESCE(json_agg(jsonb_build_object('name', bp.name, 'id', bp.id, 'url', rb.url)) FILTER (WHERE bp.id IS NOT NULL), '[]'::json) AS booking FROM restaurant r LEFT JOIN restaurant_booking rb ON rb.restaurant_id = r.id LEFT JOIN booking_provider bp ON bp.id = rb.provider_id GROUP BY r.id);--> statement-breakpoint
CREATE VIEW "public"."enriched_restaurant" AS (SELECT r.id, r.name, r.website, r.phone, r.street_address, r.postcode, rl.locations, rc.cuisines, ra.awards, rb.booking FROM restaurant r LEFT JOIN restaurant_awards ra ON ra.id = r.id LEFT JOIN restaurant_cuisines rc ON rc.id = r.id LEFT JOIN restaurant_locations rl ON rl.id = r.id LEFT JOIN restaurant_booking_view rb ON rb.id = r.id);--> statement-breakpoint
CREATE VIEW "public"."restaurant_locations" AS (WITH RECURSIVE location_hierarchy AS ( SELECT r.id AS restaurant_id, r.name AS restaurant_name, l.id AS location_id, l.name AS location_name, l.type AS location_type, l.abbr AS location_abbr, l.parent_id, 0 AS depth FROM restaurant r JOIN locations l ON r.location_id = l.id UNION ALL SELECT lh_1.restaurant_id, lh_1.restaurant_name, l.id AS location_id, l.name AS location_name, l.type AS location_type, l.abbr AS location_abbr, l.parent_id, lh_1.depth + 1 FROM locations l JOIN location_hierarchy lh_1 ON l.id = lh_1.parent_id ) SELECT restaurant_id AS id, json_agg(json_build_object('id', location_id, 'name', location_name, 'type', location_type, 'abbr', location_abbr) ORDER BY depth DESC) AS locations FROM location_hierarchy lh GROUP BY restaurant_id, restaurant_name);--> statement-breakpoint
CREATE VIEW "public"."restaurant_awards" AS (SELECT r.id, r.name, COALESCE(json_agg(DISTINCT jsonb_build_object('id', at.id, 'award', at.name, 'date', ra.award_date, 'distinctions', COALESCE(( SELECT json_agg(jsonb_build_object('id', ad.id, 'name', ad.name)) AS json_agg FROM restaurant_award_distinction rad LEFT JOIN award_distinction ad ON rad.distinction_id = ad.id WHERE ra.award_type_id = at.id AND ra.restaurant_id = r.id AND rad.restaurant_award_id = ra.id), '[]'::json))) FILTER (WHERE at.id IS NOT NULL), '[]'::json) AS awards FROM restaurant r LEFT JOIN restaurant_award ra ON ra.restaurant_id = r.id LEFT JOIN award_type at ON ra.award_type_id = at.id GROUP BY r.id, r.name);--> statement-breakpoint
CREATE VIEW "public"."restaurant_cuisines" AS (SELECT r.id, COALESCE(json_agg(jsonb_build_object('name', c.name, 'id', c.id)) FILTER (WHERE c.id IS NOT NULL), '[]'::json) AS cuisines FROM restaurant r LEFT JOIN restaurant_cuisine rc ON rc.restaurant_id = r.id LEFT JOIN cuisine c ON rc.cuisine_id = c.id GROUP BY r.id, r.name);
*/