import { AxiosError } from "axios";
import AppAxios from "../axios";

export default class EmailVerificationRepository {
    static async sendEmailVerification() {
        try {
            await AppAxios.post("/email-verification/send");
            return null;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response?.data.message;
            }
            return "Something wrong!";
        }
    }
    static async verifyEmail(code: string) {
        try {
            await AppAxios.post("/email-verification/verify", { code });
            return null;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response?.data.message;
            }
            return "Something wrong!";
        }
    }
}
