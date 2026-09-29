import {request} from "@playwright/test";

class APIUtils{

    constructor(apiContext, loginData) {
        this.apiContext = apiContext;
        this.loginData = loginData;
    }

    async tokenGenerator() {

        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginData
            }
        );
        const loginResponseJSON = await loginResponse.json();
        const token = loginResponseJSON.token;
        console.log(token);
        return token;
    }

    async placeOrder(orderData){
        const resp = {};
        resp.token = await this.tokenGenerator();
        const placeOrderContext = await request.newContext();
        const orderResponse = await placeOrderContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: orderData,
                headers: {
                    'Authorization': resp.token,
                    'Content-Type': 'Application/json'
                },
            })
        const orderResponseJSON = await orderResponse.json();
        resp.orderID = orderResponseJSON.orders[0];
        return resp;
    }
}
module.exports = {APIUtils};