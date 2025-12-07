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

const MenuButton = styled.span<{ $active?: boolean; }>`
    cursor: default;
    color: white;
    opacity: ${(props) => (props.$active ? 1.0 : 0.6)};

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
    z-index: 777;

    overflow-y: ${(p) => (p.$open ? "auto" : "hidden")};
    overflow-x: hidden;

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

const PrevOrderItem = styled.div<{ $variant: "pink" | "brown"; $disabled?: boolean }>`
    width: 100%;
    padding: 10px 14px 8px 14px;

    border-radius: 10px;
    border: 2px solid
        ${(p) => (p.$variant === "pink" ? "#FFBFBE" : "#3F2316")};
    background: white;
    cursor: ${(p) => (p.$disabled ? "default" : "pointer")};
    transition: opacity 0.2s ease;
    color: #3f2316;
    opacity: ${(p) => (p.$disabled ? 0.6 : 1)};

    font-family: ${inter.style.fontFamily};

    &:hover {
        background: ${(p) => (p.$disabled ? "white" : "#FDF5E6")};
    }
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

const MENUS: Menu[] = [
    { menuId: 1, name: "발렌타인 디너", price: 50000 },
    { menuId: 2, name: "잉글리시 디너",   price: 35000 },
    { menuId: 3, name: "프렌치 디너",       price: 42000 },
    { menuId: 4, name: "샴페인 디너",       price: 68000 },
];

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

type Style = {
    id: string;
    backendId: number;
    backendName: string;
    name: string;
    desc: string;
    price: number;
    src: string;
    size: number;
};

const STYLES: Style[] = [
    {
        id: "simple",
        backendId: 1,
        backendName: "SIMPLE",
        name: "심플 스타일",
        desc: "플라스틱 접시/쟁반/컵/잔, 종이 냅킨",
        price: 0,
        src: "/S-simple.png",
        size: 220,
    },
    {
        id: "delux",
        backendId: 3,
        backendName: "DELUXE",
        name: "디럭스 스타일",
        desc: "꽃병, 도자기 접시/컵,\n나무 쟁반, 유리잔,\n린넨 냅킨",
        price: 10000,
        src: "/S-delux.png",
        size: 240,
    },
    {
        id: "grand",
        backendId: 2,
        backendName: "GRAND",
        name: "그랜드 스타일",
        desc: "도자기 접시/컵, 나무 쟁반, 플라스틱 잔, 면 냅킨",
        price: 5000,
        src: "/S-grand.png",
        size: 240,
    },
];

type OptionMeta = {
    optionId: number;
    name: string;
    price: number;
    defaultQty: number;
};

const OPTION_META: OptionMeta[] = [
    { optionId: 1, name: "스테이크", price: 15000, defaultQty: 1 },
    { optionId: 2, name: "와인", price: 8000, defaultQty: 1 },
    { optionId: 3, name: "에그 스크램블", price: 5000, defaultQty: 1 },
    { optionId: 4, name: "베이컨", price: 4000, defaultQty: 1 },
    { optionId: 5, name: "바게트빵", price: 3000, defaultQty: 1 },
    { optionId: 6, name: "커피", price: 5000, defaultQty: 1 },
    { optionId: 7, name: "샐러드", price: 7000, defaultQty: 1 },
    { optionId: 8, name: "샴페인", price: 25000, defaultQty: 1 },
];

type OrderStatus = "REQUESTED" | "COOKING" | "DELIVERING" | "COOKED" | "DONE";

type OrderItemOption = {
    quantity: number;
    name: string;
};

type OrderItem = {
    quantity: number;
    name: string;
    options: OrderItemOption[];
    styleName: string;
};

type Order = {
    orderId: number;
    orderDate: string;
    status: OrderStatus;
    deliveryTime?: string;
    totalPrice: number;
    orderItems: OrderItem[];
};

const CART_DRAFT_KEY = "cartDraft";

type CartDraft = {
    menuId: number;
    menuName: string;
    menuPrice: number;
    quantity: number;
    servingStyleId: number | null;
    servingStyleName: string | null;
    styleExtraPrice: number;
    options: CartItemOptionRequest[];
};

type CartItemOptionRequest = {
    optionId: number;
    optionName: string;
    optionPrice: number;
    defaultQty: number;
    quantity: number;
};

type CartItemRequest = {
    menuId: number;
    menuName: string;
    menuPrice: number;
    menuQuantity: number;
    styleId: number;
    styleName: string;
    styleExtraPrice: number;
    options: CartItemOptionRequest[];
};

