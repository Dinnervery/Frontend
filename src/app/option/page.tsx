"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";
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
    shouldForwardProp: (prop) => prop !== "$active" && prop !== "$disabled",  
})<{ $active?: boolean; $disabled?: boolean }>`
    font-size: 1.7rem;
    font-weight: 700;
    text-decoration: none;
    cursor: ${(p) => (p.$disabled ? "default" : "pointer")};
    font-family: ${inter.style.fontFamily};
    color: white;
    opacity: ${(props) => (props.$active ? 1.0 : 0.6)};

    &:hover {
        opacity: ${(p) => (p.$disabled ? 0.6 : 1.0)};
    }

    pointer-events: ${(p) => (p.$disabled ? "none" : "auto")};
`;

const BoxContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: 50px;
`;

const OptionBox = styled.div<{ $active?: boolean}>`
    width: 230px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;

    background: white;
    border-radius: 20px;
    box-shadow: 3px 3px 20px 0px rgba(0, 0, 0, 0.15);
    border: 3px solid ${(p) => (p.$active ? "#FFBFBE" : "transparent")};
`;

const OptionImage = styled.img`
    width: 70%;
    height: auto;
    margin-top: -80px; 
`;

const OptionName = styled.div`
    margin-top: 10px;

    color: black;

    font-family: ${inter.style.fontFamily};
    font-weight: 400;
    font-size: 1.2rem;
`;

const OptionPrice = styled.div`
    margin-top: 10px;

    color: #B54450;

    font-family: ${inter.style.fontFamily};
    font-weight: 700;
    font-size: 1.05rem;
`;

const QtyRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    gap: 30px;
    height: 45px;
    width: 80%;

    border: 1px solid #3F2316;
    border-radius: 50px;
`;

const QtyButton = styled.button`
    width: 35px;
    height: 35px;

    border-radius: 50px;
    border: 1px solid white;
    background: #6B4426;
    color: white;
    cursor: pointer;

    font-size: 1.5rem;
    font-weight: 400;

    &:active {
        transform: translateY(1px);
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        transform: none;
    }
`;

const QtyValue = styled.div`
    width: 40px;

    color: #3F2316;

    text-align: center;
    font-family: ${inter.style.fontFamily};
    font-weight: 400;
    font-size: 1.0rem;
`;

const SelectButton = styled.button<{ $selected?: boolean }>`
    margin-top: 10px;
    width: 80%;
    height: 35px;

    border-radius: 20px;
    border: 0;
    cursor: pointer;
    background: ${(p) => (p.$selected ? "#FFBFBE" : "#6B4426")};
    color: ${(p) => (p.$selected ? "#6B4426" : "#FFF")};

    font-family: ${inter.style.fontFamily};
    font-weight: 700;
    font-size: 1.05rem;
`;

type DinnerId = "valen" | "eng" | "fren" | "cham";
type OptionItem = { id: string; src: string; alt: string; name: string; price: number };

const OPTION_ID_MAP: Record<string, number> = {
    "스테이크": 1,
    "와인": 2,
    "베이컨": 3,
    "빵": 4,
    "계란": 5,
    "커피": 6,
    "샐러드": 7,
    "샴페인": 8,
};

const optionItems: Record<DinnerId, OptionItem[]> = {
    valen: [
        { id: "steak", src: "/O-steak.png", alt: "steak", name: "스테이크", price: 15000 },
        { id: "wine", src: "/O-wine.png", alt: "wine", name: "와인", price: 8000 },
    ],
    eng: [
        { id: "bacon", src: "/O-bacon.png", alt: "bacon", name: "베이컨", price: 4000 },
        { id: "bread", src: "/O-bread.png", alt: "bread", name: "빵", price: 3000 },
        { id: "egg", src: "/O-egg.png", alt: "egg", name: "계란", price: 5000 },
        { id: "steak", src: "/O-steak.png", alt: "steak", name: "스테이크", price: 15000 },
    ],
    fren: [
        { id: "coffee", src: "/O-coffee.png", alt: "coffee", name: "커피", price: 5000 },
        { id: "salad", src: "/O-salad.png", alt: "salad", name: "샐러드", price: 7000 },
        { id: "steak", src: "/O-steak.png", alt: "steak", name: "스테이크", price: 15000 },
        { id: "wine", src: "/O-wine.png", alt: "wine", name: "와인", price: 8000 },
    ],
    cham: [
        { id: "bread", src: "/O-bread.png", alt: "bread", name: "빵", price: 3000 },
        { id: "champ", src: "/O-champ.png", alt: "champ", name: "샴페인", price: 25000 },
        { id: "coffee", src: "/O-coffee.png", alt: "coffee", name: "커피", price: 5000 },
        { id: "steak", src: "/O-steak.png", alt: "steak", name: "스테이크", price: 15000 },
        { id: "wine", src: "/O-wine.png", alt: "wine", name: "와인", price: 8000 },
    ],
};

