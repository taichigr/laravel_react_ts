import { axios } from "./axios";
import React, {
    useContext,
    createContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { LoginData, ProfileData, RegisterData, User } from "../features/auth/types";


interface authProps {
    user: User | null;
    register: (registerData: RegisterData) => Promise<void>;
    signin: (loginData: LoginData) => Promise<void>;
    signout: () => Promise<void>;
    updateProfile: (formData: FormData | ProfileData) => Promise<void>;
}
interface Props {
    children: ReactNode;
}
interface RouteProps {
    children: ReactNode;
    path: string;
    exact?: boolean;
}
interface From {
    from: Location;
}

const authContext = createContext<authProps | null>(null);

export const AuthProvider = ({ children }: Props) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

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
        const response = await axios.post("/api/login", loginData);
        if (response.status) {
            const userRes = await axios
                .get("/api/user")
                .then((res) => {
                    setUser(res.data);
                })
                .catch((error) => {
                    setUser(null);
                });
        }
    };

    const signout = () => {
        return axios.post("/api/logout", {}).then(() => {
            setUser(null);
        });
    };

    const updateProfile = async (formData: ProfileData) => {
        const res = await axios
            .post("/api/user/profile-information", formData, {
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
        axios
            .get("/api/user")
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => {
                setUser(null);
            });
    }, []);

    return {
        user,
        register,
        signin,
        signout,
        updateProfile,
    };
};

/**
 * 認証済みのみアクセス可能
 */
export const PrivateRoute = ({ children, path, exact = false }: RouteProps) => {
    const auth = useAuth();
    return (
        <Route
            path={path}
            exact={exact}
            render={({ location }) => {
                if (auth?.user == null) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location },
                            }}
                        />
                    );
                } else {
                    return children;
                }
            }}
        />
    );
};

/**
 * 認証していない場合のみアクセス可能（ログイン画面など）
 */
export const OnlyGuestRoute = ({
    children,
    path,
    exact = false,
}: RouteProps) => {
    const auth = useAuth();
    const history = useHistory();
    return (
        <Route
            path={path}
            exact={exact}
            render={({ location }) => {
                if (auth?.user == null) {
                    return children;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: (history.location.state as From)
                                    ? (history.location.state as From).from
                                          .pathname
                                    : "/mypage",
                                state: { from: location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};
