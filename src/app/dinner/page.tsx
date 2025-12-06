"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const Page = styled.div`
    position: relative; 
    min-height: 100vh;

    background: linear-gradient(287.56deg, #FDF5E6 0%, #FFFFFF 100%);
`;

const ShapeArea = styled.div<{ $mask: string }>`
    position: absolute;
    top: -120px;
    right: 0;
    width: 1000px;
    height: 100%;

    background-color: #3F2316;

    -webkit-mask-image: url(${(p) => p.$mask});
    mask-image: url(${(p) => p.$mask});
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
`;

const Logo = styled.img`
    position: absolute;
    top: 5%;     
    left: 5%;
    width: 270px;
    height: auto;
`;

const MenuWrapper = styled.div`
    position: absolute;
    top: 10%;
    right: 20%;
    display: flex;
    gap: 50px;

    z-index: 999;
`;

const MenuButton = styled(Link, {
    shouldForwardProp: (prop) => prop !== '$active' && prop !== '$disabled',
})<{ $active?: boolean; $disabled ? : boolean }>`
    cursor: ${(p) => (p.$disabled ? "default" : "pointer")};
    color: white;
    opacity: ${(props) => (props.$active ? 1.0 : 0.6)};

    &:hover {
        opacity: ${(p) => (p.$disabled ? 0.6 : 1.0)};
    }

    pointer-events: ${(p) => (p.$disabled ? "none" : "auto")};

    font-family: ${inter.style.fontFamily};
    font-size: 1.7rem;
    font-weight: 700;
    text-decoration: none;
`;

const Card = styled.div`
    position: absolute;
    top: 35%;
    left: 72px;
    display: flex;
    flex-direction: column;
    width: 200px;

    color: #4b3525;

    font-family: ${inter.style.fontFamily};
`;

const Price = styled.div`
    margin-bottom: 7px;

    color: #B54450;   

    font-size: 1.1rem;
    font-weight: 700;
`;

const Title = styled.div`
    margin-bottom: 15px;

    font-size: 1.7rem;
    font-weight: 700;
`;

const Desc = styled.div`
    margin-bottom: 15px;
    white-space: pre-line;

    color: black;

    font-size: 1.15rem;
    font-weight: 400;
`;

const SelectButton = styled.button`
    display: block;
    text-align: center;
    margin-top: 10px;
    padding: 12px 0;

    cursor: pointer;
    border: none;
    border-radius: 30px;
    background: #6B4426;
    color: white;

    &:hover {
        box-shadow: inset 0 0 0 2px #3f2316;
        background: #FFFFFF;
        color: #3f2316;
    }

    font-size: 1.2rem;
    font-weight: 400;
    font-family: ${inter.style.fontFamily};
`;

const Ellipse = styled.div`
    position: absolute;
    top: 50%;
    right: 15%;
    width: 450px;
    height: 300px;

    border-radius: 999px;
    background: transparent;
    border: 3px dashed rgba(255, 255, 255, 0.5);
`;

const EllipseInner = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

type PositionType = "top" | "right" | "bottom" | "left";

const Photo = styled.img<{ $positionType: PositionType; $size: number }>`
    position: absolute;
    width: ${({ $size }) => $size}px;
    height: auto;
    transition: all 2s ease;
    cursor: pointer;

    ${({ $positionType }) =>
        $positionType === "top" &&
        `
        top: 10%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1.05);
        z-index: 3;
    `}

    ${({ $positionType }) =>
        $positionType === "right" &&
        `
        top: 60%;
        right: -5%;
        transform: translate(50%, -50%);
        z-index: 2;
    `}

    ${({ $positionType }) =>
        $positionType === "bottom" &&
        `
        bottom: -10%;
        left: 50%;
        transform: translate(-50%, 50%);
        z-index: 1;
    `}

    ${({ $positionType }) =>
        $positionType === "left" &&
        `
        top: 60%;
        left: -5%;
        transform: translate(-50%, -50%);
        z-index: 2;
    `}
`;

const photos = [
    { id: "cham", src: "/D-cham.png", alt: "D-cham", size: 250 },
    { id: "eng", src: "/D-eng.png", alt: "D-eng", size: 200},
    { id: "fren", src: "/D-fren.png", alt: "D-fren", size: 320},
    { id: "valen", src: "/D-valen.png", alt: "D-valen", size: 260},
];

const PHOTO_MENU_ID: Record<string, number> = {
    valen: 1,
    eng: 2,
    fren: 3,
    cham: 4,
};

const MENUS: Menu[] = [
    { menuId: 1, name: "발렌타인데이 디너", price: 50000 },
    { menuId: 2, name: "잉글리시 디너",   price: 35000 },
    { menuId: 3, name: "프렌치 디너",       price: 42000 },
    { menuId: 4, name: "샴페인 디너",       price: 68000 },
];

const PrevOrderContainer = styled.div<{ $active: boolean }>`
    position: fixed;
    bottom: 0px;
    right: 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    z-index: 1000;
`;

const PrevOrderButton = styled.img`
    width: 200px;
    height: auto;
    margin-right: 50px;
    cursor: pointer;
    display: block;
    transition: transform 0.3s ease;
    z-index: 888;

    &:hover {
        transform: scale(1.01);
    }
`;

const PrevOrderBox = styled.div<{ $open: boolean}>`
    width: 300px;
    height: ${(p) => (p.$open ? "450px" : "0px")}; 
    margin-top: ${(p) => (p.$open ? "-25px" : "0px")};
    padding: ${(p) => (p.$open ? "35px 15px 30px 15px" : "0 15px")};
    overflow: hidden;
    z-index: 777;

    background: #FDF5E6;
    color: #4b3525;
    border-radius: 10px 10px 0px 0px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    border: ${(p) => (p.$open ? "4px solid #4b3525;" : "4px solid #4b3525;")}; 

    transition:
        height 0.4s ease,
        padding 0.4s ease,
        margin-top 0.4s ease,
        border 0.4s ease;

    font-family: ${inter.style.fontFamily};
    font-size: 13px;
`;

const PrevOrderList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 12px;
`;

const PrevOrderItem = styled.div<{ $variant: "pink" | "brown" }>`
    width: 100%;
    padding: 10px 14px 8px 14px;

    border-radius: 10px;
    border: 2px solid
        ${(p) => (p.$variant === "pink" ? "#FFBFBE" : "#3F2316")};
    background: white;

    font-family: ${inter.style.fontFamily};
    color: #3f2316;
`;

const EmptyState = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;

    color: #3f2316;

    font-size: 15px;    
    font-weight: 700;
    text-align: center;
    font-family: "SOYO";
`;

const ItemTopRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
`;

const ItemDate = styled.span`
    font-weight: 400;

    font-size: 14px;
`;

const ItemPrice = styled.span`
    color: #B54450;

    font-weight: 400;
    font-size: 13px;
`;

const ItemDesc = styled.div`
    white-space: pre-line;
    line-height: 1.4;
    margin-bottom: 4px;
    font-size: 14px;
`;

const ItemBottomRow = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const ItemStatus = styled.span`
    font-size: 12px;
    color: rgba(63, 35, 22, 0.6);
`;

const Overlay = styled.div<{ $active: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(1px);

    opacity: ${(p) => (p.$active ? 1 : 0)};
    pointer-events: ${(p) => (p.$active ? "auto" : "none")};

    transition: opacity 0.3s ease;

    z-index: 1000; 
`;

// ========== API 응답 ==========
const API_URL = process.env.NEXT_PUBLIC_API_URL

type Menu = {
    menuId: number;
    name: string;
    price: number;
};

const MENU_DESC: Record<number, string> = {
    1: "스테이크, 와인 1잔,\n하트/큐피드 접시, 냅킨",
    2: "베이컨, 바게트 1개,\n스테이크, 에그 스크램블",
    3: "샐러드, 스테이크, 와인 1잔,\n커피",
    4: "(2인) 바게트 4개,\n샴페인 1병, 스테이크,\n와인, 커피 1포트",
};

type OrderStatus = "COOKING" | "DELIVERING" | "DONE";

type OrderOption = {
    optionId: number;
    name: string;
};

type Order = {
    orderId: number;
    orderDate: string;
    status: OrderStatus; // "COOKING" | "DELIVERING" | "DONE"
    deliveryTime?: string; // done 누른 시간
    totalPrice: number;
    orderItems: string;
    options: OrderOption[];
};

const CART_DRAFT_KEY = "cartDraft";

type CartDraft = {
    menuId: number;
    optionIds: number[];
    servingStyleId: number | null;
    quantity: number;
};

export default function DinnerPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevOrderActive, setPrevOrderActive] = useState(false);

    const menus = MENUS;
    const loading = false;
    const error = null;

    const currentPhoto = photos[activeIndex];
    const currentMenuId = currentPhoto ? PHOTO_MENU_ID[currentPhoto.id] : undefined;
    const activeMenu = currentMenuId
        ? menus.find((menu) => menu.menuId === currentMenuId)
        : undefined;
    const desc = activeMenu ? MENU_DESC[activeMenu.menuId] : "";

    const [orders, setOrders] = useState<Order[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [ordersError, setOrdersError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const customerId = 1;
                const res = await fetch(
                    `${API_URL}/menus?customerId=${customerId}`,
                    { credentials: "include" }
                );

                if (!res.ok) {
                    throw new Error("메뉴 조회 실패");
                }

                const data = await res.json();
                setOrders(data.orders ?? []);
            } catch (e: any) {
                console.error(e);
                setOrdersError(e?.message ?? "오류가 발생했습니다.");
            } finally {
                setOrdersLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const router = useRouter();
    const positionOrder: PositionType[] = ["top", "right", "bottom", "left"];

    const handleSelectDinner = () => {
        if (!activeMenu) return;

        const draft: CartDraft = {
            menuId: activeMenu.menuId,
            optionIds: [],
            servingStyleId: null,
            quantity: 1,
        };
        localStorage.setItem(CART_DRAFT_KEY, JSON.stringify(draft));
        router.push(`/option?dinner=${currentPhoto.id}`);
    };


    const handlePrevOrderClick = () => {
        setPrevOrderActive((prev) => !prev); 
    };

    return (
        <Page>
            <Overlay $active={prevOrderActive} onClick={() => setPrevOrderActive(false)} />
            <ShapeArea $mask="/Bg_shape_3.svg">
                <Ellipse>
                    <EllipseInner>
                        {photos.map((photo, index) => {
                            const relativeIndex = (index - activeIndex + photos.length) % photos.length;
                            const positionType = positionOrder[relativeIndex];

                            return (
                                <Photo
                                    key={photo.src}
                                    src={photo.src}
                                    alt={photo.alt}
                                    $positionType={positionType}
                                    $size={photo.size}
                                    onClick={() => {
                                        if (index !== activeIndex) setActiveIndex(index);
                                    }}
                                />
                            );
                        })}
                    </EllipseInner>
                </Ellipse>
            </ShapeArea>

            <Logo src="/Logo-brown.svg" alt="logo" />
            <LogoutButton />

            <PrevOrderContainer $active={prevOrderActive}>
                <PrevOrderButton
                    src="/Prev-order.svg"
                    alt="previous order"
                    onClick={handlePrevOrderClick}
                />
                <PrevOrderBox $open={prevOrderActive}>
                    내역 클릭 시, 해당 메뉴 및 옵션으로 재주문됩니다.

                    {ordersLoading && <EmptyState>주문 내역 불러오는 중...</EmptyState>}
                    {ordersError && !ordersLoading && <EmptyState>오류: {ordersError}</EmptyState>}
                    {!ordersLoading && !ordersError && orders.length === 0 && (
                        <EmptyState>이전 주문 내역이 없습니다 😢</EmptyState>
                    )}

                    {!ordersLoading && !ordersError && orders.length > 0 && (
                        <PrevOrderList>
                        {orders.map((order) => {
                            const variant: "pink" | "brown" = order.status === "DONE" ? "brown" : "pink";
                            return (
                            <PrevOrderItem key={order.orderId} $variant={variant}>
                                <ItemTopRow>
                                <ItemDate>{order.orderDate}</ItemDate>
                                <ItemPrice>₩{order.totalPrice.toLocaleString()}</ItemPrice>
                                </ItemTopRow>

                                <ItemDesc>
                                {order.orderItems}
                                {order.options?.length ? `\n${order.options.map((o) => o.name).join(", ")}` : ""}
                                </ItemDesc>

                                {order.status === "DONE" && order.deliveryTime && (
                                <ItemBottomRow>
                                    <ItemStatus>{order.deliveryTime} 배달 완료</ItemStatus>
                                </ItemBottomRow>
                                )}
                            </PrevOrderItem>
                            );
                        })}
                        </PrevOrderList>
                    )}
                    </PrevOrderBox>
            </PrevOrderContainer>

            <MenuWrapper>
                <MenuButton href="/dinner" $active={true}>Dinner</MenuButton>
                <MenuButton href="/option" $disabled={true}>Option</MenuButton>
                <MenuButton href="/style" $disabled={true}>Style</MenuButton>
                <MenuButton href="/cart" $disabled={true}>Cart</MenuButton>
            </MenuWrapper>

            <Card>
                <Price>
                    {activeMenu
                        ? `₩${activeMenu.price.toLocaleString()}`
                        : "가격"}
                </Price>

                <Title>{activeMenu ? activeMenu.name : "디너"}</Title>

                <Desc>
                    {loading && "메뉴 불러오는 중..."}
                    {error && !loading && `오류: ${error}`}
                    {!loading && !error && !activeMenu && "등록된 디너가 없습니다."}
                    {!loading && !error && activeMenu && (desc || "설명 준비 중...")}
                </Desc>

                <SelectButton type="button" onClick={handleSelectDinner} disabled={!activeMenu}>
                    디너 선택
                </SelectButton>
            </Card>
        </Page>
    );
}