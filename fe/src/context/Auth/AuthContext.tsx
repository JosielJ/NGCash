import { createContext} from "react";
import { User } from "../../types/User";

export type AuthContextType = {
    user: User | null;
    logout: () => void;
    setToken: (token: string) => void;
    verify: boolean;
    setAccountID: (token: string) => void;
    accountID: string;
};

export const AuthContext = createContext<AuthContextType>(null!);