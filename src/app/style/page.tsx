"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["700", "800", "900"],
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

const MenuButton = styled(Link)<{ active?: boolean }>`
    font-size: 1.7rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    font-family: ${inter.style.fontFamily};
    color: white;
    opacity: ${(props) => (props.active ? 1.0 : 0.6)};

    &:hover {
        opacity: 1.0;
    }
`;

export default function StylePage() {
    return (
        <Page>
            <BgShape src="/Bg_shape_3.svg" alt="bg shape 3" />
            <Logo src="/Logo-brown.svg" alt="logo" />

            <MenuWrapper>
                <MenuButton href="/dinner">Dinner</MenuButton>
                <MenuButton href="/option">Option</MenuButton>
                <MenuButton href="/style" active={true}>Style</MenuButton>
                <MenuButton href="/information">Information</MenuButton>
            </MenuWrapper>
        </Page>
    );
}