import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchSkill} from '../actions'

@connect((state) => ({
  isFetching: state.skill_list.isFetching,
  skill_list: state.skill_list.skills,
  value: state.skill_list.value
}), {fetchSkill})
export default class SkillList extends Component {
  render(){
    const {isFetching, skill_list, value, fetchSkill} = this.props

    if(isFetching){
      return (
        <div>
          <h4 style={{textAlign:'center'}}>Fetching skill list</h4>
          <div style={{
              textAlign:'center',
              margin: 'auto'}}
          >
            <img src="static/squares.gif" style={{height:'60px',width:60}}/>
          </div>
        </div>
      )
    }

    const skills = Object.keys(skill_list).filter(name =>
      // check that the skill name is starts with the input box value
      // and return the first 10 matches
      skill_list[name].display_name.toLowerCase().includes(value.toLowerCase())
    ).slice(0,10)

    const list = skills.map( (name, key) => {
      return (
        <li key={key}
          className="withripple">
          <a
            style={{cursor:"pointer",color: "#009688"}}
            onClick={fetchSkill.bind(this, name)}>
            {skill_list[name].display_name}
          </a>
        </li>
      )
    })

    return (
      <ul className="nav nav-list">
        {list}
      </ul>
    )
  }
}
