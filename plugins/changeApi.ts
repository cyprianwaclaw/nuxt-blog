import { useAuth } from "@/store/useAuth";

export default defineNuxtPlugin(() => {
    const auth = useAuth();
    const login = auth?.loggedIn as boolean;

    const changeName = {
        changeApi: (endpointName: string) => `${endpointName}`
    };
    if (login) {
        changeName.changeApi = (endpointName: string) => `/logged${endpointName}`;
    }
    return {
        provide: changeName
    };
});
