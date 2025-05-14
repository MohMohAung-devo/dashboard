import API from "./api";

interface userData {
  // name: string;
  // email: string;
  // phone: string;
  // password: string;
  // location: string;

  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  password?: string;
  refreshToken?: string;
  createdAt?: Date;
}

interface LoginCredentails {
  email: string;
  password: string;
}

interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
}

interface AuthResponse {
  // success: boolean;
  // user?: {
  //   id: string;
  //   name: string;
  //   email: string;
  //   phone: string;
  //   location: string;
  // };

  // message?: string;

  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  user: userData;
  message?: string;
}

export const register = async (userData: userData): Promise<AuthResponse> => {
  try {
    const response = await API.post<AuthResponse>("/users", userData);
    return response.data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    throw new Error(apiError.response?.data?.message || "Registration failed");
  }
};

export const login = async (
  credentail: LoginCredentails
): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>("/login", credentail);
  return response.data;
};

export const logout = async (): Promise<{ success: boolean }> => {
  try {
    const response = await API.post<{ success: boolean }>("/logout");
    return response.data;
  } catch (error: unknown) {
    const apiError = error as ApiError;
    throw new Error(apiError.response?.data?.message || "Logout failed");
  }
};

export const getProfile = async (): Promise<AuthResponse> => {
  try {
    const response = await API.get<AuthResponse>("/profile");
    return response.data;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.response?.data?.message || "Profile fetch failed");
  }
};
