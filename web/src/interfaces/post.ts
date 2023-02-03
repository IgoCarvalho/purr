import type { User } from './user';

type PostOwnerData = Pick<User, 'id' | 'avatarUrl' | 'name'>;

export interface Post {
  createdAt: string;
  id: string;
  images: Image[];
  likes: number;
  ownerId: string;
  text: string;
  owner: PostOwnerData;
}

export interface Image {
  id: string;
  createdAt: string;
  url: string;
  altText: string;
  postId: string;
}

export type PostResponse = Omit<Post, 'ownerId' | 'owner'>;
