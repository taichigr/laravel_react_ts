export const saveWithExpiration = (
    key: string,
    value: any,
    expirationTime: number
) => {
    const data = {
        value,
        expiration: Date.now() + expirationTime,
    };
    localStorage.setItem(key, JSON.stringify(data));
};

export const loadWithExpiration = (key: string) => {
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    if (data.expiration && data.expiration < Date.now()) {
        localStorage.removeItem(key);
        return null;
    }
    return data.value;
};
