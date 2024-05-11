import EmailVerificationRepository from "./emailVerificationRepository";
import UserRepository from "./userRepository";

export default class Repositories {
    static userRepository = UserRepository;
    static emailVerificationRepository = EmailVerificationRepository;
}