"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { Inter } from "next/font/google";
import LogoutButton from "@/components/LogoutButton";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const Page = styled.div`
    position: relative; 
    min-height: 100vh;
    display: flex;
    justify-content: center;  
    align-items: center;

    font-family: ${inter.style.fontFamily};
`;

const BgShape = styled.img`
    position: absolute;
    top: 0;
    right: 0;
    width: 70%; 
    pointer-events: none; 
    z-index: 0;
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
    shouldForwardProp: (prop) => prop !== "$active",   
})<{ $active?: boolean }>`
    font-size: 1.7rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    font-family: ${inter.style.fontFamily};
    
    color: white;
    opacity: ${(props) => (props.$active ? 1.0 : 0.6)};

    &:hover {
        opacity: 1.0;
    }
`;

const BoxContainer = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const InfoBox = styled.div`
    width: 400px;
    height: 400px;
    padding: 15px 25px;
    margin-bottom: 20px;

    background: #FFFFFF;
    box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.15);
    border-radius: 10px;

    z-index: 1;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AddButton = styled.img`
    position: absolute;
    top: 50%;
    left: 450px; 
    transform: translateY(-50%);

    width: 40px;
    height: 40px;
    cursor: pointer;
    z-index: 10; 

    &:hover {
        opacity: 0.6;
    }
`;

const InfoHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const InfoTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
`;

const EditButton = styled.button`
    padding: 8px 18px;

    border-radius: 999px;
    border: none;
    background: #3f2316;
    color: #ffffff;
    cursor: pointer;

    font-size: 1rem;
    font-weight: 400;
    font-family: ${inter.style.fontFamily};

    &:hover {
        box-shadow: inset 0 0 0 1px #3f2316;
        background: #FFFFFF;
        color: #3f2316;
    }
`;

const Divider = styled.div`
    height: 1px;

    background: #e5e5e5;
`;

const Section = styled.div`
    padding: 10px 0;
`;

const SectionTitle = styled.div`
    margin-bottom: 5px;

    font-size: 1.1rem;
    font-weight: 700;
    font-family: "SOYO";
`;

const ItemRow = styled.div`
    display: flex;
    align-items: center;

    font-size: 1rem;
`;

const ItemName = styled.div`
    flex: 1;
`;

const ItemQty = styled.div`
    width: 40px;

    text-align: center;
`;

const ItemPrice = styled.div`
    width: 80px;

    text-align: right;
`;

const TotalRow = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-top: 1px solid #e5e5e5;
`;

const TotalLabel = styled.div`
    font-size: 1.1rem;
    font-weight: 700;
`;

const TotalAmount = styled.div`
    color: #b54450;

    font-size: 1.1rem;
    font-weight: 700;
`;

const OrderButton = styled.button`
    width: 400px;
    height: 50px;

    border: none;
    border-radius: 7px;
    background: #FFBFBE;
    color: #3F2316;
    box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.15);

    font-family: ${inter.style.fontFamily};
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;

    &:hover {
        background: #3F2316;
        color: white;
    }
`;

export default function InformationPage() {
    const dinner = { name: "잉글리시", qty: 1, price: 35000 };
    const options = [
        { name: "바게트", qty: 2, price: 3000 },
        { name: "베이컨", qty: 1, price: 0 },
        { name: "스테이크", qty: 1, price: 0 },
        { name: "에그 스크램블", qty: 1, price: 0 },
    ];
    const style = { name: "그랜드", qty: 1, price: 5000 };

    const total =
        dinner.price +
        options.reduce((sum, o) => sum + o.price, 0) +
        style.price;

    return (
        <Page>
            <BgShape src="/Bg_shape_3.svg" alt="bg shape 3" />
            <Logo src="/Logo-brown.svg" alt="logo" />
            <LogoutButton />

            <MenuWrapper>
                <MenuButton href="/dinner" >Dinner</MenuButton>
                <MenuButton href="/option">Option</MenuButton>
                <MenuButton href="/style">Style</MenuButton>
                <MenuButton href="/information" $active={true}>Information</MenuButton>
            </MenuWrapper>

            <BoxContainer>
                <InnerContainer>
                    <InfoBox>
                        <InfoHeader>
                            <InfoTitle>주문 내역</InfoTitle>
                            <EditButton>수정하기</EditButton>
                        </InfoHeader>
                        
                        <Divider />

                        <Section>
                            <SectionTitle>Dinner</SectionTitle>
                            <ItemRow>
                                <ItemName>{dinner.name}</ItemName>
                                <ItemQty>{dinner.qty}</ItemQty>
                                <ItemPrice>
                                ₩{dinner.price.toLocaleString("ko-KR")}
                                </ItemPrice>
                            </ItemRow>
                        </Section>

                        <Divider />

                        <Section>
                            <SectionTitle>Option</SectionTitle>
                            {options.map((item) => (
                                <ItemRow key={item.name}>
                                <ItemName>{item.name}</ItemName>
                                <ItemQty>{item.qty}</ItemQty>
                                <ItemPrice>
                                    ₩{item.price.toLocaleString("ko-KR")}
                                </ItemPrice>
                                </ItemRow>
                            ))}
                        </Section>

                        <Divider />

                        <Section>
                            <SectionTitle>Style</SectionTitle>
                            <ItemRow>
                                <ItemName>{style.name}</ItemName>
                                <ItemQty>{style.qty}</ItemQty>
                                <ItemPrice>
                                ₩{style.price.toLocaleString("ko-KR")}
                                </ItemPrice>
                            </ItemRow>
                        </Section>

                        <TotalRow>
                            <TotalLabel>총 금액</TotalLabel>
                            <TotalAmount>₩{total.toLocaleString("ko-KR")}</TotalAmount>
                        </TotalRow>
                    </InfoBox>

                    <OrderButton>주문하기</OrderButton>

                    <AddButton
                            src="/I-add.png"
                            alt="추가"
                            onClick={() => window.location.href = "/dinner"}
                    />
                </InnerContainer>
            </BoxContainer>
        </Page>
    );
}