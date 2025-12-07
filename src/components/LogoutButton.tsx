"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["700"],
});

const Button = styled.button<{ $color?: string }>`
    position: absolute;
    top: 4%;
    right: 4%;
    background: none;
    border: none;
    padding: 0;

    cursor: pointer;
    background: none;
    color: ${({ $color }) => $color || "white"};

    &:hover {
        opacity: 0.6;
    }

    font-family: ${inter.style.fontFamily};
    font-size: 1.2rem;
    font-weight: 700;

    z-index: 10000;
`;

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CART_DRAFT_KEY = "cartDraft";

export default function LogoutButton({ color }: { color?: string }) {
    const router = useRouter();

    const handleLogout = async () => {
        if (typeof window !== "undefined") {
            const customerId = localStorage.getItem("customerId");
            const token = localStorage.getItem("token");

            // 장바구니 전체 삭제
            if (customerId) {
                try {
                    const res = await fetch(
                        `${API_URL}/cart/${customerId}/items`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token ?? ""}`,
                            },
                            credentials: "include",
                        }
                    );

                    if (!res.ok) {
                        console.error("장바구니 전체 삭제 실패");
                    } else {
                        const data = await res.json();
                        console.log("장바구니 전체 삭제 응답:", data);
                    }
                } catch (e) {
                    console.error("장바구니 전체 삭제 중 에러:", e);
                }
            }
            // 로컬 스토리지 정리
            localStorage.removeItem("customerId");
            localStorage.removeItem("token");
            localStorage.removeItem(CART_DRAFT_KEY);
        }
        router.push("/login");
    };

    return (
        <Button
            $color={color}
            onClick={handleLogout}
        >
            로그아웃
        </Button>
    );
}