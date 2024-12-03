// api/paypalAPI.ts
import axios from "axios";

const host = 'http://localhost:8080/api/v1/paypal';

export const createOrder = async (order: any) => {
    console.log("createOrderLog");

    const response = await axios.post(`${host}/orders`,
        {ono: order.ono, currency: order.currency}, // 두 번째 인자: 요청 본문
        { headers: { "Content-Type": "application/json" } } // 세 번째 인자: 설정
    );
    console.log(response.data);
    return response.data;
}

export const captureOrder = async (orderID: any) => {

    console.log(orderID);

    const response = await axios.post(`${host}/orders/${orderID}/capture`, null, { // null을 사용해 빈 body 전달
        headers: { "Content-Type": "application/json" }
    });
    console.log("captureOrderLog");
    console.log(response.data);
    return response.data;
}

