"use client";

import styled from "@emotion/styled";
import LogoutButton from "@/components/LogoutButton";
import { useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const Page = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;

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

const MainWrap = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const StepRow = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

const StepItem = styled.div`
    position: relative;
    width: 40px;   /* 원 크기 기준 */
    height: 85px;  /* 원 + 텍스트 들어갈 높이 */
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 2px;
`;

const StepCircle = styled.button<{ $active: boolean }>`
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    border: 2px solid #3f2316;
    cursor: pointer;
    background-color: ${({ $active }) => ($active ? "#ffbfbe" : "#ffffff")};
    color: #3F2316;
    
    font-size: 20px;
    font-weight: bold;
    font-family: "SOYO";
`;

const StepLabel = styled.span`
    position: absolute;
    top: 65px;
    left: 50%;
    transform: translateX(-50%);

    color: #3f2316;

    font-size: 18px;
    font-family: ${inter.style.fontFamily};
    font-weight: 700;
`;

const StepLine = styled.div<{ $solid: boolean }>`
    width: 50px;
    border-top: ${({ $solid }) =>
        $solid ? "2px solid #3f2316" : "2px dashed #3f2316"};
`;

const InfoBox = styled.div`
    width: 400px;
    height: 400px;
    background: #ffffff;
    box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
`;


export default function CookStaffPage() {
    const [step, setStep] = useState<1 | 2 | 3>(1);

    return (
        <Page>
            <Logo src="/Logo-brown.svg" alt="logo" />
            <LogoutButton color="#3F2316" />

            <MenuWrapper>
                <MenuButton href="/dinner" >재고 관리</MenuButton>
                <MenuButton href="/cookingStaff" $active={true}>주문 내역</MenuButton>
            </MenuWrapper>

            <MainWrap>
                <StepRow>
                    <StepItem>
                        <StepCircle $active={step === 1} onClick={() => setStep(1)}>
                            1
                        </StepCircle>
                        <StepLabel>requested</StepLabel>
                    </StepItem>

                    <StepLine $solid={step >= 2} />

                    <StepItem>
                        <StepCircle $active={step === 2} onClick={() => setStep(2)}>
                            2
                        </StepCircle>
                        <StepLabel>cooking</StepLabel>
                    </StepItem>

                    <StepLine $solid={step === 3} />

                    <StepItem>
                        <StepCircle $active={step === 3} onClick={() => setStep(3)}>
                            3
                        </StepCircle>
                        <StepLabel>done</StepLabel>
                    </StepItem>
                </StepRow>

                {/* 흰색 박스(여기에 내용 채우면 됨) */}
                <InfoBox>
                    {/* step 값에 따라 내용 바꾸고 싶으면 여기서 분기 */}
                </InfoBox>
            </MainWrap>
        </Page>
    );
}