export default function DinnerPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevOrderActive, setPrevOrderActive] = useState(false);
    const [reorderLoadingId, setReorderLoadingId] = useState<number | null>(null);


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
        if (typeof window === "undefined") return;

        const raw = localStorage.getItem(CART_DRAFT_KEY);
        if (!raw) return;

        try {
            const draft = JSON.parse(raw) as { menuId?: number };

            if (!draft.menuId) return;


            const index = photos.findIndex(
                (photo) => PHOTO_MENU_ID[photo.id] === draft.menuId
            );

            if (index !== -1) {
                setActiveIndex(index);
            }
        } catch (e) {
            console.error("cartDraft 파싱 실패:", e);
        }
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (typeof window === "undefined") return;

                const rawCustomerId =
                    localStorage.getItem("customerId") || localStorage.getItem("userId");
                
                console.log("rawCustomerId:", rawCustomerId);

                if (!rawCustomerId) {
                    setOrdersError("로그인 정보가 없습니다.");
                    return;
                }

                const customerId = Number(rawCustomerId);
                if (Number.isNaN(customerId)) {
                    setOrdersError("로그인 정보가 올바르지 않습니다.");
                    return;
                }

                const token = localStorage.getItem("token");

                console.log("주문 조회 API 요청");
                console.log("API_URL:", API_URL);
                console.log("customerId:", customerId);
                console.log("token:", token);

                const res = await fetch(`${API_URL}/orders/customer/${customerId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    credentials: "include",
                });

                if (!res.ok) {
                    throw new Error("주문 내역 조회에 실패했습니다.");
                }

                type OrdersResponse = {
                    orders: Order[];
                };
                const data: OrdersResponse = await res.json();

                console.log("이전 주문 내역 응답 data:", data);
                console.log("Array.isArray(data):", Array.isArray(data.orders));

                setOrders(Array.isArray(data.orders) ? data.orders : []);
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
            menuName: activeMenu.name,
            menuPrice: activeMenu.price,
            quantity: 1,
            servingStyleId: null,
            servingStyleName: null,
            styleExtraPrice: 0,
            options: [], 
        };

        localStorage.setItem(CART_DRAFT_KEY, JSON.stringify(draft));
        router.push(`/option?dinner=${currentPhoto.id}`);
    };


    const handlePrevOrderClick = () => {
        setPrevOrderActive((prev) => !prev); 
    };

    const handleReorder = async (order: Order) => {
        try {
            if (typeof window === "undefined") return;

            const rawCustomerId =
                localStorage.getItem("customerId") || localStorage.getItem("userId");

            if (!rawCustomerId) {
                alert("로그인 정보가 없습니다.");
                return;
            }

            const customerId = Number(rawCustomerId);
            if (Number.isNaN(customerId)) {
                alert("로그인 정보가 올바르지 않습니다.");
                return;
            }

            const token = localStorage.getItem("token");
            if (!token) {
                alert("토큰 정보가 없습니다. 다시 로그인해주세요.");
                return;
            }

            if (!order.orderItems || order.orderItems.length === 0) {
                alert("주문 정보에 상품이 없습니다.");
                return;
            }

            const item = order.orderItems[0];

            const menuMeta = MENUS.find((m) => m.name === item.name);
            if (!menuMeta) {
                console.error("메뉴 메타데이터를 찾을 수 없습니다:", item.name);
                alert("해당 메뉴 정보를 찾을 수 없습니다.");
                return;
            }

            const styleMeta = STYLES.find((s) => s.backendName === item.styleName);
            if (!styleMeta) {
                console.error("스타일 메타데이터를 찾을 수 없습니다:", item.styleName);
                alert("해당 스타일 정보를 찾을 수 없습니다.");
                return;
            }

            const optionPayloads: CartItemOptionRequest[] = (item.options || []).map((opt) => {
                const meta = OPTION_META.find((m) => m.name === opt.name);
                if (!meta) {
                    console.warn("옵션 메타데이터를 찾을 수 없습니다:", opt.name);
                    return null;
                }

                return {
                    optionId: meta.optionId,
                    optionName: meta.name,
                    optionPrice: meta.price,
                    defaultQty: meta.defaultQty,
                    quantity: opt.quantity,
                };
            }).filter((o): o is CartItemOptionRequest => o !== null);

            const payload: CartItemRequest = {
                menuId: menuMeta.menuId,
                menuName: menuMeta.name,
                menuPrice: menuMeta.price,
                menuQuantity: item.quantity,
                styleId: styleMeta.backendId,
                styleName: styleMeta.backendName,
                styleExtraPrice: styleMeta.price,
                options: optionPayloads,
            };

            console.log("재주문 payload:", payload);

            setReorderLoadingId(order.orderId);

            const res = await fetch(
                `${API_URL}/cart/${customerId}/items`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                    credentials: "include",
                }
            );

            if (!res.ok) {
                const text = await res.text();
                console.error("재주문 실패 응답:", text);
                throw new Error("재주문에 실패했습니다.");
            }
            setPrevOrderActive(false);
            router.push("/cart");
        } catch (e: any) {
            console.error(e);
            alert(e?.message ?? "재주문 중 오류가 발생했습니다.");
        } finally {
            setReorderLoadingId(null);
        }
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
                            const isLoading = reorderLoadingId === order.orderId;

                            return (
                                <PrevOrderItem
                                    key={order.orderId}
                                    $variant={variant}
                                    $disabled={isLoading}
                                    onClick={() => {
                                        if (!isLoading) {
                                            handleReorder(order);
                                        }
                                    }}
                                >
                                    <ItemTopRow>
                                        <ItemDate>{order.orderDate}</ItemDate>
                                        <ItemPrice>₩{order.totalPrice.toLocaleString()}</ItemPrice>
                                    </ItemTopRow>

                                    <ItemDesc>
                                        {order.orderItems
                                            .map((item) => {
                                                const optionsText = item.options?.length
                                                    ? item.options
                                                        .map((o) => `${o.name} ${o.quantity}`)
                                                        .join(", ")
                                                    : "";

                                                const baseText = `${item.name} ${item.quantity}개`;
                                                
                                                const styleText = item.styleName ? `, ${item.styleName}` : "";

                                                if (optionsText) {
                                                    return `${baseText}(${optionsText})${styleText}`;
                                                }
                                                return `${baseText}${styleText}`;
                                            })
                                            .join("\n")
                                        }
                                    </ItemDesc>

                                    {isLoading && (
                                        <ItemBottomRow>
                                            <ItemStatus>재주문 중...</ItemStatus>
                                        </ItemBottomRow>
                                    )}

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
                <MenuButton $active={true}>Dinner</MenuButton>
                <MenuButton>Option</MenuButton>
                <MenuButton>Style</MenuButton>
                <MenuButton>Cart</MenuButton>
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