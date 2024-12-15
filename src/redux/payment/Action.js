import api from "@/config/api";

export const createPayment = ({ planType, jwt }) => async (dispatch) => {
    try {
        const { data } = await api.post(`/api/payments/${planType}`);
        if (data.paymentLinkUrl) {
            window.location.href = data.paymentLinkUrl;
        }
    } catch (error) {
        console.log("error = ", error);
    }
};
