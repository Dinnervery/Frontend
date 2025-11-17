"use client";

import Image from "next/image";
import styled from "@emotion/styled";
import { useState } from "react";

const Page = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;       
    overflow: hidden;
    background-color: #FDF5E6;
`;

const BgShape2Wrap = styled.div`
    // 여백 없애기
    position: fixed;   
    inset: 0;

    overflow: hidden;
    z-index: 0;
`;

const LeftArea = styled.div`
    position: absolute;
    top: 50%;
    left: 20vw;           
    transform: translate(-50%, -50%);

    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    color: #FDF5E6;

    a {
        cursor: pointer;
        text-decoration: none;
        color: #FDF5E6; 
        font-size: 18px;
    }
`;

const TabWrap = styled.div`
    display: flex;
    gap: 16px;
    font-size: 18px;
`;

const TabItem = styled.span<{ active: boolean }>`
    cursor: pointer;
    text-decoration: none;
    color: #FDF5E6;

    font-family: "SOYO";
    font-weight: ${({ active }) => (active ? 700 : 400)};
`;

const RightContent = styled.div`
    position: absolute;
    top: 50%;
    right: 10vw;
    transform: translateY(-50%);

    z-index: 1;
    width: 28vw;
    display: flex;
    flex-direction: column;
    gap: 32px;

    color: #6b4426;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    font-size: 18px;
`;

const Input = styled.input`
    border: none;
    border-bottom: 1px solid #8c6543;
    background: transparent;
    padding: 15px 0;
    font-size: 16px;
    font-family: "SOYO", sans-serif;
    outline: none;
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
`;

const LoginButton = styled.button<{ isDisabled: boolean }>`
    border: none;
    border-radius: 10px;
    padding: 12px 40px;
    font-size: 16px;
    font-family: "SOYO", sans-serif;

    background-color: #ffbfbe;
    color: #3F2316;

    cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
    opacity: ${({ isDisabled }) => (isDisabled ? 0.3 : 1)};
`;

export default function LoginPage() {
    const [selected, setSelected] = useState<"login" | "signup">("login");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const isLoginDisabled = !id.trim() || !password.trim();

    return (
        <Page>
            <BgShape2Wrap>
                <Image
                    src="/Bg_shape_2.svg"
                    alt="bg_shape_2"
                    width={0}
                    height={0}
                    priority
                    style={{
                        position: "absolute",
                        left: 0,
                        bottom: 0,   
                        height: "100%",  
                        width: "auto",   
                        display: "block" 
                    }}
                />
            </BgShape2Wrap>

            <LeftArea>
                <Image
                    src="/Logo_beige.svg"
                    alt="logo"
                    width={350}
                    height={100}
                    priority
                />

                <TabWrap>
                    <TabItem
                        active={selected === "login"}
                        onClick={() => setSelected("login")}
                    >
                        로그인
                    </TabItem>

                    <span>|</span>

                    <TabItem
                        active={selected === "signup"}
                        onClick={() => setSelected("signup")}
                    >
                        회원가입
                    </TabItem>
                </TabWrap>
            </LeftArea>
            
            <RightContent>
                {selected === "login" && (
                        <Form>
                            <Field>
                            <Label htmlFor="login-id">ID</Label>
                            <Input
                                id="login-id"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                            </Field>

                            <Field>
                            <Label htmlFor="login-password">Password</Label>
                            <Input
                                id="login-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            </Field>

                            <ButtonRow>
                            <LoginButton
                                type="button"
                                disabled={isLoginDisabled}
                                isDisabled={isLoginDisabled}
                            >
                                로그인
                            </LoginButton>
                            </ButtonRow>
                        </Form>
                        )}

                        {selected === "signup" && (
                        <div>회원가입 폼</div>
                        )}
            </RightContent>
        </Page>
    );
}