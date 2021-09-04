export type UserProfileResponse = {
  firstname: string;
  lastname: string;
  profile_img: string;
}

export type UserProfileType = {
  firstname: string;
  lastname: string;
  profileImage: string;
}

export type UserResponse = {
  id: number;
  username: string;
  email: string;
  roles: string[];
  details: UserProfileResponse;
}

export type UserType = {
  id: number;
  username: string;
  email: string;
  roles: string[];
  details: UserProfileType;
}

export type PublisherResponse = UserResponse;
export type PublisherType = UserType;

export type ModelResponseType = {
  id: number;
  name: string;
  category: string;
  framework: string;
  format: string;
  publisher: PublisherResponse;
  excerpt: string;
  description: string;
  tags: string[];
  price: number;
  created_at: string;
  updated_at: string;
}

export type ModelType = {
  id: number;
  name: string;
  category: string;
  framework: string;
  format: string;
  publisher: PublisherType;
  excerpt: string;
  description: string;
  tags: string[];
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export type PageResponseType<E> = {
  content: E[];
  page: number;
  page_size: number;
  total_size: number;
  total_pages: number;
}

export const mapUserResponseToUser = (response: UserResponse): UserType => {
  const {profile_img, ...reduced} = response.details;
  return Object.assign({}, response, {
    details: Object.assign(reduced, {
      profileImage: profile_img,
    }),
  });
};

export const mapModelResponseToModel = (response: ModelResponseType): ModelType => {
  const {created_at, updated_at, publisher, ...reduced} = response;
  return Object.assign(reduced, {
    publisher: mapUserResponseToUser(publisher),
    createdAt: new Date(created_at),
    updatedAt: new Date(updated_at),
  });
};


