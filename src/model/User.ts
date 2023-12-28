interface User {
  userName: string;
  userID: string;
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
const initialUser: User = {
  userName: "",
  userID: "",
  email: "",
  fullname: "",
  aboutme: "",
  birthday: null,
  cookLevel: "",
  country: "",
  city: "",
  phoneNumber: "",
  avatar: null,
  gender: "",
  facebook: "",
  instagram: "",
  twitter: "",
  joinedDate: null,
};
export type { User };
export { initialUser };
