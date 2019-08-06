import React, { useState } from "react"
import { css } from "emotion"

import { Pills } from "./pills"
import { CopyButton } from "./copy-button"
import { AtomSpinner } from "./atom-spinner"
const baseUrl = "https://www.khanacademy.org/embed_video?v="

export const createButton = (i, youtubeId) => `
  <button
    onclick="changeVideo('${baseUrl + youtubeId}')"
    style="
      background: #089de3;
      border: thin solid #089de3;
      border-radius: 5px;
      padding: 5px 9px;
      margin: 0 3px;
      color: #fff;
    "
  >
    Video ${i}
  </button>
`

export const createVideoString = videos => `
<div>
  <iframe
    id="kaskill-ka-player"
    style="width:853px;height:480px;border:none;background-color:ghostwhite;margin:auto;"
    scrolling="no"
    src="http://www.khanacademy.org/embed_video?v=${videos[0]}"
  ></iframe>
</div>
<div>
${videos.map((v, i) => createButton(i + 1, v)).join("")}
</div>
<script type="text/javascript">
 function changeVideo(url){
     document.getElementById("kaskill-ka-player").src = url;
 }
</script>`

export const createCodeString = (skill, videos) => {
  const videosDescription = skill.image_url
    ? videos.length > 0
      ? `<p>
  These videos will prepare you to solve problems similar
  to the one displayed above. When you are ready, please click
  the button below to practice this skill on Khan Academy.
</p>`
      : `<p>
  When you are ready, please click the button below to practice this
  skill on Khan Academy.
</p>`
    : videos.length > 0
    ? `<p>
  These videos will prepare you to successfully complete this skill on
  Khan Academy. When you are ready, please click the button below to
  practice this skill on Khan Academy.
</p>`
    : `<p>
        When you are ready, please click the button below to practice this
        skill on Khan Academy.
      </p>`

  return `<div style="font-family: Verdana">
  <h2>${skill.title}</h2>
  ${
    skill.image_url
      ? `<div style="text-align: center;">
    <img src="${skill.image_url}" alt="${skill.display_name + " image"}"/>
  </div>`
      : ""
  }
  ${videosDescription}
  ${videos.length > 0 ? createVideoString(videos) : ""}
  <div style="margin: auto;text-align:center;">
    <a
      href="${skill.ka_url}"
      target="_blank"
      rel="noopener noreferrer"
      style="color: white;
        font-family: Verdana;
        display: inline-block;
        margin: auto;
        width: 250px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        background-color: rgb(8, 157, 227);
        text-align: center;
        border-radius: 8px;
        border: thin solid white;
        box-shadow: rgb(0, 0, 0) 0px 0px 3px;
        cursor: pointer;
        text-decoration: none;"
    >
      Take me to practice this skill
    </a>
  </div>
</div>`
}

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCHING_SKILL_DATA_BEGIN":
      return {
        videos: [],
        skill: null,
        loading: true,
        error: false,
      }
    case "FETCHING_SKILL_DATA_SUCCESS":
      return {
        videos: action.videos,
        skill: action.skill,
        loading: false,
        error: false,
      }
    case "FETCHING_SKILL_DATA_ERROR":
      return {
        videos: [],
        skill: null,
        loading: false,
        error: true,
      }
    default:
      throw new Error(
        `${action.type} is an unhandled type in the code container reducer`
      )
  }
}

