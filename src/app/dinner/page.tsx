"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
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
    left: 5%;
    display: flex;
    flex-direction: column;
    width: 170px;

    color: #4b3525;

    font-family: ${inter.style.fontFamily};
`;

const Price = styled.div`
    margin-bottom: 5px;

    color: #B54450;   

    font-size: 1.2rem;
    font-weight: 700;
`;

const Title = styled.div`
    margin-bottom: 10px;

    font-size: 1.7rem;
    font-weight: 700;
`;

const Desc = styled.div`
    margin-bottom: 10px;
    white-space: pre-line;

    color: black;

    font-size: 1.2rem;
    font-weight: 400;
`;

const SelectButton = styled.button`
    display: block;
    text-align: center;
    margin-top: 10px;
    padding: 15px 0;

    cursor: pointer;
    border: none;
    border-radius: 30px;
    background: #6B4426;
    color: white;

    &:hover {
        opacity: 0.9;
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

export default function DinnerPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();

    const positionOrder: PositionType[] = ["top", "right", "bottom", "left"];

    const handleSelectDinner = () => {
        const selectedDinner = photos[activeIndex];
        router.push(`/option?dinner=${selectedDinner.id}`);
    }

    return (
        <Page>
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

            <MenuWrapper>
                <MenuButton href="/dinner" $active={true}>Dinner</MenuButton>
                <MenuButton href="/option" $disabled={true}>Option</MenuButton>
                <MenuButton href="/style" $disabled={true}>Style</MenuButton>
                <MenuButton href="/information" $disabled={true}>Information</MenuButton>
            </MenuWrapper>

            <Card>
                <Price>가격</Price>
                <Title>디너</Title>
                <Desc>설명</Desc>
                <SelectButton type="button" onClick={handleSelectDinner}>
                    디너 선택
                </SelectButton>
            </Card>
        </Page>
    );
}