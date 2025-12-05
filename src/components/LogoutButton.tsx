"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["700"],
});

const Button = styled.button`
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

export default function LogoutButton() {
    const router = useRouter();

    return <Button onClick={() => router.push("/login")}>로그아웃</Button>;
}