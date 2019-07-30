import React from "react"
import { css } from "emotion"

const selected = css`
  font-weight: bold;
  color: #089de3;
  &:after {
    content: " ";
    position: absolute;
    width: 0;
    height: 15px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid #089de3;
    left: 50%;
    margin-left: -7px;
    bottom: -3px;
    display: block;
  }
`

export const Pills = ({ tabs, activeTab, clickHandler }) => (
  <>
    <div
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      {tabs.map(tab => (
        <li
          key={tab.id}
          className={css`
            display: inline-block;
            margin: 0 10px;
            position: relative;
            padding: 0 0 5px 0;
            cursor: pointer;
            ${activeTab === tab.id && selected};
          `}
          onClick={() => clickHandler(tab.id)}
        >
          {tab.name}
        </li>
      ))}
    </div>
    <hr
      style={{
        margin: 2,
        height: 3,
        background: "#089de3",
        width: "100%",
      }}
    />
  </>
)
