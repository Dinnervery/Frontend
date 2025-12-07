"use client";

import styled from "@emotion/styled";
import LogoutButton from "@/components/LogoutButton";
import { useState, useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { gsap } from "gsap";

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

const BoxContainer = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BoxRow = styled.div`
    display: flex;
    gap: 40px;
    align-items: flex-start;
    justify-content: center;
`;

const OrderSet = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const LeftHoverArea = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 150px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 40px;

    background: transparent;
    z-index: 9999;
`;

const RightHoverArea = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 150px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 40px;

    background: transparent;
    z-index: 9999;
`;

const ArrowButton = styled.button<{ $visible: boolean }>`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 999px;
    border: none;
    color: #3F2316;
    cursor: pointer;
    background: transparent;

    opacity: ${(p) => (p.$visible ? 1 : 0)};
    pointer-events: ${(p) => (p.$visible ? "auto" : "none")};
    transition: opacity 0.2s;

    font-size: 4rem;
`;

const PageIndicator = styled.div`
    margin-bottom: 15px;
    font-size: 1.15rem;
    color: #3F2316;
    opacity: 1;
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
    padding: 15px 30px;

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
    margin-bottom: 0px;
`;

const HeaderRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Address = styled.div`
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    color: #3F2316;

    font-size: 14px;
    font-weight: 500;
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
    font-size: 1.3rem;
    font-family: "SOYO";
    color: #3f2316;
`;

const ErrorText = styled.div`
    font-size: 1.3rem;
    font-family: "SOYO";
    color: #b54450;
`;

const EmptyMessage = styled.div`
    font-size: 1.3rem;
    font-family: "SOYO";
    color: #3f2316;
`;

// ========== API ==========
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

type OrderStatus = "COOKED" | "DELIVERING" | "DONE";

type Order = {
    orderId: number;
    status: OrderStatus;
    deliveryTime: string;
    address: string;
    orderItems: OrderItem[];
};

type OrdersResponse = {
    orders: Order[];
};

type Step = 1 | 2 | 3;

export default function DeliveringStaffPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null); 

    const [page, setPage] = useState(0);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const cardsPerPage = 2;

    const boxRowRef = useRef<HTMLDivElement | null>(null);
    const isAnimating = useRef(false);

    const updateOrderStatus = async (
        orderId: number,
        nextStatus: OrderStatus
    ) => {
        const current = orders.find((o) => o.orderId === orderId);
        // 같은 상태면 호출 안 함
        if (!current || current.status === nextStatus) return;

        const token =
            typeof window !== "undefined"
                ? localStorage.getItem("staffToken")
                : null;

        if (!token) {
            setError("로그인 정보가 없습니다.");
            return;
        }

        try {
            setUpdatingOrderId(orderId);

            const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: nextStatus }),
            });

            const data: { orderId: number; status: OrderStatus } =
                await res.json();

            if (!res.ok) {
                console.error("updateOrderStatus error:", data);
                setError("주문 상태를 변경하지 못했습니다.");
                return;
            }

            setError(null);
            setOrders((prev) =>
                prev
                    .map((o) =>
                    o.orderId === orderId ? { ...o, status: nextStatus } : o
                    )
                    .filter((o) => o.status !== "DONE")
            );
        } catch (e) {
            console.error("update delivery status error:", e);
            setError("주문 상태를 변경하지 못했습니다.");
        } finally {
            setUpdatingOrderId(null);
        }
    };

    const getStepFromStatus = (status: Order["status"] | undefined): Step => {
        if (status === "DELIVERING") return 2;
        if (status === "DONE") return 3;
        return 1; 
    };

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);

            try {
                const token =
                typeof window !== "undefined"
                    ? localStorage.getItem("staffToken")
                    : null;

                if (!token) {
                    setError("로그인 정보가 없습니다.");
                    setLoading(false);
                    return;
                }

                const res = await fetch(`${API_URL}/orders/delivery`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data: OrdersResponse = await res.json();

                if (!res.ok) {
                    setError("주문을 불러오지 못했습니다.");
                    setLoading(false);
                    return;
                }

                setOrders(data.orders ?? []);
                setPage(0);
            } catch (e) {
                console.error("fetch delivery orders error:", e);
                setError("주문을 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        if (!boxRowRef.current) return;

        gsap.fromTo(
            boxRowRef.current,
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.25,
                ease: "power2.out",
                onComplete: () => {
                    isAnimating.current = false;
                },
            }
        );
    }, [page]);

    const hasOrders = !loading && !error && orders.length > 0;

    const totalPages = hasOrders
        ? Math.ceil(orders.length / cardsPerPage)
        : 0;

    const currentOrders = hasOrders
        ? orders.slice(
              page * cardsPerPage,
              page * cardsPerPage + cardsPerPage
        )
        : [];

    const handleNextPage = () => {
        if (!hasOrders || totalPages <= 1 || isAnimating.current) return;
        if (page >= totalPages - 1) return;
        if (!boxRowRef.current) return;

        isAnimating.current = true;

        gsap.to(boxRowRef.current, {
            x: -50,
            opacity: 0,
            duration: 0.25,
            ease: "power2.out",
            onComplete: () => {
                setPage((prev) => Math.min(prev + 1, totalPages - 1));
            },
        });
    };

    const handlePrevPage = () => {
        if (!hasOrders || totalPages <= 1 || isAnimating.current) return;
        if (page <= 0) return;
        if (!boxRowRef.current) return;

        isAnimating.current = true;

        gsap.to(boxRowRef.current, {
            x: 50,
            opacity: 0,
            duration: 0.25,
            ease: "power2.out",
            onComplete: () => {
                setPage((prev) => Math.max(prev - 1, 0));
            },
        });
    };

    return (
        <Page>
            <Logo src="/Logo-brown.svg" alt="logo" />
            <LogoutButton color="#3F2316" />

            <MenuWrapper>
                <MenuButton href="/deliveringStaff" $active={true}>배달 내역</MenuButton>
            </MenuWrapper>

            {loading && (
                <MainWrap>
                    <LoadingText>주문을 불러오는 중입니다...</LoadingText>
                </MainWrap>
            )}

            {!loading && error && (
                <MainWrap>
                    <ErrorText>{error}</ErrorText>
                </MainWrap>
            )}

            {!loading && !error && orders.length === 0 && (
                <MainWrap>
                    <EmptyMessage>주문이 없습니다 🤗</EmptyMessage>
                </MainWrap>
            )}

            {hasOrders && (
                <BoxContainer>
                    <InnerContainer>
                        {totalPages > 1 && (
                            <PageIndicator>
                                {page + 1} / {totalPages}
                            </PageIndicator>
                        )}

                        <BoxRow ref={boxRowRef}>
                            {currentOrders.map((order) => {
                                const firstItem = order.orderItems[0];
                                if (!firstItem) return null;

                                const step = getStepFromStatus(order.status);

                                return (
                                    <OrderSet key={order.orderId}>
                                        <StepRow>
                                            <StepItem>
                                                <StepCircle
                                                    $active={step === 1}
                                                    $done={step > 1}
                                                    disabled={updatingOrderId === order.orderId || step > 1}
                                                    onClick={() => updateOrderStatus(order.orderId, "COOKED")}
                                                >
                                                    1
                                                </StepCircle>
                                                <StepLabel>cooked</StepLabel>
                                            </StepItem>

                                            <StepLine $solid={step >= 2} />

                                            <StepItem>
                                                <StepCircle
                                                    $active={step === 2}
                                                    $done={step > 2}
                                                    disabled={updatingOrderId === order.orderId || step > 2}
                                                    onClick={() => updateOrderStatus(order.orderId, "DELIVERING")}
                                                >
                                                    2
                                                </StepCircle>
                                                <StepLabel>delivering</StepLabel>
                                            </StepItem>

                                            <StepLine $solid={step === 3} />

                                            <StepItem>
                                                <StepCircle
                                                    $active={step === 3}
                                                    $done={false}
                                                    disabled={updatingOrderId === order.orderId || step === 3}
                                                    onClick={() => updateOrderStatus(order.orderId, "DONE")}
                                                >
                                                    3
                                                </StepCircle>
                                                <StepLabel>done</StepLabel>
                                            </StepItem>
                                        </StepRow>

                                        {/* 주문 정보 박스 */}
                                        <InfoBox>
                                            <BoxHeaderRow>
                                                <OrderNumber>
                                                    {order.orderId}
                                                </OrderNumber>

                                                <HeaderRight>
                                                    <Address>
                                                        {order.address}
                                                    </Address>

                                                    <TimeRow>
                                                        <TimeIcon>⏰</TimeIcon>
                                                        <span>
                                                            {
                                                                order.deliveryTime
                                                            }
                                                        </span>
                                                    </TimeRow>
                                                </HeaderRight>
                                            </BoxHeaderRow>

                                            {/* Dinner */}
                                            <Section>
                                                <SectionTitle>
                                                    Dinner
                                                </SectionTitle>
                                                <ItemRow>
                                                    <ItemName>
                                                        {firstItem.name}
                                                    </ItemName>
                                                    <ItemQty>
                                                        {firstItem.quantity}
                                                    </ItemQty>
                                                </ItemRow>
                                            </Section>

                                            <Divider />

                                            <Section>
                                                <SectionTitle>
                                                    Option
                                                </SectionTitle>
                                                {firstItem.options.map((opt) => (
                                                    <ItemRow
                                                        key={opt.optionId}
                                                    >
                                                        <ItemName>
                                                            {opt.name}
                                                        </ItemName>
                                                        <ItemQty>
                                                            {opt.quantity}
                                                        </ItemQty>
                                                    </ItemRow>
                                                ))}
                                            </Section>

                                            <Divider />

                                            {/* Style */}
                                            <Section>
                                                <SectionTitle>
                                                    Style
                                                </SectionTitle>
                                                <ItemRow>
                                                    <ItemName>
                                                        {firstItem.styleName}
                                                    </ItemName>
                                                    <ItemQty>1</ItemQty>
                                                </ItemRow>
                                            </Section>
                                        </InfoBox>
                                    </OrderSet>
                                );
                            })}
                        </BoxRow>
                    </InnerContainer>

                    {/* 왼쪽 화살표 */}
                    {totalPages > 1 && page > 0 && (
                        <LeftHoverArea
                            onMouseEnter={() => setShowLeftArrow(true)}
                            onMouseLeave={() => setShowLeftArrow(false)}
                        >
                            <ArrowButton
                                $visible={showLeftArrow}
                                onClick={handlePrevPage}
                                aria-label="이전 주문"
                            >
                                ‹
                            </ArrowButton>
                        </LeftHoverArea>
                    )}

                    {/* 오른쪽 화살표 */}
                    {totalPages > 1 && page < totalPages - 1 && (
                        <RightHoverArea
                            onMouseEnter={() => setShowRightArrow(true)}
                            onMouseLeave={() => setShowRightArrow(false)}
                        >
                            <ArrowButton
                                $visible={showRightArrow}
                                onClick={handleNextPage}
                                aria-label="다음 주문"
                            >
                                ›
                            </ArrowButton>
                        </RightHoverArea>
                    )}
                </BoxContainer>
            )}
        </Page>
    );
}