export const CodeContainer = ({ exercise }) => {
  const [{ videos, skill, loading, error }, dispatch] = React.useReducer(
    reducer,
    {
      videos: [],
      skill: null,
      loading: true,
      error: false,
    }
  )

  const [activeTab, setActiveTab] = React.useState("code")

  React.useEffect(() => {
    let isCurrent = true
    if (isCurrent && exercise) {
      dispatch({
        type: "FETCHING_SKILL_DATA_BEGIN",
      })
      Promise.all([
        fetch(
          `https://jgilgen.pythonanywhere.com/api/v1/exercises/${exercise}/videos`
        ).then(res => res.json()),
        fetch(
          `https://jgilgen.pythonanywhere.com/api/v1/exercises/${exercise}`
        ).then(res => res.json()),
      ])
        .then(([videos, skill]) => {
          dispatch({
            type: "FETCHING_SKILL_DATA_SUCCESS",
            videos: videos.map(v => v.youtube_id),
            skill,
          })
        })
        .catch(err => {
          console.error(err)
          dispatch({
            type: "FETCHING_SKILL_DATA_ERROR",
          })
        })
    }

    return () => {
      isCurrent = false
    }
  }, [exercise])

  const _loading = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <h2 style={{ margin: 0 }}>Retrieving Skill Data</h2>
      <AtomSpinner />
    </div>
  )

  return (
    <div
      className={css`
        width: 60%;
        text-align: left;
        padding: 10px;
      `}
    >
      {!exercise ? (
        <h1>Please select a skill</h1>
      ) : loading ? (
        _loading
      ) : error ? (
        <div>
          <h3 style={{ textAlign: "center" }}>Failed to fetch data.</h3>
          <h1 style={{ textAlign: "center" }}>
            <span role="img" aria-label="disappointed">
              😞
            </span>
          </h1>
        </div>
      ) : (
        <>
          <Pills
            tabs={[
              { id: "code", name: "Code" },
              { id: "rendered", name: "Rendered Code" },
            ]}
            activeTab={activeTab}
            clickHandler={setActiveTab}
          />

          {activeTab === "code" ? (
            <Code skill={skill} videos={videos} />
          ) : (
            <RenderedCode skill={skill} videos={videos} />
          )}
        </>
      )}
    </div>
  )
}

export const Code = ({ skill, videos }) => {
  const renderString = createCodeString(skill, videos)

  return (
    <>
      <CopyButton str={renderString} />
      <pre style={{ fontFamily: "monospace" }}>{renderString}</pre>
    </>
  )
}

const RenderedCode = ({ skill, videos }) => {
  const [view, setView] = useState(videos[0])
  const videosDescription = skill.image_url ? (
    videos.length > 0 ? (
      <p>
        These videos will prepare you to solve problems similar to the one
        displayed above. When you are ready, please click the button below to
        practice this skill on Khan Academy.
      </p>
    ) : (
      <p>
        When you are ready, please click the button below to practice this skill
        on Khan Academy.
      </p>
    )
  ) : videos.length > 0 ? (
    <p>
      These videos will prepare you to successfully complete this skill on Khan
      Academy. When you are ready, please click the button below to practice
      this skill on Khan Academy.
    </p>
  ) : (
    <p>
      When you are ready, please click the button below to practice this skill
      on Khan Academy.
    </p>
  )
  return (
    <div style={{ fontFamily: "Verdana" }}>
      <h2>{skill.title}</h2>
      {skill.image_url && (
        <div style={{ textAlign: "center" }}>
          <img src={skill.image_url} alt={skill.display_name} />
        </div>
      )}
      {videosDescription}
      {videos.length > 0 && (
        <div>
          <iframe
            id="kaskill-ka-player"
            title="kaskill-ka-player"
            style={{
              width: "853px",
              height: "480px",
              border: "none",
              backgroundColor: "ghostwhite",
              margin: "auto",
            }}
            scrolling="no"
            src={baseUrl + view}
          />
        </div>
      )}
      <div>
        <div>
          {videos.map((video, i) => (
            <button
              key={video}
              onClick={() => setView(video)}
              className={css`
                background: #089de3;
                border: thin solid #089de3;
                border-radius: 5px;
                padding: 5px 9px;
                margin: 0 3px;
                color: #fff;
              `}
            >
              Video {i + 1}
            </button>
          ))}
        </div>

        <div style={{ margin: "auto", textAlign: "center" }}>
          <a
            href="https://www.khanacademy.org/exercise/multiplying_decimals"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "white",
              fontFamily: "Verdana",
              display: "inline-block",
              margin: "auto",
              width: 250,
              height: 50,
              lineHeight: "50px",
              fontSize: 16,
              backgroundColor: "#089de3",
              textAlign: "center",
              borderRadius: 8,
              border: "thin solid white",
              boxShadow: "0px 0px 3px #000",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Take me to practice this skill
          </a>
        </div>
      </div>
    </div>
  )
}
