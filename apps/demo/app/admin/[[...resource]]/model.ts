import { usersAdminResources } from './drizzle-repositories/users-admin-resource';
import { postsAdminResources } from './drizzle-repositories/posts-admin-resource';

export const adminResources = {
  users: usersAdminResources,
  posts: postsAdminResources,
};