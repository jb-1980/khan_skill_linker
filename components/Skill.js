import React from "react"
import { connect } from "react-redux"

@connect(state => ({
  skill: state.skill.skillProps,
  videos: state.skill.videos
}))
export default class Skill extends React.Component {
  render() {
    const { skill, videos } = this.props

    const image = skill.image_url ? (
      <p style={{ textAlign: "center" }}>
        <img src={skill.image_url} alt={skill.display_name + " image"} />
      </p>
    ) : (
      ""
    )

    const videosDescription = skill.image_url ? (
      videos.length > 0 ? (
        <p>
          These videos will prepare you to solve problems similar to the one
          displayed above. When you are ready, please click the button below to
          practice this skill on Khan Academy.
        </p>
      ) : (
        <p>
          When you are ready, please click the button below to practice this
          skill on Khan Academy.
        </p>
      )
    ) : videos.length > 0 ? (
      <p>
        These videos will prepare you to successfully complete this skill on
        Khan Academy. When you are ready, please click the button below to
        practice this skill on Khan Academy.
      </p>
    ) : (
      <p>
        When you are ready, please click the button below to practice this skill
        on Khan Academy.
      </p>
    )

    return (
      <div>
        <h2>{skill.display_name}</h2>
        {image}
        {videosDescription}
        {videos.length > 0 ? this.renderVideos() : ""}
        <div style={{ margin: "auto", textAlign: "center" }}>
          <a
            href={skill.ka_url}
            target="_blank"
            style={{
              color: "white",
              fontFamily: "'Times New Roman', Times,serif",
              display: "inline-block",
              margin: "auto",
              width: "250px",
              height: "50px",
              lineHeight: "50px",
              fontSize: "14pt",
              backgroundColor: "#80ac07",
              textAlign: "center",
              borderRadius: "3px",
              border: "thin solid white",
              boxShadow: "4px 4px 14px #000",
              backgroundImage: "linear-gradient(to bottom, #8aba08, #719807)",
              backgroundRepeat: "repeat-x",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            Take me to practice this skill
          </a>
        </div>
      </div>
    )
  }

  renderVideos() {
    const { videos } = this.props

    const videoButtons = videos.map((video, key) => {
      return (
        <button
          key={key}
          onClick={
            "changeVideo('https://www.khanacademy.org/embed_video?v=" +
            video +
            ")"
          }
          className="btn-success btn-large"
        >
          Video {key + 1}
        </button>
      )
    })

    return (
      <div>
        <p>
          <iframe
            id="kaskill-ka-player"
            style={{
              width: "853px",
              height: "480px",
              border: "none",
              backgroundColor: "ghostwhite",
              margin: "auto"
            }}
            scrolling="no"
            src={"https://www.khanacademy.org/embed_video?v=" + videos[0]}
            allowFullScreen=""
          />
        </p>
        <p>{videoButtons}</p>
        <script type="text/javascript">
          function changeVideo(url){"{"}
          document.getElementById("kaskill-ka-player").src = url;
          {"}"}
        </script>
      </div>
    )
  }
}
