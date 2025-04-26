export const login = async (username: string, password: string) => {
    return new Promise<{ user: string; token: string }>((resolve, reject) => {
        setTimeout(() => {
            if (username === "admin" && password === "admin") {
                resolve({ user: "admin", token: "faketoken12345" });
            } else {
                reject("Invalid username or password");
            }
        }, 1000);
    });
};
