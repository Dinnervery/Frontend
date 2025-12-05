"use client";

import styled from "@emotion/styled";
import { Inter } from "next/font/google";
import LogoutButton from "@/components/LogoutButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const Page = styled.div`
    position: relative;
    min-height: 100vh;

    background: linear-gradient(287.56deg, #FDF5E6 0%, #FFFFFF 100%);
`

const LeftArea = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 430px;
    height: 100%;
    display: flex;
    flex-content: center;
    align-items: center;

    background: #3F2316;
    z-index: 0;
`

const Title = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: #FDF5E6;

    font-size: 1.5rem;
    font-weight: 700;
    font-family: ${inter.style.fontFamily};
`;

const Logo = styled.img`
    position: absolute;
    top: 5%;
    left: 5%;
    width: 270px;
    height: auto;

    z-index: 1;
`;

const RightContent = styled.div`
    position: absolute;
    top: 50%;
    right: 20%;
    transform: translateY(-50%);

    z-index: 1;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    color: #6b4426;
`;

const BackButton = styled.img`
    width: 20px;
    height: auto;
    cursor: pointer;

    &:hover {
        opacity: 0.6;
    }
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    font-size: 18px;
    margin-bottom: 6px;
`;

const Input = styled.input`
    border: none;
    border-bottom: 1px solid #8c6543;
    background: transparent;
    padding: 10px 0;
    margin: 0 0 10px 0;

    font-size: 16px;
    font-family: "SOYO", sans-serif;
    outline: none;
`;

const TimeField = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`;

const TimeArrow = styled.span`
    position: absolute;
    right: 0;
    bottom: 14px;
    pointer-events: none;
`;

const PayButton = styled.button<{ $disabled?: boolean }>`
    align-self: flex-end;
    padding: 12px 40px;

    border: none;
    border-radius: 10px;
    background: #3F2316;
    color: #fff;

    font-size: 16px;
    font-family: ${inter.style.fontFamily};
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
    opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};
`;

export default function CheckoutPage() {
    const router = useRouter();

    const [address, setAddress] = useState("");
    const [card, setCard] = useState("");
    const [time, setTime] = useState("");

    const isDisabled = !address || !card || !time;

    const handlePayClick = () => {
        if (isDisabled){
            alert("주문 정보를 모두 입력해주세요.");
            return;
        }

        alert("결제가 완료되었습니다!");
    };

    return (
        <Page>
            <LeftArea>
                <Title>주문 정보</Title>
            </LeftArea>
            <Logo src="/Logo-beige.svg" alt="logo" />
            <LogoutButton />

            <RightContent>
                <BackButton
                    src="/Prev-arrow.svg"
                    alt="뒤로가기"
                    onClick={() => router.back()}
                />

                <Form>
                    <Field>
                        <Label htmlFor="address">주소</Label>
                        <Input
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder=""
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="card">카드 번호</Label>
                        <Input
                            id="card"
                            value={card}
                            onChange={(e) => setCard(e.target.value)}
                            placeholder=""
                        />
                    </Field>

                    <TimeField>
                        <Label htmlFor="time">배달 시간</Label>
                        <Input
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            placeholder=""
                        />
                        <TimeArrow>⌵</TimeArrow>
                    </TimeField>
                </Form>

                <PayButton
                    $disabled={isDisabled}
                    disabled={isDisabled}
                    onClick={handlePayClick}
                >결제하기</PayButton>
            </RightContent>
        </Page>
    );
}