// ========== API ==========
type DraftOption = {
    optionId: number;
    optionName: string;
    optionPrice: number;
    defaultQty: number;
    quantity: number;
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
    options: DraftOption[];
};

export default function OptionPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dinner = (searchParams.get("dinner") ?? "") as DinnerId;
    const items = optionItems[dinner] ?? [];

    const [qtyById, setQtyById] = useState<Record<string, number>>({});
    const [selectedOption, setSelectedOption] = useState<Record<string, boolean>>({});

    const qty = (id: string) => qtyById[id] ?? 1;
    const [activeBox, setActiveBox] = useState<string | null>(null);

    const inc = (id: string) => {
        setQtyById((prev) => ({
            ...prev,
            [id]: (prev[id] ?? 1) + 1
        }));
    };

    const dec = (id: string) => {
        setQtyById((prev) => ({
            ...prev,
            [id]: Math.max(1, (prev[id] ?? 1) - 1)
        }));
    };

    // 선택 상태 변경
    const onSelectClick = (id: string) => {
        setActiveBox(null);
        setSelectedOption((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    
    // 모든 선택이 끝났는지 확인
    useEffect(() => {
        if (items.length === 0) return;

        const allSelected = items.every((item) => selectedOption[item.id]);

        if (!allSelected) return;

        // 1. draft 가져오기
        const raw = localStorage.getItem(CART_DRAFT_KEY);
        if (!raw) {
            router.push("/dinner");
            return;
        }

        const draft: CartDraft = JSON.parse(raw);

        // 2. 옵션 선택 + 수량 넣기
        const options: DraftOption[] = [];

        items.forEach((item) => {
            if (!selectedOption[item.id]) return;

            const backendOptionId = OPTION_ID_MAP[item.name];
            if (!backendOptionId) {
                console.warn("옵션 ID 매핑 실패:", item.name);
                return;
            }

            const quantity = qtyById[item.id] ?? 1;

            options.push({
                optionId: backendOptionId,
                optionName: item.name,
                optionPrice: item.price,
                defaultQty: 1,
                quantity,     
            });
        });

        const updatedDraft: CartDraft = {
            ...draft,
            options, 
        };

        localStorage.setItem(CART_DRAFT_KEY, JSON.stringify(updatedDraft));

        router.push(`/style?dinner=${dinner}`);
    }, [items, selectedOption, qtyById, router, dinner]);

    return (
        <Page>
            <ShapeArea $mask="/Bg_shape_3.svg" />
            <Logo src="/Logo-brown.svg" alt="logo" />

            <LogoutButton />

            <MenuWrapper>
                <MenuButton href="/dinner" >Dinner</MenuButton>
                <MenuButton href="/option" $active={true}>Option</MenuButton>
                <MenuButton href="#" $disabled={true}>Style</MenuButton>
                <MenuButton href="#" $disabled={true}>Cart</MenuButton>
            </MenuWrapper>

            <BoxContainer>
                {items.map((item) => {
                    const isSelected = !!selectedOption[item.id];
                    const isActive = activeBox === item.id;

                    return(
                        <OptionBox key={item.id} $active={isActive}>
                            <OptionImage src={item.src} alt={item.alt} />
                            <OptionName>{item.name}</OptionName>
                            <OptionPrice>₩{item.price.toLocaleString("ko-KR")}</OptionPrice>

                            <QtyRow>
                                <QtyButton 
                                disabled={isSelected || qty(item.id) === 1}
                                onClick={() => dec(item.id)}
                                >
                                    -
                                </QtyButton>
                                <QtyValue>{qty(item.id)}</QtyValue>
                                <QtyButton disabled={isSelected} onClick={() => inc(item.id)}>+</QtyButton>
                            </QtyRow>

                            <SelectButton $selected={isSelected} onClick={() => onSelectClick(item.id)}>{isSelected ? "취소" : "선택"}</SelectButton>
                        </OptionBox>
                    );
                })}
            </BoxContainer>
        </Page>
    );
}