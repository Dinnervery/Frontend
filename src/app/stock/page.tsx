"use client";

import styled from "@emotion/styled";
import { Inter } from "next/font/google";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { useEffect, useState } from "react";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const Page = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;

    background: linear-gradient(287.56deg, #FDF5E6 0%, #FFFFFF 100%);
`;

const Logo = styled.img`
    position: absolute;
    top: 5%;
    left: 5%;
    width: 270px;
    height: auto;
    z-index: 1;
`;

const MenuWrapper = styled.div`
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
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

    color: #3F2316;
    opacity: ${(props) => (props.$active ? 1.0 : 0.6)};

    &:hover {
        opacity: 1.0;
    }
`;

const Main = styled.main`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Card = styled.div`
    width: 700px;
    max-width: 90vw;
    padding: 30px;

    background: #ffffff;
    color: #111;
    box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.15);
    border-radius: 3px;

    font-family: ${inter.style.fontFamily};
`;

const TitleRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
`;

const UpdatedAt = styled.span`
    font-size: 1.1rem;
    color: rgba(63, 35, 22, 0.7);
`;

const Table = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
`;

const HeaderRow = styled.div`
    display: flex;
    padding: 6px 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #3f2316;
    border-bottom: 1px solid #f0f0f0;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    padding: 6px 0;
    font-size: 1.3rem;

    padding: 5px 0;
    border-bottom: 1px solid #eee;
`;

const NameCell = styled.div`
    flex: 1.3;
`;

const QtyCell = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 6px;
`;

const Badge = styled.span<{ $low?: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    padding: 5px;

    border-radius: 10px;
    background: ${(p) => (p.$low ? "#FFBFBE" : "#F3E6D8")};
    color: #3f2316;

    font-size: 1.3rem;
    font-weight: 700;
`;

const LoadingText = styled.div`
    font-size: 1.3rem;
    font-family: "SOYO";
    color: #3f2316;
    text-align: center;
    padding: 40px 0;
`;

const ErrorText = styled.div`
    font-size: 1.3rem;
    font-family: "SOYO";
    color: #b54450;
    text-align: center;
    padding: 40px 0;
`;

const EmptyText = styled.div`
    font-size: 1.3rem;
    font-family: "SOYO";
    color: #3f2316;
    text-align: center;
    padding: 40px 0;
`;

// ========== API ==========
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type StorageItem = {
    storageId: number;
    name: string;
    quantity: number;
};

type StorageResponse = {
    storageItems: StorageItem[];
};

export default function StockPage() {
    const [items, setItems] = useState<StorageItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatedAt, setUpdatedAt] = useState<string | null>(null);

    useEffect(() => {
        const fetchStorage = async () => {
            try {
                setLoading(true);
                setError(null);

                const token =
                    typeof window !== "undefined"
                        ? localStorage.getItem("staffToken")
                        : null;

                if (!token) {
                    setError("로그인 정보가 없습니다.");
                    return;
                }

                const res = await fetch(`${API_URL}/storage`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });

                if (!res.ok) {
                    throw new Error("재고 정보를 불러오지 못했습니다.");
                }

                const data: StorageResponse = await res.json();
                setItems(data.storageItems ?? []);

                const now = new Date();
                const formatted = now.toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                });
                setUpdatedAt(formatted);
            } catch (e: any) {
                console.error("fetchStorage error:", e);
                setError(e?.message ?? "재고 정보를 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchStorage();
    }, []);

    const hasItems = !loading && !error && items.length > 0;

    return (
        <Page>
            <Logo src="/Logo-brown.svg" alt="logo" />
            <LogoutButton color="#3F2316" />

            <MenuWrapper>
                <MenuButton href="/stock" $active={true}>
                    재고 관리
                </MenuButton>
                <MenuButton href="/cookingStaff">
                    주문 내역
                </MenuButton>
            </MenuWrapper>

            <Main>
                <Card>
                    <TitleRow>
                        {updatedAt && (
                            <UpdatedAt>업데이트: {updatedAt}</UpdatedAt>
                        )}
                    </TitleRow>

                    {loading && <LoadingText>재고 정보를 불러오는 중입니다...</LoadingText>}
                    {!loading && error && <ErrorText>{error}</ErrorText>}
                    {!loading && !error && items.length === 0 && (
                        <EmptyText>등록된 재고가 없습니다.</EmptyText>
                    )}

                    {hasItems && (
                        <Table>
                            <HeaderRow>
                                <NameCell>재료</NameCell>
                                <QtyCell>수량</QtyCell>
                            </HeaderRow>

                            {items.map((item) => {
                                const isLow = item.quantity < 20;

                                return (
                                    <Row key={item.storageId}>
                                        <NameCell>{item.name}</NameCell>
                                        <QtyCell>
                                            <Badge $low={isLow}>
                                                {item.quantity}
                                            </Badge>
                                        </QtyCell>
                                    </Row>
                                );
                            })}
                        </Table>
                    )}
                </Card>
            </Main>
        </Page>
    );
}