import React from 'react'
import {connect} from 'react-redux'

@connect((state) => ({
  isFetchingSkill: state.skill.isFetchingSkill,
  isFetchingVideos: state.skill.isFetchingVideos,
  skill: state.skill.skillProps,
  videos: state.skill.videos
}))
export default class SkillString extends React.Component {
  render(){
    const {isFetchingSkill, isFetchingVideos, skill, videos, state} = this.props

    const image = skill.image_url ? (
      `<p style="text-align: center;">
        <img src="${skill.image_url}" alt="${skill.display_name + " image"}"/>
      </p>`
    ) : ''

    const videosDescription = skill.image_url ? (
      videos.length > 0 ? (
       `<p>
          These videos will prepare you to solve problems similar
          to the one displayed above. When you are ready, please click
          the button below to practice this skill on Khan Academy.
        </p>`
      ) : (
       `<p>
          When you are ready, please click the button below to practice this
          skill on Khan Academy.
        </p>`
      )

    ) : (
      videos.length > 0 ? (
       `<p>
          These videos will prepare you to successfully complete this skill on
          Khan Academy. When you are ready, please click the button below to
          practice this skill on Khan Academy.
        </p>`
      ) : (
       `<p>
          When you are ready, please click the button below to practice this
          skill on Khan Academy.
        </p>`
      )

    )

    return(
      <pre>
      {`
      <h2>${skill.display_name}</h2>
        ${image}
        ${videosDescription}
        ${videos.length > 0 ? this.renderVideos(): ''}
        <div style="margin: auto;text-align:center;">
          <a
            href="${skill.ka_url}"
            target="_blank"
            style="color: white;
              font-family: 'Times New Roman', Times,serif;
              display: inline-block; margin: auto;
              width: 250px; height: 50px; line-height: 50px; font-size: 14pt;
              background-color: #80ac07; text-align: center;
              -webkit-border-radius: 3px; -moz-border-radius: 3px;
              border-radius: 3px; border: thin solid white;
              box-shadow: 4px 4px 14px #000;
              -moz-box-shadow: 4px 4px 14px #000;
              -webkit-box-shadow: 4px 4px 14px #000;
              background-image: linear-gradient(to bottom, #8aba08, #719807);
              background-repeat: repeat-x; cursor: pointer; text-decoration:none;"
          >
            Take me to practice this skill
          </a>
        </div>
      </div>`}
    </pre>
    )
  }

  renderVideos(){
    const {videos} = this.props

    const videoButtons = videos.map((video,key) => {
      return (
        `<button onclick="changeVideo('http://www.khanacademy.org/embed_video?v=${video}')"}
          class="btn-success btn-large"
        >
          Video ${key + 1}
        </button>`
      )
    })

    return (
        `<p>
          <iframe id="kaskill-ka-player" style="width:853px;height:480px;
                  border:none;background-color:ghostwhite;margin:auto;"
                  scrolling="no"
                  src="http://www.khanacademy.org/embed_video?v=${videos[0]}"
                  allowfullscreen=""
                  webkitallowfullscreen="" mozallowfullscreen=""
          >
          </iframe>
        </p>
        <p>
          ${videoButtons}
        </p>
        <script type="text/javascript">
           function changeVideo(url){
               document.getElementById("kaskill-ka-player").src = url;
           }
        </script>
      `
    )
  }
}
