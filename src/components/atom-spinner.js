import React from "react"
import { css, keyframes } from "emotion"

const atomSpinnerKey1 = keyframes`
100% {
    transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
  }
`

const atomSpinnerKey2 = keyframes`
100% {
    transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
  }
`

const atomSpinnerKey3 = keyframes`
100% {
    transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
  }
`

export const AtomSpinner = ({ color = "#089de3", size = "40px", ...props }) => {
  const spinnerLine = css`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation-duration: 1s;
    border-left-width: calc(${size} / 25);
    border-top-width: calc(${size} / 25);
    border-left-color: ${color};
    border-left-style: solid;
    border-top-style: solid;
    border-top-color: transparent;
    &:nth-child(1) {
      animation: ${atomSpinnerKey1} 1s linear infinite;
      transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
    }
    &:nth-child(2) {
      animation: ${atomSpinnerKey2} 1s linear infinite;
      transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
    }
    &:nth-child(3) {
      animation: ${atomSpinnerKey3} 1s linear infinite;
      transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
    }
  `

  return (
    <div
      className={css`
        box-sizing: border-box;
        height: ${size};
        width: ${size};
        overflow: hidden;
      `}
      {...props}
    >
      <div
        className={css`
          position: relative;
          display: block;
          height: 100%;
          width: 100%;
        `}
      >
        <div className={spinnerLine} />
        <div className={spinnerLine} />
        <div className={spinnerLine} />
        <div
          className={css`
            display: block;
            position: absolute;
            color: ${color};
            font-size: calc(${size} * 0.24);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          `}
        >
          ●
        </div>
      </div>
    </div>
  )
}
