ALTER TABLE `users` ADD `google_id` text;--> statement-breakpoint
ALTER TABLE `users` ADD `google_token` text;--> statement-breakpoint
CREATE UNIQUE INDEX `users_google_id_unique` ON `users` (`google_id`);