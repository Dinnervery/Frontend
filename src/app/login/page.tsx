"use client";

import Image from "next/image";
import styled from "@emotion/styled";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const Page = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;       
    overflow: hidden;
    background-color: #FDF5E6;
`;

const BgShape = styled.div`
    // 여백 없애기
    position: fixed;   
    inset: 0;

    overflow: hidden;
    z-index: 0;
`;

const LeftArea = styled.div`
    position: absolute;
    top: 50%;
    left: 290px;           
    transform: translate(-50%, -50%);

    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    color: #FDF5E6;
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
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    color: #6b4426;
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
`;

const Input = styled.input`
    padding: 10px 0;
    margin: 0 0 10px 0;

    border: none;
    border-bottom: 1px solid #8c6543;
    background: transparent;
    outline: none;

    font-size: 18px;
    font-family: ${inter.style.fontFamily};
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const NextButton = styled.button<{ isDisabled: boolean }>`
    border: none;
    border-radius: 10px;
    padding: 12px 40px;
    font-size: 16px;
    font-family: ${inter.style.fontFamily};

    background-color: #ffbfbe;
    color: #3f2316;

    cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
    opacity: ${({ isDisabled }) => (isDisabled ? 0.3 : 1)};
`;

type SignupResponse = {
    customerId: number;
    loginId: string;
    name: string;
    phoneNumber: string;
    grade: "BASIC" | "VIP";
    orderCount: number;
};

export default function LoginPage() {
    const router = useRouter();

    const [selected, setSelected] = useState<"login" | "signup">("login");
    
    // 로그인 폼 상태
    const [loginId, setLoginId] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // 회원가입 폼 상태
    const [signupId, setSignupId] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupName, setSignupName] = useState("");
    const [signupPhone, setSignupPhone] = useState("");
    const [signupAddress, setSignupAddress] = useState("");

    const isLoginDisabled = !loginId.trim() || !loginPassword.trim();
    const isSignupDisabled =
        !signupId.trim() ||
        !signupPassword.trim() ||
        !signupName.trim() ||
        !signupPhone.trim() ||
        !signupAddress.trim();

    // 로그인 버튼
    const handleLoginClick = async() => {
        if (isLoginDisabled) {
            alert("ID와 Password를 모두 입력해주세요.");
            return;
        }
        
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    loginId,
                    password: loginPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "로그인에 실패했습니다.");
                return;
            }

            if (typeof window !== "undefined" && data) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", String(data.userId));
                localStorage.setItem("loginId", data.loginId);
                localStorage.setItem("name", data.name);
                localStorage.setItem("role", data.role);

                if (data.role === "COOK" || data.role === "DELIVERY") {
                    // 직원
                    localStorage.setItem("staffToken", data.token);
                    if (data.task) {
                        localStorage.setItem("staffTask", data.task); // "COOK" | "DELIVERY"
                    }
                    localStorage.setItem("staffId", String(data.userId));
                    localStorage.setItem("staffName", data.name);
                }

                if (data.role === "CUSTOMER") {
                    // 고객
                    localStorage.setItem("customerToken", data.token);
                    localStorage.setItem("customerId", String(data.userId));
                    localStorage.setItem("customerName", data.name);
                    if (data.grade) {
                        localStorage.setItem("customerGrade", data.grade);
                    }
                }
            } 
            
            // 직원 확인
            if (data.role === "COOK" || data.task === "COOK") {
                router.push("/cookingStaff");
                return;
            }

            if (data.role === "DELIVERY" || data.task === "DELIVERY") {
                router.push("/deliveringStaff");
                return;
            }

            // 그 외는 고객
            router.push("/dinner");

        } catch (error: any) {
            console.error("error:", error);
            alert(`에러: ${error?.message || error}`);
        }
    };

    // 회원가입
    const handleSignupClick = async() => {
        if (isSignupDisabled) {
            alert("모든 정보가 필요합니다.");
            return;
        }

        if (!API_URL) {
            alert("API URL이 설정되어 있지 않습니다.");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/auth/customer/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    loginId: signupId,
                    password: signupPassword,
                    name: signupName,
                    phoneNumber: signupPhone,
                    address: signupAddress,
                }),
            });

            const data: SignupResponse | { message?: string } = await res.json();

            if (!res.ok) {
                alert(
                    ("message" in data && data.message) ||
                        "회원가입에 실패했습니다."
                );
                return;
            }

            // 성공
            alert("회원가입이 완료되었습니다.");

            // 회원가입 폼 비우기
            setSignupId("");
            setSignupPassword("");
            setSignupName("");
            setSignupPhone("");
            setSignupAddress("");

            // 로그인 탭
            setSelected("login");
        } catch (error: any) {
            console.error("signup error:", error);
            alert(`에러: ${error?.message || error}`);
        }
    };

    return (
        <Page>
            <BgShape>
                <Image
                    src="/Bg_shape_2.svg"
                    alt="bg shape 2"
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
            </BgShape>

            <LeftArea>
                <Image
                    src="/Logo-beige.svg"
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
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                            />
                            </Field>

                            <Field>
                            <Label htmlFor="login-password">Password</Label>
                            <Input
                                id="login-password"
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            </Field>

                            <ButtonRow>
                                <NextButton
                                    type="button"
                                    onClick={handleLoginClick}
                                    disabled={isLoginDisabled}
                                    isDisabled={isLoginDisabled}
                                >
                                    로그인
                                </NextButton>
                            </ButtonRow>
                        </Form>
                        )}

                {selected === "signup" && (
                    <Form>
                        <Field>
                            <Label htmlFor="signup-id">ID</Label>
                            <Input
                                id="signup-id"
                                value={signupId}
                                onChange={(e) => setSignupId(e.target.value)}
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="signup-password">Password</Label>
                            <Input
                                id="signup-password"
                                type="password"
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="signup-name">이름</Label>
                            <Input
                                id="signup-name"
                                value={signupName}
                                onChange={(e) => setSignupName(e.target.value)}
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="signup-phone">연락처</Label>
                            <Input
                                id="signup-phone"
                                value={signupPhone}
                                onChange={(e) => setSignupPhone(e.target.value)}
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="signup-address">주소</Label>
                            <Input
                                id="signup-address"
                                value={signupAddress}
                                onChange={(e) => setSignupAddress(e.target.value)}
                            />
                        </Field>

                        <ButtonRow>
                            <NextButton
                                type="button"
                                onClick={handleSignupClick}
                                disabled={isSignupDisabled}
                                isDisabled={isSignupDisabled}
                            >
                                회원가입
                            </NextButton>
                        </ButtonRow>
                    </Form>
                )}
            </RightContent>
        </Page>
    );
}