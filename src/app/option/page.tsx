"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const Page = styled.div`
    position: relative; 
    min-height: 100vh;
    background: linear-gradient(287.56deg, #FDF5E6 0%, #FFFFFF 100%);
`;

const BgShape = styled.img`
    position: absolute;
    top: 0;
    right: 0;
    width: 70%; 
    pointer-events: none; 
`;

const Logo = styled.img`
    position: absolute;
    top: 5%;     
    left: 5%;
    width: 18%;
    height: auto;
`;

const MenuWrapper = styled.div`
    position: absolute;
    top: 10%;
    right: 20%;
    display: flex;
    gap: 50px;
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
    background: white;
    border-radius: 20px;
    box-shadow: 3px 3px 20px 0px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    align-items: center;

    border: 3px solid ${(p) => (p.$active ? "#FFBFBE" : "transparent")};
`;

const OptionImage = styled.img`
    width: 70%;
    height: auto;
    margin-top: -80px; 
`;

const OptionName = styled.div`
    font-family: ${inter.style.fontFamily};
    font-weight: 400;
    font-size: 1.2rem;
    color: black;

    margin-top: 10px;
`;

const OptionPrice = styled.div`
    font-family: ${inter.style.fontFamily};
    font-weight: 700;
    font-size: 1.05rem;
    color: #B54450;

    margin-top: 10px;
`;

const QtyRow = styled.div`
    border: 1px solid #3F2316;
    border-radius: 50px;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    gap: 30px;
    height: 45px;
    width: 80%;
`;

const QtyButton = styled.button`
    border-radius: 50px;
    border: 1px solid white;
    background: #6B4426;
    color: white;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 400;

    width: 35px;
    height: 35px;

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
    text-align: center;
    font-family: ${inter.style.fontFamily};
    font-weight: 400;
    font-size: 1.0rem;
    color: #3F2316;
`;

const SelectButton = styled.button<{ $selected?: boolean }>`
    margin-top: 10px;
    width: 80%;
    height: 35px;
    border-radius: 20px;
    border: 0;
    cursor: pointer;
    font-family: ${inter.style.fontFamily};
    font-weight: 700;
    font-size: 1.05rem;

    background: ${(p) => (p.$selected ? "#FFBFBE" : "#6B4426")};
    color: ${(p) => (p.$selected ? "#6B4426" : "#FFF")};
`;

type DinnerId = "valen" | "eng" | "fren" | "cham";
type OptionItem = { id: string; src: string; alt: string; name: string; price: number };

const optionItemsByDinner: Record<DinnerId, OptionItem[]> = {
    valen: [
        { id: "steak", src: "/O-steak.png", alt: "steak", name: "스테이크", price: 15000 },
        { id: "wine", src: "/O-wine.png", alt: "wine", name: "와인", price: 8000 },
    ],
    eng: [
        { id: "bacon", src: "/O-bacon.png", alt: "bacon", name: "베이컨", price: 4000 },
        { id: "bread", src: "/O-bread.png", alt: "bread", name: "빵", price: 3000 },
        { id: "egg", src: "/O-egg.png", alt: "egg", name: "계란", price: 5000 },
        { id: "steak", src: "/O-steak.png", alt: "스테이크", name: "Steak", price: 15000 },
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

export default function OptionPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dinner = (searchParams.get("dinner") ?? "") as DinnerId;
    const items = optionItemsByDinner[dinner] ?? [];

    const [qtyById, setQtyById] = useState<Record<string, number>>({});
    const [selectedOption, setSelectedOption] = useState<Record<string, boolean>>({});

    const qty = (id: string) => qtyById[id] ?? 0;
    const [activeBox, setActiveBox] = useState<string | null>(null);

    const inc = (id: string) =>{
        setActiveBox(id);
        setQtyById((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    }

    const dec = (id: string) => {
        setActiveBox(id);
        setQtyById((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) - 1) }));
    }

    const onSelectClick = (id: string) => {
        setActiveBox(null);
        setSelectedOption((prev) => {
            const next = { ...prev, [id]: !prev[id] };
            const allSelected = items.length > 0 && items.every((item) => next[item.id]);

            if(allSelected){
                router.push(`/style?dinner=${dinner}`);
            }
            return next;
        });
    };
    
    return (
        <Page>
            <BgShape src="/Bg_shape_3.svg" alt="bg shape 3" />
            <Logo src="/Logo-brown.svg" alt="logo" />

            <MenuWrapper>
                <MenuButton href="/dinner" >Dinner</MenuButton>
                <MenuButton href="/option" $active={true}>Option</MenuButton>
                <MenuButton href="#" $disabled={true}>Style</MenuButton>
                <MenuButton href="#" $disabled={true}>Information</MenuButton>
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
                                <QtyButton disabled={isSelected} onClick={() => dec(item.id)}>-</QtyButton>
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