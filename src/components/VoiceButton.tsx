"use client";

import { useState } from "react";
import styled from "@emotion/styled";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type AiOrderResult = {
    reply: string;
    state: "ordering" | "confirming" | "done" | string;
    orderSummary: any | null;
};

export type AiOrderResponse = {
    success: boolean;
    result: AiOrderResult | null;
    error: string | null;
};

const VoiceButtonRoot = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;

    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
`;

const IconWrapper = styled.div<{ $size: number }>`
    width: ${(p) => p.$size}px;
    height: ${(p) => p.$size}px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const VoiceIcon = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`;

type VoiceOrderButtonProps = {
    onResult?: (result: AiOrderResponse) => void;
    onError?: (message: string) => void;
    disabled?: boolean;
    iconSize?: number;
    ariaLabel?: string;
    iconSrc?: string;
    onUserText?: (text: string) => void;
};

export default function VoiceOrderButton({
    onResult,
    onError,
    iconSrc = "/Voice.svg",
    ariaLabel = "음성 주문",
    disabled,
    iconSize = 30,
    onUserText,
}: VoiceOrderButtonProps) {
    const [loading, setLoading] = useState(false);

    const sendTextToServer = async (text: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                const msg = "로그인 정보가 없습니다.";
                onError ? onError(msg) : alert(msg);
                return;
            }

            const res = await fetch(`${API_URL}/ai/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({ text }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("AI 주문 API 실패:", errorText);
                const msg = "음성 주문 처리에 실패했습니다.";
                onError ? onError(msg) : alert(msg);
                return;
            }

            const data: AiOrderResponse = await res.json();
            console.log("AI 주문 응답:", data);

            if (!onResult) {
                const msg =
                    data.result?.reply ||
                    data.error ||
                    "음성 주문 처리에 실패했습니다.";
                onError ? onError(msg) : alert(msg);
            } else {
                onResult(data);
            }
        } catch (e) {
            console.error(e);
            const msg = "음성 주문 처리 중 오류가 발생했습니다.";
            onError ? onError(msg) : alert(msg);
        }
    };

    const handleClick = async () => {
        if (loading || disabled) return;
        if (typeof window === "undefined") return;

        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            const msg = "이 브라우저에서는 음성 인식을 지원하지 않습니다.";
            onError ? onError(msg) : alert(msg);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "ko-KR";       
        recognition.interimResults = false;  
        recognition.maxAlternatives = 1;

        setLoading(true);

        recognition.onresult = async (event: any) => {
            const text = event.results[0][0].transcript as string;
            console.log("음성 인식 결과:", text);

            if (onUserText) {
                onUserText(text);
            }

            await sendTextToServer(text);
        };

        recognition.onerror = (event: any) => {
            console.error("음성 인식 에러:", event.error);
            const msg = "음성 인식 중 오류가 발생했습니다.";
            onError ? onError(msg) : alert(msg);
            setLoading(false);
        };

        recognition.onend = () => {
            setLoading(false);
        };

        recognition.start();
    };

    return (
        <VoiceButtonRoot
            type="button"
            onClick={handleClick}
            disabled={disabled || loading}
            aria-label={ariaLabel}
        >
            <IconWrapper $size={iconSize}>
                <VoiceIcon src={iconSrc} alt={ariaLabel} />
            </IconWrapper>
        </VoiceButtonRoot>
    );
}