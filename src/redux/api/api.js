import axios from "axios";


const email = localStorage.getItem('email')


const settings = {
    headers: {
        "Content-Type": "application/json",
    },
};


export const apiInstance = axios.create({
    baseURL: "http://13.50.233.192:8080",
    ...settings

});
apiInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

export const authApi = {
    authentication(values) {
        return apiInstance.post(`authentication`, {
            email: values.email,
            password: values.password,
        });
    },
    registration(values) {
        return apiInstance.post(`registration`, {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            currency: values.currency,
            password: values.password,
            confirmPassword: values.confirmPassword,
        });
    },
    resetPassword(email) {
        return apiInstance.post(`reset-password?email=${email}`);
    },
    recoveryPassword(values) {
        return apiInstance.put(`/change-password/${values.code}?email=${values.email}`, {
            confirmPassword: values.password2,
            password: values.password
        });
    },
    Accounts() {
        return apiInstance.get(`/accounts?email=${email}&size=1000000000`);
    },
};

