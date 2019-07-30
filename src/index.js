import React from "react"
import ReactDOM from "react-dom"
import { css } from "emotion"

import { Navbar } from "./components/navbar"
import { Sidebar } from "./components/sidebar"
import { CodeContainer } from "./components/code-container"
import { DataProvider } from "./contexts/data-context"
import "./index.css"

const App = () => {
  const [exercise, setExercise] = React.useState(null)

  return (
    <div>
      <Navbar />
      <div
        className={css`
          display: flex;
          min-height: calc(100vh - 50px);
          background: #eee;
          text-align: left;
        `}
      >
        <Sidebar selectHandler={setExercise} selected={exercise} />
        <CodeContainer exercise={exercise} />
      </div>
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,
  rootElement
)
