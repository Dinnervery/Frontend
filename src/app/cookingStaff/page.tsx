"use client";

import styled from "@emotion/styled";
import LogoutButton from "@/components/LogoutButton";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const Page = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;

    background: linear-gradient(287.56deg, #FDF5E6 0%, #FFFFFF 100%);
`;

const Logo = styled.img`
    position: absolute;
    top: 5%;
    left: 5%;
    width: 270px;
    height: auto;

    z-index: 1;
`;

const MenuWrapper = styled.div`
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%); 
    display: flex;
    gap: 50px;

    z-index: 999;
`;

const MenuButton = styled(Link, {
    shouldForwardProp: (prop) => prop !== "$active",   
})<{ $active?: boolean }>`
    font-size: 1.7rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    font-family: ${inter.style.fontFamily};
    
    color: #3F2316;
    opacity: ${(props) => (props.$active ? 1.0 : 0.6)};

    &:hover {
        opacity: 1.0;
    }
`;

const MainWrap = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const StepRow = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

const StepItem = styled.div`
    position: relative;
    width: 35px;   /* 원 크기 기준 */
    height: 90px;  /* 원 + 텍스트 들어갈 높이 */
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 2px;
`;

const StepCircle = styled.button<{ $active: boolean; $done: boolean }>`
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    border: 2px solid #3f2316;
    cursor: pointer;
    background-color: ${({ $active, $done }) => $active ? "#ffbfbe" : $done ? "#3F2316" : "#ffffff"};
    color: ${({ $done }) => ($done ? "#ffffff" : "#3F2316")};
    
    font-size: 20px;
    font-weight: bold;
    font-family: "SOYO";
`;

const StepLabel = styled.span`
    position: absolute;
    top: 67px;
    left: 50%;
    transform: translateX(-50%);

    color: #3f2316;

    font-size: 18px;
    font-family: ${inter.style.fontFamily};
    font-weight: 700;
`;

const StepLine = styled.div<{ $solid: boolean }>`
    width: 50px;
    border-top: ${({ $solid }) =>
        $solid ? "2px solid #3f2316" : "2px dashed #3f2316"};
`;

const InfoBox = styled.div`
    width: 380px;
    height: 355px;
    padding: 20px 30px;

    background: #ffffff;
    color: #111;
    box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.15);
    border-radius: 10px;

    z-index: 1;

    font-family: ${inter.style.fontFamily};
`;

const BoxHeaderRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 7px;
`;

const OrderNumber = styled.div`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background: #3F2316;
    color: #FFFFFF;

    font-weight: 700;
    font-size: 18px;
`;

const TimeRow = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    color: #b54450;
    
    font-weight: 700;
    font-size: 16px;
`;

const TimeIcon = styled.span`
    font-size: 18px;
`;

const Divider = styled.div`
    height: 1px;
    background: #e5e5e5;
`;

const Section = styled.div`
    padding: 10px 0;
`;

const SectionTitle = styled.div`
    margin-bottom: 5px;

    font-size: 1.1rem;
    font-weight: 700;
    font-family: "SOYO";
`;

const ItemRow = styled.div`
    display: flex;
    align-items: center;
    font-size: 1rem;
`;

const ItemName = styled.div`
    flex: 1;
`;

const ItemQty = styled.div`
    width: 40px;
    text-align: right;
`;

const LoadingText = styled.div`
    font-size: 1.1rem;
    font-family: ${inter.style.fontFamily};
    color: #3f2316;
`;

const ErrorText = styled.div`
    font-size: 1.1rem;
    font-family: ${inter.style.fontFamily};
    color: #b54450;
`;

const EmptyMessage = styled.div`
    font-size: 1.3rem;
    font-family: ${inter.style.fontFamily};
    color: #3f2316;
