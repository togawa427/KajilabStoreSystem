import { BuyProduct } from "./app/features/payment/type";
import { Payment, Product } from "./types/json";

type CreatePaymentType = {
    pay_at: string;
    method: string,
    user_number: string,
    products: {
        id: number;
        quantity: number;
        unit_price: number,
    }[],
}

export const getPayments = async (): Promise<Payment[]> => {
    const res = await fetch("http://localhost:8080/api/v1/products/buy/logs?limit=5", {cache: "no-store"})  // SSR
    console.log(res)

    const payments = await res.json()
    return payments
}

export const getProductByBarcode = async (barcode: number): Promise<Product> => {
    const res = await fetch(`http://localhost:8080/api/v1/products/134912341232`, {cache: "no-store"})
    //const res = await fetch(`http://localhost:8080/api/v1/products/${barcode}`, {cache: "no-store"})
    console.log(res)

    const product = await res.json()
    return product
}

export const deletePayment = async (id: number) => {
    const res = await fetch(`http://localhost:8080/api/v1/products/buy/${id}`, {method: "DELETE"});

    if(res.ok){
        console.log("削除に成功")
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return
}

export const createPayment = async (buyProducts: BuyProduct[], method: string) => {
    const currentDatetime = new Date().toISOString();
    const requestPayment:CreatePaymentType = {
        pay_at: currentDatetime,
        method: method,
        user_number: "",
        products:[
            {
                id: 3,
                quantity: 2,
                unit_price: 120,
            }
        ]
    }

    const res = await fetch(`http://localhost:8080/api/v1/products/buy`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayment)
    });
}