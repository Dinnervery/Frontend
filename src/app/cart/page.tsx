"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { Inter } from "next/font/google";
import LogoutButton from "@/components/LogoutButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const Page = styled.div`
    position: relative; 
    min-height: 100vh;
    display: flex;
    justify-content: center;  
    align-items: center;

    font-family: ${inter.style.fontFamily};
`;

const BgShape = styled.img`
    position: absolute;
    top: 0;
    right: 0;
    width: 70%; 
    pointer-events: none; 
    z-index: 0;
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
    shouldForwardProp: (prop) => prop !== "$active",   
})<{ $active?: boolean }>`
    font-size: 1.7rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    font-family: ${inter.style.fontFamily};
    
    color: white;
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

const InfoBox = styled.div`
    width: 400px;
    height: 400px;
    padding: 15px 25px;
    margin-bottom: 20px;

    background: #FFFFFF;
    box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.15);
    border-radius: 10px;

    z-index: 1;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AddButton = styled.img`
    position: absolute;
    top: 50%;
    left: 450px; 
    transform: translateY(-50%);

    width: 40px;
    height: 40px;
    cursor: pointer;
    z-index: 2; 

    &:hover {
        opacity: 0.6;
    }
`;

const InfoHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const InfoTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
`;

const EditButton = styled.button`
    padding: 8px 18px;

    border-radius: 999px;
    border: none;
    background: #3f2316;
    color: #ffffff;
    cursor: pointer;

    font-size: 1rem;
    font-weight: 400;
    font-family: ${inter.style.fontFamily};

    &:hover {
        box-shadow: inset 0 0 0 1px #3f2316;
        background: #FFFFFF;
        color: #3f2316;
    }
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

    text-align: center;
`;

const ItemPrice = styled.div`
    width: 80px;

    text-align: right;
`;

const TotalRow = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-top: 1px solid #e5e5e5;
`;

const TotalLabel = styled.div`
    font-size: 1.1rem;
    font-weight: 700;
`;

const TotalAmount = styled.div`
    color: #b54450;

    font-size: 1.1rem;
    font-weight: 700;
`;

const OrderButton = styled.button`
    width: 400px;
    height: 50px;

    border: none;
    border-radius: 7px;
    background: #FFBFBE;
    color: #3F2316;
    box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.15);

    font-family: ${inter.style.fontFamily};
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;

    &:hover {
        background: #3F2316;
        color: white;
    }
`;

// ========== API ==========
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CART_DRAFT_KEY = "cartDraft";

type CartDinnerItem = {
    menuId: number;
    name: string;
    quantity: number;
    unitPrice: number;
};

type CartOption = {
    optionId: number;
    name: string;
    quantity: number;
    defaultQty: number;
    unitPrice: number;
    extraPrice: number;
};

type CartStyle = {
    styleId: number;
    name: string;
    extraPrice: number;
};

type CartItem = {
    cartItemId: number;
    dinnerItem: CartDinnerItem; 
    style: CartStyle;
    options: CartOption[];
    totalAmount: number;
};

type CartResponse = {
    cartId: number;
    customerId: number;
    totalAmount: number;
    cartItems: CartItem[];
};