`;

// ========== API 응답 예시 ==========
type OrderItemOption = {
    optionId: number;
    name: string;
    quantity: number;
};

type OrderItem = {
    menuId: number;
    name: string;
    quantity: number;
    options: OrderItemOption[];
    styleId: number;
    styleName: string;
};

type Order = {
    orderId: number;
    status: "REQUESTED" | "COOKING"; 
    deliveryTime: string;
    orderItems: OrderItem[];
};

type OrdersResponse = {
    orders: Order[];
};

type Step = 1 | 2 | 3;

export default function CookingStaffPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!API_URL) {
                setError("API URL이 설정되어 있지 않습니다.");
                setLoading(false);
                return;
            }

            const token =
            typeof window !== "undefined"
                ? localStorage.getItem("staffToken")
                : null;

            if (!token) {
                setError("로그인 정보가 없습니다.");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${API_URL}/orders/cooking`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data: OrdersResponse = await res.json();

                if (!res.ok) {
                    setError(data as any as string || "주문을 불러오지 못했습니다.");
                    setLoading(false);
                    return;
                }

                setOrders(data.orders ?? []);
            } catch (e: any) {
                console.error("fetch orders error:", e);
                setError("주문을 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const hasOrders = !loading && !error && orders.length > 0;
    const currentOrder = hasOrders ? orders[0] : null;
    const firstItem = currentOrder?.orderItems[0];

    const getStepFromStatus = (
        status: Order["status"] | undefined
    ): Step => {
        if (status === "COOKING") return 2;
        return 1;
    };

    const step = getStepFromStatus(currentOrder?.status);

    return (
        <Page>
            <Logo src="/Logo-brown.svg" alt="logo" />
            <LogoutButton color="#3F2316" />

            <MenuWrapper>
                <MenuButton href="/dinner" >재고 관리</MenuButton>
                <MenuButton href="/cookingStaff" $active={true}>주문 내역</MenuButton>
            </MenuWrapper>

            <MainWrap>
                {loading && <LoadingText>주문을 불러오는 중입니다...</LoadingText>}

                {!loading && error && <ErrorText>{error}</ErrorText>}

                {!loading && !error && orders.length === 0 && (
                    <EmptyMessage>주문이 없습니다 🤗</EmptyMessage>
                )}

                {hasOrders && currentOrder && firstItem && (
                    <>
                        {/* 단계 */}
                        <StepRow>
                            <StepItem>
                                <StepCircle
                                    $active={step === 1}
                                    $done={step > 1}
                                >
                                    1
                                </StepCircle>
                                <StepLabel>requested</StepLabel>
                            </StepItem>

                            <StepLine $solid={step >= 2} />

                            <StepItem>
                                <StepCircle
                                    $active={step === 2}
                                    $done={step > 2}
                                >
                                    2
                                </StepCircle>
                                <StepLabel>cooking</StepLabel>
                            </StepItem>

                            <StepLine $solid={step === 3} />

                            <StepItem>
                                <StepCircle
                                    $active={step === 3}
                                    $done={false}
                                >
                                    3
                                </StepCircle>
                                <StepLabel>done</StepLabel>
                            </StepItem>
                        </StepRow>

                        {/* 박스 */}
                        <InfoBox>
                            <BoxHeaderRow>
                                <OrderNumber>{currentOrder.orderId}</OrderNumber>

                                <TimeRow>
                                    <TimeIcon>⏰</TimeIcon>
                                    <span>{currentOrder.deliveryTime}</span>
                                </TimeRow>
                            </BoxHeaderRow>

                            {/* Dinner */}
                            <Section>
                                <SectionTitle>Dinner</SectionTitle>
                                <ItemRow>
                                    <ItemName>{firstItem.name}</ItemName>
                                    <ItemQty>{firstItem.quantity}</ItemQty>
                                </ItemRow>
                            </Section>

                            <Divider />

                            {/* Options */}
                            <Section>
                                <SectionTitle>Option</SectionTitle>
                                {firstItem.options.map((opt) => (
                                    <ItemRow key={opt.optionId}>
                                        <ItemName>{opt.name}</ItemName>
                                        <ItemQty>{opt.quantity}</ItemQty>
                                    </ItemRow>
                                ))}
                            </Section>

                            <Divider />

                            {/* Style */}
                            <Section>
                                <SectionTitle>Style</SectionTitle>
                                <ItemRow>
                                    <ItemName>{firstItem.styleName}</ItemName>
                                    <ItemQty>1</ItemQty>
                                </ItemRow>
                            </Section>
                        </InfoBox>
                    </>
                )}
            </MainWrap>
        </Page>
    );
}