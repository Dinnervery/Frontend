"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inter = Inter({
    subsets: ["latin"],
    weight: ["700", "800", "900"],
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
    cursor: ${(p) => (p.$disabled ? "default" : "pointer")};
    color: white;
    opacity: ${(props) => (props.$active ? 1.0 : 0.6)};
    pointer-events: ${(p) => (p.$disabled ? "none" : "auto")};

    &:hover {
        opacity: ${(p) => (p.$disabled ? 0.6 : 1.0)};
    }

    font-size: 1.7rem;
    font-weight: 700;
    text-decoration: none;
    font-family: ${inter.style.fontFamily};
`;

const LogoutButton = styled.button`
    position: absolute;
    top: 4%;
    right: 4%;

    background: none;
    border: none;
    padding: 0;

    color: white; 
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }  

    font-family: ${inter.style.fontFamily};
    font-size: 1.2rem;
    font-weight: 700;
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

const ShapeArea = styled.div`
    position: absolute;
    top: -15%;
    right: 0;
    width: 70%;
    height: 100%;
    background-color: #3F2316;

    -webkit-mask-image: url("/Bg_shape_3.svg");
    mask-image: url("/Bg_shape_3.svg");
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
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

export default function StylePage() {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const positionOrder: PositionType[] = ["top", "right", "left"];

    return (
        <Page>
            <ShapeArea>
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

            <LogoutButton onClick={() => router.push("/login")}>
                로그아웃
            </LogoutButton>

            <MenuWrapper>
                <MenuButton href="/dinner">Dinner</MenuButton>
                <MenuButton href="/option">Option</MenuButton>
                <MenuButton href="/style" $active={true}>Style</MenuButton>
                <MenuButton href="#" $disabled={true}>Information</MenuButton>
            </MenuWrapper>

            <Card>
                <Price>가격</Price>
                <Title>스타일</Title>
                <Desc>설명</Desc>
                <SelectButton type="button" onClick={() => router.push("/information")}>
                    스타일 선택
                </SelectButton>
            </Card>
        </Page>
    );
}