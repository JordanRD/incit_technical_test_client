import { AxiosError } from "axios";
import AppAxios from "../axios";
import { UpdateUserInput } from "../types/User";

export default class UserRepository {
    static async logout() {
        try {
            await AppAxios.post("/auth/logout");
            return null;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response?.data.message;
            }
            return "Something wrong!";
        }
    }

    static async login(email: string, password: string) {
        try {
            await AppAxios.post("/auth/login", {
                email,
                password,
            });
            return null;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response?.data.message;
            }
            return "Something wrong!";
        }
    }
    static async register(name: string, email: string, password: string) {
        try {
            await AppAxios.post("/auth/register", {
                name,
                email,
                password,
            });
            return null;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response?.data.message;
            }
            return "Something wrong!";
        }
    }

    static async getCurrentUser() {
        try {
            const { data } = await AppAxios.get("/user/current");
            return data?.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getUserDashboard() {
        try {
            const { data } = await AppAxios.get("/user/dashboard");
            return data?.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async updateUser(input: UpdateUserInput) {
        try {
            await AppAxios.post("/user/update", input);
            return null;
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError) {
                return error.response?.data.message;
            }
            return "Something wrong!";
        }
    }
    static async changePassword(password: string, oldPassword?: string) {
        try {
            await AppAxios.post("/user/change-password", {
                password,
                oldPassword,
            });
            return null;
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError) {
                return error.response?.data.message;
            }
            return "Something wrong!";
        }
    }
}
