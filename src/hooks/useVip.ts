"use client";

import { useEffect, useState } from "react";

export type CustomerGrade = "BASIC" | "VIP";

type Customer = {
    customerId: number;
    loginId: string;
    name: string;
    phoneNumber: string;
    grade: CustomerGrade;
    orderCount: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useVip() {
    const [isVip, setIsVip] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const rawCustomerId =
        localStorage.getItem("customerId") || localStorage.getItem("userId");
        if (!rawCustomerId) return;

        const customerId = Number(rawCustomerId);
        if (Number.isNaN(customerId)) return;

        const token = localStorage.getItem("token");
        if (!token || !API_URL) return;

        const fetchCustomer = async () => {
        try {
            const res = await fetch(
            `${API_URL}/auth/customer/${customerId}`,
            {
                method: "GET",
                headers: {
                Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            }
            );

            if (!res.ok) {
            console.error("고객 정보 조회 실패:", res.status);
            return;
            }

            const data: Customer = await res.json();
            if (data.grade === "VIP") {
            setIsVip(true);
            }
        } catch (e) {
            console.error("고객 정보 조회 중 오류:", e);
        }
        };

        fetchCustomer();
    }, []);

    return { isVip };
}
