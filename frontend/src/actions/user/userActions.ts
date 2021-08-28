export type UserDetailsResponseType = {
  firstname: string | null,
  lastname: string | null,
  profile_img: string | null,
}

export type PublisherResponseType = {
  id: number;
  username: string;
  email: string;
  roles: string[];
  details: UserDetailsResponseType | null | undefined;
};