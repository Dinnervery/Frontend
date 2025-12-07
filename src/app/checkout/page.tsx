"use client";

import styled from "@emotion/styled";
import { Inter } from "next/font/google";
import LogoutButton from "@/components/LogoutButton";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const Page = styled.div`
    position: relative;
    min-height: 100vh;

    background: linear-gradient(287.56deg, #FDF5E6 0%, #FFFFFF 100%);
`

const LeftArea = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 430px;
    height: 100%;
    display: flex;
    flex-content: center;
    align-items: center;

    background: #3F2316;
    z-index: 0;
`

const Title = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: #FDF5E6;

    font-size: 1.5rem;
    font-weight: 700;
    font-family: ${inter.style.fontFamily};
`;

const Logo = styled.img`
    position: absolute;
    top: 5%;
    left: 5%;
    width: 270px;
    height: auto;

    z-index: 1;
`;

const RightContent = styled.div`
    position: absolute;
    top: 50%;
    right: 20%;
    transform: translateY(-50%);

    z-index: 1;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    color: #3F2316;
`;

const BackButton = styled.img`
    width: 20px;
    height: auto;
    cursor: pointer;

    &:hover {
        opacity: 0.6;
    }
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    font-size: 18px;
    margin-bottom: 6px;
`;

const Input = styled.input`
    padding: 10px 0;
    margin: 0 0 10px 0;

    border: none;
    border-bottom: 1px solid #3F2316;
    background: transparent;

    font-size: 18px;
    font-family: ${inter.style.fontFamily};
    outline: none;
`;

const TimeField = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`;

const TimeSelect = styled.select<{ $selected: boolean }>`
    padding: 10px 0;
    margin: 0 0 10px 0;

    outline: none;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #3F2316;
    background: transparent;
    color: ${({ $selected }) =>
        $selected ? "#3F2316" : "rgba(63, 35, 22, 0.2)"};
    cursor: pointer;

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    font-size: 18px;
    font-family: ${inter.style.fontFamily};
`;

const TimeArrow = styled.img`
    position: absolute;
    right: 0;
    bottom: 20px;
    width: 18px;
    height: auto;
    pointer-events: none; 
`;

const PayButton = styled.button<{ $disabled?: boolean }>`
    align-self: flex-end;
    padding: 12px 40px;

    border: none;
    border-radius: 10px;
    background: #3F2316;
    color: #fff;

    font-size: 16px;
    font-family: ${inter.style.fontFamily};
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
    opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};
`;

// ========== API ==========
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type OrderResponse = {
    orderId: number;
    customerId: number;
    status: string;
    totalPrice: number;
    orderItems: any[];
    createdAt: string;
    deliveryTime: string;
};

export default function CheckoutPage() {
    const router = useRouter();

    const [address, setAddress] = useState("");
    const [card, setCard] = useState("");
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);

    const isDisabled = !address || !card || !time || loading;

    const [timeOptions, setTimeOptions] = useState<string[]>([]);
    const selectRef = useRef<HTMLSelectElement | null>(null);
    // const [orderAvailable, setOrderAvailable] = useState(true);

    useEffect(() => {
        const now = new Date();

        // const start = new Date(now);
        // start.setHours(15, 30, 0, 0); // 15:30

        // const end = new Date(now);
        // end.setHours(23, 59, 0, 0); // 22:00

        // // 주문 불가
        // if (now < start || now >= end) {
        //     setOrderAvailable(false);
        //     setTimeOptions([]);
        //     setTime("");
        //     return;
        // }

        // setOrderAvailable(true);

        // 현재 시간 + 30분
        let first = new Date(now.getTime() + 30 * 60 * 1000);

        // 10분 단위로 올림
        const minutes = first.getMinutes();
        const remainder = minutes % 10;
        if (remainder !== 0) {
            first.setMinutes(minutes + (10 - remainder), 0, 0);
        } else {
            first.setSeconds(0, 0);
        }

        // 15:30보다 빠르면 15:30부터
        // if (first < start) first = start;

        const options: string[] = [];
        let current = first;

        const formatTime = (d: Date) => {
            const h = d.getHours().toString().padStart(2, "0");
            const m = d.getMinutes().toString().padStart(2, "0");
            return `${h}:${m}`;
        };

        // while (current <= end) {
        //     options.push(formatTime(current));
        //     current = new Date(current.getTime() + 10 * 60 * 1000); // 10분씩 증가
        // }

        for (let i = 0; i < 30; i++) {
            options.push(formatTime(current));
            current = new Date(current.getTime() + 10 * 60 * 1000);
        }

        setTimeOptions(options);
        setTime(""); // 사용자가 직접 선택
    }, []);

    const handlePayClick = async() => {
        if (isDisabled){
            alert("주문 정보를 모두 입력해주세요.");
            return;
        }

        const token = localStorage.getItem("token");
        const customerId = localStorage.getItem("customerId");

        if (!token) {
            alert("로그인이 필요합니다.");
            router.push("/login");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerId: Number(customerId),
                    address,
                    cardNumber: card,
                    deliveryTime: time,
                }),
            });

            if (!response.ok) {
                const text = await response.text();
                console.error("Order API error:", text);
                alert("결제에 실패했습니다.");
                return;
            }

            const data: OrderResponse = await response.json();
            console.log("order response:", data);

            alert(`결제가 완료되었습니다 🥰`);
            router.push("/dinner");
        } catch (error) {
            console.error(error);
            alert("결제 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Page>
            <LeftArea>
                <Title>주문 정보</Title>
            </LeftArea>
            <Logo src="/Logo-beige.svg" alt="logo" />
            <LogoutButton color="#3F2316" />

            <RightContent>
                <BackButton
                    src="/Prev-arrow.svg"
                    alt="뒤로가기"
                    onClick={() => router.back()}
                />

                <Form>
                    <Field>
                        <Label htmlFor="address">주소</Label>
                        <Input
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder=""
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="card">카드 번호</Label>
                        <Input
                            id="card"
                            value={card}
                            onChange={(e) => setCard(e.target.value)}
                            placeholder=""
                        />
                    </Field>

                    <TimeField>
                        <Label htmlFor="time">배달 시간</Label>
                            <TimeSelect
                                id="time"
                                ref={selectRef}
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                $selected={time !== ""}
                            >
                                <option value="">시간 선택</option>
                                {timeOptions.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                        </TimeSelect>

                        <TimeArrow
                            src="Dropdown.svg" alt="dropdown"
                        />
                    </TimeField>
                </Form>

                <PayButton
                    $disabled={isDisabled}
                    disabled={isDisabled}
                    onClick={handlePayClick}
                >
                    {loading ? "결제 중..." : "결제하기"}
                </PayButton>
            </RightContent>
        </Page>
    );
}