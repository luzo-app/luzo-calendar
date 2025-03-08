import {
    createContext,
    useMemo,
    useReducer,
    ReactNode,
} from "react";

import axios from "axios";

import { DOMAIN } from "@/api/constants";

import { User } from "@/types/user";

import { getCookie, setCookie } from "@/lib/cookies";

// Types
type AuthState = {
    token: string | null;
    refreshToken: string | null;
    user: User | null;
};

type AuthContextType = AuthState & {
    refreshAccessToken: () => Promise<void>;
};

export type { AuthContextType };

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: any): AuthState => {
    console.error(`You passed an action.type: ${action} which doesn't exist`);
    return state;
};

const initialData: AuthState = {
    token: getCookie('token') || null,
    refreshToken: getCookie('refreshToken') || null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state] = useReducer(authReducer, initialData);

    const refreshAccessToken = async () => {
        if (!state.refreshToken) {
            console.error("No refresh token available to refresh access token.");
            return;
        }

        try {
            const response = await axios.post("/auth/refresh", {
                refreshToken: state.refreshToken,
            });

            const { token, refreshToken } = response.data;

            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            setCookie("token", token, {
                domain: DOMAIN,
                secure: window.location.protocol === "https:",
                sameSite: "Lax"
            });
            setCookie("refreshToken", refreshToken, {
                domain: DOMAIN,
                secure: window.location.protocol === "https:",
                sameSite: "Lax"
            });
        } catch (error) {
            console.error("Failed to refresh access token:", error);
        }
    };

    // useEffect(() => {
    //     if (state.user && state.token) {
    //         profileService.getMe()
    //             .catch((e) => {
    //                 console.log(e)
    //                 // Cookies.remove("token", { domain: DOMAIN });
    //                 // Cookies.remove("refreshToken", { domain: DOMAIN });
    //                 // localStorage.removeItem("user");
    //             });
    //     }
    // }, [state.user, state.token]);

    const contextValue = useMemo(
        () => ({
            ...state,
            refreshAccessToken,
        }),
        [state]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
