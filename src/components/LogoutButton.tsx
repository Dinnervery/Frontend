"use client";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["700"],
});

const Button = styled.button<{ $color?: string }>`
    position: absolute;
    top: 4%;
    right: 4%;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    color: ${({ $color }) => $color || "white"};

    &:hover {
        opacity: 0.6;
    }

    font-family: ${inter.style.fontFamily};
    font-size: 1.2rem;
    font-weight: 700;
`;

export default function LogoutButton({ color }: { color?: string }) {
    const router = useRouter();

    return (
        <Button
            $color={color}
            onClick={() => router.push("/login")}
        >
            로그아웃
        </Button>
    );
}