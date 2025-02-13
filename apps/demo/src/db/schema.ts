import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  age: integer('age').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
});

export const postsTable = pgTable('posts', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow(),
  content: text('content'),
  published: boolean('published').default(false),
  publishedAt: timestamp('published_at'),
  metaDescription: text('meta_description'),
  userId: integer('user_id').references(() => usersTable.id).notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  posts: many(postsTable),
}));


export const postsRelations = relations(postsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [postsTable.userId],
    references: [usersTable.id],
  }),
}));
