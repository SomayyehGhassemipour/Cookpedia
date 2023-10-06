interface Recipe {
  userID: string;
  image: any;
  title: string;
  description: string;
  cookTime: string;
  serves: string;
  origin: string;
  ingredients: string[];
  instructions: string[];
}

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
  image?: string;
  gender: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  joinedDate: string | null;
}
export type { Recipe, User };
