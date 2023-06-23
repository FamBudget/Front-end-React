import axios from "axios";
import { formatDate } from "../../components";

const settings = {
  headers: {
    "Content-Type": "application/json",
    "X-Client-Platform": "REACT",
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
  getAccounts(email) {
    return apiInstance.get(`/accounts?email=${email}&size=1000000000`);
  },
  addAccount(email, { createdOn, currency, iconNumber, name, startAmount }) {
    return apiInstance.post(`/accounts?email=${email}`, {
      startAmount,
      createdOn: createdOn + " " + "00:00:00",
      currency,
      iconNumber,
      name,
    });
  },
  getMoving(email, { endDate, startDate, sort }) {
    const formatEndDate = formatDate(endDate) + " " + "23:59:59";
    const formatStartDate = formatDate(startDate) + " " + "00:00:00";
    return apiInstance.get(
      `/operations/moving?email=${email}&sort=${sort}&startDate=${formatStartDate}&endDate=${formatEndDate}`
    );
  },
  addExpense(email, accountId, amount, categoryId, createdOn, description, id) {
    return apiInstance.post(`operations/expense?email=${email}`, {
      accountId,
      amount,
      categoryId,
      createdOn: createdOn + "" + "00:00:00",
      description,
      id,
    });
  },
  getExpenses(email, { endDate, startDate, sort }) {
    const formatEndDate = formatDate(endDate) + " " + "23:59:59";
    const formatStartDate = formatDate(startDate) + " " + "00:00:00";
    return apiInstance.get(
      `/operations/expense?email=${email}&sort=${sort}&startDate=${formatStartDate}&endDate=${formatEndDate}`
    );
  },
  getExpenseCategory(email) {
    return apiInstance.get(`/categories/expense?email=${email}`);
  },
};
