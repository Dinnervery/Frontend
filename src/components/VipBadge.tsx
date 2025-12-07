"use client";

import styled from "@emotion/styled";
import { useVip } from "@/hooks/useVip";
import { useState } from "react";

const VipWrapper = styled.div`
    position: absolute;
    top: 20px;
    right: 15px;
    z-index: 1000;
`;

const VipIcon = styled.img`
    width: 70px;  
    height: auto;
    cursor: grab;
`;

const Tooltip = styled.div<{ $visible: boolean }>`
    opacity: ${(p) => (p.$visible ? 1 : 0)};
    pointer-events: none;
    transition: opacity 0.2s ease;
    padding: 15px 0px;
    max-width: 200px;
    white-space: pre-line;
    transform: translateX(-40px);

    color: #FFBFBE;
    border-radius: 8px;

    font-size: 13px;
`;

export default function VipBadge() {
    const { isVip } = useVip();
    const [showTooltip, setShowTooltip] = useState(false);

    if (!isVip) return null;

    return (
        <VipWrapper>
            <VipIcon
                src="/VIP.svg"
                alt="VIP 등급"
                draggable
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            />
            <Tooltip $visible={showTooltip}>
                달 15회 이상 주문 시, 10% 할인!
                {"\n"}* 할인은 Cart 페이지에서 적용됩니다.
            </Tooltip>
        </VipWrapper>
    );
}