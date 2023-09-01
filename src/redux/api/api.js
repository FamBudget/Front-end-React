import axios from "axios";
import {formatDate} from "../../components";

const settings = {
    headers: {
        "Content-Type": "application/json",
        "X-Client-Platform": "REACT",
        "Access-Control-Allow-Origin": "true"
    },
};

export const apiInstance = axios.create({
    baseURL: "http://13.50.233.192:8080",
    ...settings,
});
apiInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
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
        return apiInstance.put(
            `/change-password/${values.code}?email=${values.email}`,
            {
                confirmPassword: values.confirmPassword,
                password: values.password,
            }
        );
    },
    getUserInfo(email) {
        return apiInstance.get(
            `/users?email=${email}`
        )
    },
    deleteUser(email) {
        return apiInstance.delete(
            `/users?email=${email}`
        )
    },
    changePassword(email, {confirmPassword, password}) {
        return apiInstance.put(
            `/users/change-password?email=${email}`, {
                confirmPassword, password
            }
        )
    },
    editUserInfo(email, values) {
        return apiInstance.put(
            `/users?email=${email}`,
            {
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
            }
        )
    },
    getAccounts(email) {
        return apiInstance.get(`/accounts?email=${email}&size=1000000000`);
    },
    addAccount(email, {startAmount, createdOn, currency, iconNumber, name}) {
        return apiInstance.post(`/accounts?email=${email}`, {
            startAmount,
            createdOn,
            currency,
            iconNumber,
            name,
        });
    },
    editAccount(email, {startAmount, createdOn, id, iconNumber, name}) {
        return apiInstance.put(`/accounts?email=${email}`, {
            startAmount,
            createdOn,
            id,
            iconNumber,
            name,
        });
    },
    deleteAccount(email, value) {
        return apiInstance.delete(`/accounts/${value}?email=${email}`)
    },

    getMoving(email, {endDate, startDate, sort, sortDesc}) {
        const formatEndDate = formatDate(endDate);
        const formatStartDate = formatDate(startDate);
        return apiInstance.get(
            `/operations/moving?email=${email}&sort=${sort}&startDate=${formatStartDate}&endDate=${formatEndDate}&sortDesc=${sortDesc}&size=100000`
        );
    },
    addMoving(
        email,
        {accountFromId, accountToId, amount, createdOn, description}
    ) {
        return apiInstance.post(`/operations/moving?email=${email}`, {
            accountFromId,
            accountToId,
            amount,
            createdOn,
            description,
        });
    },
    addExpense(
        email,
        {accountId, amount, categoryId, createdOn, description, id}
    ) {
        return apiInstance.post(`operations/expense?email=${email}`, {
            accountId,
            amount,
            categoryId,
            createdOn,
            description,
            id,
        });
    },
    addIncome(
        email,
        {accountId, amount, categoryId, createdOn, description}
    ) {
        return apiInstance.post(`operations/income?email=${email}`, {
            accountId,
            amount,
            categoryId,
            createdOn,
            description
        });
    },
    updateIncome(
        email,
        {accountId, amount, categoryId, createdOn, description, id}
    ) {
        return apiInstance.put(`operations/income?email=${email}`, {
            accountId,
            amount,
            categoryId,
            createdOn,
            description,
            id
        });
    },
    updateExpense(
        email,
        {accountId, amount, categoryId, createdOn, description, id}
    ) {
        return apiInstance.put(`operations/expense?email=${email}`, {
            accountId,
            amount,
            categoryId,
            createdOn,
            description,
            id
        });
    },
    deleteIncome(email, value) {
        return apiInstance.delete(
            `/operations/income/${value}?email=${email}`
        );
    },
    deleteExpense(email, value) {
        return apiInstance.delete(
            `/operations/expense/${value}?email=${email}`
        );
    },
    getExpenses(email, {endDate, startDate, sort, sortDesc}) {
        const formatEndDate = formatDate(endDate);
        const formatStartDate = formatDate(startDate);
        return apiInstance.get(
            `/operations/expense?email=${email}&sort=${sort}&startDate=${formatStartDate}&endDate=${formatEndDate}&sortDesc=${sortDesc}&size=100000`
        );
    },
    getIncomes(email, {endDate, startDate, sort, sortDesc}) {
        const formatEndDate = formatDate(endDate);
        const formatStartDate = formatDate(startDate);
        return apiInstance.get(
            `/operations/income?email=${email}&sort=${sort}&startDate=${formatStartDate}&endDate=${formatEndDate}&sortDesc=${sortDesc}&size=100000`
        );
    },
    getExpenseCategories(email) {
        return apiInstance.get(`/categories/expense?email=${email}`);
    },
    getIncomeCategories(email) {
        return apiInstance.get(`/categories/income?email=${email}`);
    },
    addExpenseCategories(email, {iconNumber, name}) {
        return apiInstance.post(`/categories/expense?email=${email}`, {
            iconNumber, name
        });
    },
    editExpenseCategories(email, {iconNumber, name, id}) {
        return apiInstance.put(`/categories/expense?email=${email}`, {
            iconNumber, name, id
        });
    },
    deleteExpenseCategories(email, value) {
        return apiInstance.delete(`/categories/expense/${value}?email=${email}`);
    },

    addIncomeCategories(email, {iconNumber, name}) {
        return apiInstance.post(`/categories/income?email=${email}`, {
            iconNumber, name
        });
    },
    editIncomeCategories(email, {iconNumber, name, id}) {
        return apiInstance.put(`/categories/income?email=${email}`, {
            iconNumber, name, id
        });
    },
    deleteIncomeCategories(email, value) {
        return apiInstance.delete(`/categories/income/${value}?email=${email}`);
    },

};
