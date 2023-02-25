import axios, { AxiosResponse } from "axios";
import React, {
    useContext,
    createContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { Route, useLocation, Navigate, useNavigate } from "react-router-dom";

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    two_factor_recovery_codes: string | null;
    two_factor_secret: string | null;
    created_at: string;
    updated_at: string | null;
}
interface LoginData {
    email: string;
    password: string;
}
interface RegisterData {
    email: string;
    password: string;
    password_confirmation: string;
}
interface ProfileData {
    name?: string;
    email?: string;
}
interface authProps {
    user: User | null;
    register: (registerData: RegisterData) => Promise<void>;
    signin: (loginData: LoginData) => Promise<void>;
    signout: () => Promise<void>;
    saveProfile: (formData: FormData | ProfileData) => Promise<void>;
}
interface Props {
    children: ReactNode;
}
interface RouteProps {
    children: ReactNode;
    path: string;
}
interface From {
    from: {
        pathname: string;
    };
}

const authContext = createContext<authProps | null>(null);

const ProvideAuth = ({ children }: Props) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
export default ProvideAuth;

export const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    const register = (registerData: RegisterData) => {
        return axios.post("/api/register", registerData).then((res) => {
            axios.get("/api/user").then((res) => {
                setUser(res.data);
            });
        });
    };

    const signin = async (loginData: LoginData) => {
        try {
            const res = await axios.post("/api/login", loginData);
        } catch (error) {
            throw error;
        }

        return axios
            .get("/api/user")
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((error) => {
                setUser(null);
            });
    };

    const signout = () => {
        return axios.post("/api/logout", {}).then(() => {
            setUser(null);
        });
    };

    const saveProfile = async (formData: FormData | ProfileData) => {
        const res = await axios
            .post("/user/profile-information", formData, {
                headers: { "X-HTTP-Method-Override": "PUT" },
            })
            .catch((error) => {
                throw error;
            });
        if (res?.status == 200) {
            return axios
                .get("/api/user")
                .then((res) => {
                    setUser(res.data);
                })
                .catch((error) => {
                    setUser(null);
                });
        }
    };

    useEffect(() => {
        console.log("this");
        axios
            .get("/api/user")
            .then((res) => {
                console.log(res);

                setUser(res.data);
            })
            .catch((error) => {
                console.log(error);
                setUser(null);
            });
        console.log("thithit");
    console.log(user);

    }, []);

    console.log(user);
    return {
        user,
        register,
        signin,
        signout,
        saveProfile,
    };
};

/**
 * 認証済みのみアクセス可能
 */
export const PrivateRoute = ({ children, path }: RouteProps) => {
    const auth = useAuth();

    return (
        <Route
            path={path}
            element={
                auth?.user == null ? (
                    <Navigate
                        to="/login"
                        state={{ from: path }}
                        replace={true}
                    />
                ) : (
                    children
                )
            }
        />
    );
};

/**
 * 認証していない場合のみアクセス可能（ログイン画面など）
 */
export const PublicRoute = ({ children, path, ...props }: RouteProps) => {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    if (auth?.user != null) {
        navigate((location.state as From)?.from?.pathname ?? "/", {
            replace: true,
        });
        return null;
    }

    return <Route path={path} {...props} element={children} />;
};