export default function CartPage() {
    const router = useRouter();
    
    const [cart, setCart] = useState<CartResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const firstItem = cart?.cartItems[0];

    useEffect(() => {
        if (typeof window === "undefined") return;

        const rawCustomerId = localStorage.getItem("customerId");
        if (!rawCustomerId) {
            alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
            router.push("/login");
            return;
        }

        const fetchCart = async () => {
            try {
                const token = localStorage.getItem("token");  

                const res = await fetch(`${API_URL}/cart/${rawCustomerId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token ?? ""}`, 
                },
                credentials: "include",
                });

                if (!res.ok) {
                throw new Error("장바구니 조회 실패");
                }

                const data: CartResponse = await res.json();
                
                console.log("장바구니 API 응답:", data);

                if (Array.isArray(data?.cartItems)) {
                    data.cartItems.forEach((item, index) => {
                        console.log(`\n[${index}] cartItemId:`, item.cartItemId);
                        console.log("dinner:", item.dinnerItem);
                        console.log("options:", item.options);
                        console.log("style:", item.style);
                    });
                }

                setCart(data);
            } catch (e) {
                console.error(e);
                setError("장바구니를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [router]);

    if (loading) {
        return <Page>장바구니 로딩 중...</Page>;
    }

    if (error || !firstItem) {
        return <Page>장바구니에 담긴 항목이 없습니다.</Page>;
    }

    const dinner = firstItem.dinnerItem;
    const options = firstItem.options || [];
    const style = firstItem.style;

    // 디너/스타일은 한 카드 내 무조건 1개
    const dinnerPrice = dinner.unitPrice;
    const stylePrice = style.extraPrice ?? 0;

    const calcOptionExtraPrice = (o: CartOption) => {
        const extraCount = Math.max(o.quantity - o.defaultQty, 0);
        return extraCount * o.unitPrice;
    };

    const optionsTotal = options.reduce(
        (sum, o) => sum + calcOptionExtraPrice(o),
        0
    );

    const total = dinnerPrice + stylePrice + optionsTotal;

    const handleAddClick = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(CART_DRAFT_KEY);
        }
        router.push("/dinner"); // 새 디너 선택
    };


    return (
        <Page>
            <BgShape src="/Bg_shape_3.svg" alt="bg shape 3" />
            <Logo src="/Logo-brown.svg" alt="logo" />
            <LogoutButton />

            <MenuWrapper>
                <MenuButton href="/dinner" >Dinner</MenuButton>
                <MenuButton href="/option">Option</MenuButton>
                <MenuButton href="/style">Style</MenuButton>
                <MenuButton href="/cart" $active={true}>Cart</MenuButton>
            </MenuWrapper>

            <BoxContainer>
                <InnerContainer>
                    <InfoBox>
                        <InfoHeader>
                            <InfoTitle>주문 내역</InfoTitle>
                            <EditButton onClick={() => router.push("/dinner")}>수정하기</EditButton>
                        </InfoHeader>
                        
                        <Divider />

                        <Section>
                            <SectionTitle>Dinner</SectionTitle>
                            <ItemRow>
                                <ItemName>{dinner.name}</ItemName>
                                <ItemQty>1</ItemQty>
                                <ItemPrice>
                                    ₩{dinnerPrice.toLocaleString("ko-KR")}
                                </ItemPrice>
                            </ItemRow>
                        </Section>

                        <Divider />

                        <Section>
                            <SectionTitle>Option</SectionTitle>
                            {options.map((item) => {
                                const extraCount = Math.max(item.quantity - item.defaultQty, 0);
                                const optionExtraPrice = calcOptionExtraPrice(item);

                                return (
                                    <ItemRow key={item.optionId}>
                                        <ItemName>{item.name}</ItemName>
                                        {/* 선택 수량 */}
                                        <ItemQty>{item.quantity}</ItemQty>
                                        {/* 추가 금액 */}
                                        <ItemPrice>
                                            ₩{optionExtraPrice.toLocaleString("ko-KR")}
                                        </ItemPrice>
                                    </ItemRow>
                                );
                            })}
                        </Section>

                        <Divider />

                        <Section>
                            <SectionTitle>Style</SectionTitle>
                            <ItemRow>
                                <ItemName>{style.name}</ItemName>
                                <ItemQty>1</ItemQty>
                                <ItemPrice>
                                    ₩{stylePrice.toLocaleString("ko-KR")}
                                </ItemPrice>
                            </ItemRow>
                        </Section>

                        <TotalRow>
                            <TotalLabel>총 금액</TotalLabel>
                            <TotalAmount>₩{total.toLocaleString("ko-KR")}</TotalAmount>
                        </TotalRow>
                    </InfoBox>

                    <OrderButton onClick={() => router.push("/checkout")}>주문하기</OrderButton>

                    <AddButton
                            src="/I-add.png"
                            alt="추가"
                            onClick={handleAddClick}
                    />
                </InnerContainer>
            </BoxContainer>
        </Page>
    );
}