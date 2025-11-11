"use client";

import Image from "next/image";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";

const Text = styled.p`
  position: absolute;
  top: calc(40% + 110px);
  left: 10%;
  margin: 50px 0;
  color: #A17454;
  font-size: 23px;
  font-family: 'SOYO', sans-serif;
  white-space: pre-line; /* 줄바꿈 유지 */
  z-index: 20;
`;

const Highlight = styled.span`
  font-size: 25px;
  color: #6B4426;
`;

const Page = styled.div`
  position: relative;
  min-height: 100dvh;
  overflow: hidden;
`;

const BgWrap = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  /* Image fill 사용 시, 부모가 relative/absolute */
  & > span,
  & img {
    object-fit: cover !important;
  }
`;

const Line = styled.div`
  position: absolute;
  top: calc(40% - 20px);
  left: calc(10% + 350px / 2); 
  transform: translateX(-50%);
  width: 90px;       
  height: 3px;   
  background-color: #3F2316;
  z-index: 15;       
`;

const LogoBrownWrap = styled.div`
  position: absolute;
  top: 40%;
  left: 10%;
  z-index: 10;
  width: 350px; 
  height: 90px;
`;

const LogoBrown = styled(Image)`
  display: block;
`;

const BgShapeWrap = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;    
  z-index: 5;
`;

const BgShape = styled(Image)`
  display: block;
  width: 100% !important;
  height: auto !important;
`;

export default function Home() {
  return (
    <Page>
      <Global
        styles={css`
          @font-face {
            font-family: 'SOYO';
            src: url('/SOYO_Regular.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
          // 라이트/다크모드
          :root {
            color-scheme: light dark;
          }
          html, body {
            margin: 0;
            padding: 0;
          }
          body {
            font-family: 'SOYO', sans-serif;
          }
          // 링크에 사용
          // a { color: inherit; text-decoration: underline; }
        `}
      />

      <BgWrap aria-hidden>
        <Image src="/Bg_image.png" alt="" fill priority />
      </BgWrap>

      <Line />

      <LogoBrownWrap>
        <LogoBrown
          src="/Logo-brown.svg"
          alt="logo-brown"
          fill
          priority
          style={{ objectFit: "contain" }} 
        />
      </LogoBrownWrap>

      <Text>
        특별한 날에 집에서 편안히 보내면서{'\n'}
        당신의 <Highlight>남편</Highlight>을 감동시켜라
      </Text>

      <BgShapeWrap>
        <BgShape
          src="/Bg_shape.svg"
          alt="bg_shape"
          width={1920}
          height={300}
          sizes="100vw"
          priority
        />
      </BgShapeWrap>
    </Page>
  );
}