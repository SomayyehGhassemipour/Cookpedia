interface User {
  userName: string;
  email: string;
  fullname: string;
  aboutme: string;
  birthday: Date | null;
  cookLevel: string;
  country: string;
  city: string;
  phoneNumber: string;
  avatar?: any;
  gender: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  joinedDate: string | null;
}
export type { User };
