import React from "react"
import { css } from "emotion"

import { useDataContext } from "../contexts/data-context"
import { AtomSpinner } from "./atom-spinner"

const exerciseClass = css`
  color: #089de3;
  margin: 10px 0;
  cursor: pointer;
  font-family: monospace;
`

export const Sidebar = ({ selectHandler, selected }) => {
  const [keyword, setKeyword] = React.useState("")
  const { exercises, loading, error, refreshExercises } = useDataContext()
  const filteredExercises = exercises.filter(e => e.title.includes(keyword))

  const exerciseList = filteredExercises.slice(0, 10).map(({ name, title }) => (
    <div
      key={name}
      className={exerciseClass}
      onClick={() => selectHandler(name)}
    >
      {title}
    </div>
  ))

  return (
    <div
      className={css`
        width: 40%;
        background: #fff;
        padding: 10px;
      `}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <h2 style={{ margin: 0 }}>Retrieving skills</h2>
          <h4 style={{ margin: 0 }}>(this could take a minute)</h4>
          <AtomSpinner />
        </div>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div style={{ fontSize: 18 }}>
            <h4 style={{ display: "inline-block", marginRight: 20 }}>
              Skill finder
            </h4>
            <button
              className={css`
                display: inline-block;
                background: #089de3;
                border: none;
                color: #fff;
                padding: 5px 7px;
                border-radius: 5px;
                font-family: monospace;
                font-size: 1em;
              `}
              onClick={refreshExercises}
            >
              Refresh List
            </button>
          </div>
          <input
            onChange={e => setKeyword(e.target.value)}
            value={keyword}
            placeholder="Type to find a skill"
            type="text"
            className={css`
              border: none;
              border-bottom: thick solid #089de3;
              width: 90%;
              height: 25px;
              margin: 10px 0;
            `}
          />
          {exerciseList}
        </>
      )}
    </div>
  )
}
