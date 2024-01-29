import axios from "axios";

export const userService = {
  authenticate,
};

interface User {
  id: string;
  name: string;
  email: string;
}

async function authenticate(
  username: string,
  password: string,
): Promise<User | null> {
  const loginData = {
    identifier: username,
    password: password,
  };

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
      loginData,
    );

    const data = response.data;

    const user: User = {
      id: data.user.id,
      name: data.user.username,
      email: data.user.email,
    };

    return user;
  } catch (error) {
    console.error("Authentication failed:", error);
    throw error;
  }
}
