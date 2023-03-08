export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    two_factor_recovery_codes: string | null;
    two_factor_secret: string | null;
    created_at: string;
    updated_at: string | null;
};

export type LoginData = {
    email: string;
    password: string;
};
export type RegisterData = {
    email: string;
    password: string;
    password_confirmation: string;
};
export type ProfileData = {
    name?: string;
    email?: string;
};
