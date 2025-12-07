"use client";

import styled from "@emotion/styled";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LogoutButton from "@/components/LogoutButton";
import VipBadge from "@/components/VipBadge";

const inter = Inter({
    subsets: ["latin"],
    weight: ["700"],
});

const Page = styled.div`
    position: relative; 
    min-height: 100vh;

    background: linear-gradient(287.56deg, #FDF5E6 0%, #FFFFFF 100%);
`;

const Logo = styled.img`
    position: absolute;
    top: 5%;     
    left: 5%;
    width: 270px;
    height: auto;
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

const MenuWrapper = styled.div`
    position: absolute;
    top: 10%;
    right: 20%;
    display: flex;
    gap: 50px;

    z-index: 999;
`;

const MenuButton = styled.span<{ $active?: boolean }>`
    cursor: default;
    color: white;

    opacity: ${(props) => (props.$active ? 1.0 : 0.6)};

    font-size: 1.7rem;
    font-weight: 700;
    text-decoration: none;
    font-family: ${inter.style.fontFamily};
`;

const Card = styled.div`
    position: absolute;
    top: 35%;
    left: 5%;
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
    margin-bottom: 10px;
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
    border: 3px dashed rgba(255, 255, 255, 0.5);
`;

const EllipseInner = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

type PositionType = "top" | "left" | "right";

const Photo = styled.img<{ $positionType: PositionType; $size: number }>`
    position: absolute;
    width: ${({ $size }) => $size}px;
    height: auto;
    transition: all 2s ease;
    cursor: pointer;

    ${({ $positionType }) =>
        $positionType === "top" &&
        `
        top: -20%;
        left: 50%;
        transform: translate(-50%, -30%) scale(1.05);
        z-index: 3;
    `}
    ${({ $positionType }) =>
        $positionType === "left" &&
        `
        top: 60%;
        left: -5%;
        transform: translate(-50%, -50%);
        z-index: 2;
    `}
    ${({ $positionType }) =>
        $positionType === "right" &&
        `
        top: 60%;
        right: -5%;
        transform: translate(50%, -50%);
        z-index: 2;
    `}
`;

const stylePhotos = [
    { id: "simple", src: "/S-simple.png", alt: "simple", size: 220 },
    { id: "delux", src: "/S-delux.png", alt: "delux", size: 240 },
    { id: "grand", src: "/S-grand.png", alt: "grand", size: 240 },
];

// ========== API ==========
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CART_DRAFT_KEY = "cartDraft";

type DraftOption = {
    optionId: number;
    optionName: string;
    optionPrice: number;
    defaultQty: number;
    quantity: number;
};

type CartDraft = {
    menuId: number;
    menuName: string; 
    menuPrice: number;  
    quantity: number;
    servingStyleId: number | null;
    servingStyleName: string | null;
    styleExtraPrice: number;
    options: DraftOption[]; 
};

type CartItemRequest = {
    menuId: number;
    menuName: string;
    menuPrice: number;
    menuQuantity: number;
    styleId: number;
    styleName: string;
    styleExtraPrice: number;
    options: DraftOption[];
};

const STYLES = [
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

export default function StylePage() {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const positionOrder: PositionType[] = ["top", "right", "left"];

    const currentStyle = STYLES[activeIndex];

    const handleSelectStyle = async() => {
        if (typeof window === "undefined") return;

        // 1. cartDraft 가져오기
        const rawDraft = localStorage.getItem(CART_DRAFT_KEY);
        if (!rawDraft) {
            alert("장바구니 정보가 없습니다.");
            router.push("/dinner");
            return;
        }

        const draft: CartDraft = JSON.parse(rawDraft);

        const rawCustomerId = localStorage.getItem("customerId");
        if (!rawCustomerId) {
            alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
            router.push("/login");
            return;
        }
        const customerId = Number(rawCustomerId);

        const token = localStorage.getItem("token") ?? "";

        const selectedStyle = STYLES[activeIndex];
        const styleId = selectedStyle.backendId;
        const styleName = selectedStyle.name;
        const styleExtraPrice = selectedStyle.price;

        const body: CartItemRequest = {
            menuId: draft.menuId,
            menuName: draft.menuName,
            menuPrice: draft.menuPrice,
            menuQuantity: draft.quantity,
            styleId,
            styleName,
            styleExtraPrice,
            options: draft.options,
        };

        console.log("장바구니 담기 data", body);
        console.log(
            typeof body.menuId,
            typeof body.menuPrice,
            typeof body.menuQuantity,
            body.options && body.options.map(o => ({
                optionId: o.optionId,
                quantity: o.quantity,
                typeId: typeof o.optionId,
                typeQty: typeof o.quantity,
            })),
        );

        try {
            const res = await fetch(`${API_URL}/cart/${customerId}/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error("장바구니 추가 실패:", res.status, text);
                throw new Error("장바구니 추가 실패");
            }

            // 성공 시 카트 페이지
            router.push("/cart");
        } catch (e) {
            console.error(e);
            alert("장바구니 추가 중 오류가 발생했습니다.");
        }
    };

    return (
        <Page>
            <ShapeArea $mask="/Bg_shape_3.svg">
                <Ellipse>
                    <EllipseInner>
                        {stylePhotos.map((photo, index) => {
                            const relativeIndex = (index - activeIndex + stylePhotos.length) % stylePhotos.length;
                            const positionType = positionOrder[relativeIndex];

                            return (
                                <Photo
                                    key={photo.id}
                                    src={photo.src}
                                    alt={photo.alt}
                                    $positionType={positionType}
                                    $size={photo.size}
                                    onClick={() => index !== activeIndex && setActiveIndex(index)}
                                />
                            );
                        })}
                    </EllipseInner>
                </Ellipse>
            </ShapeArea>

            <Logo src="/Logo-brown.svg" alt="logo" />

            <LogoutButton />
            <VipBadge />

            <MenuWrapper>
                <MenuButton>Dinner</MenuButton>
                <MenuButton>Option</MenuButton>
                <MenuButton $active={true}>Style</MenuButton>
                <MenuButton>Cart</MenuButton>
            </MenuWrapper>

            <Card>
                <Price>
                    ₩{currentStyle.price.toLocaleString("ko-KR")}
                </Price>

                <Title>{currentStyle.name}</Title>

                <Desc>{currentStyle.desc}</Desc>

                <SelectButton type="button" onClick={handleSelectStyle}>
                    스타일 선택
                </SelectButton>
            </Card>
        </Page>
    );
}