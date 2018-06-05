import React from 'react'
import {connect} from 'react-redux'

import Skill from '../components/Skill'
import SkillString from '../components/SkillString'

@connect((state) => ({
  isFetchingSkill: state.skill.isFetchingSkill,
  isFetchingVideos: state.skill.isFetchingVideos,
  skill: state.skill.skillProps
}))
export default class SkillDisplay extends React.Component {
  render(){
    const {isFetchingSkill, isFetchingVideos, skill} = this.props

    if(Object.getOwnPropertyNames(skill).length === 0){
      return (
        <div
          className="col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 main"
          style={{height:'90vh'}}>
          <h1 style={{
              textAlign:'center',
              position:'relative',
              top:'50%',
              transform: 'translateY(-50%)'}}
          >
            Select a Khan Academy skill from the menu
          </h1>
        </div>
      )
    }

    if(isFetchingSkill || isFetchingVideos){
      return (
        <div className="col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 main"
          style={{height:'90vh'}}>
          <div style={{
              textAlign:'center',
              margin: 'auto',
              position:'relative',
              top:'50%',
              transform: 'translateY(-50%)'}}
          >
            <img src="static/squares.gif"/>
          </div>
        </div>
      )
    }

    return(
      <div className="col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 main">
        <ul className="nav nav-pills" role="tablist">
          <li role="presentation" className="active">
            <a href="#html-view" aria-controls="home" role="tab" data-toggle="tab">
              HTML
            </a>
          </li>
          <li role="presentation">
            <a href="#preview-view" aria-controls="profile" role="tab" data-toggle="tab">
              Preview
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div role="tabpanel" className="tab-pane active" id="html-view">
            <SkillString/>
          </div>
          <div role="tabpanel" className="tab-pane" id="preview-view">
            <Skill/>
          </div>
        </div>
      </div>
    )
  }
}
