import React, {Component} from 'react'
import {connect} from 'react-redux'

import {selectSkill, getSkillList} from '../actions'

import SkillList from './SkillList'

@connect((state) => ({
  isFetching: state.skill_list.isFetching,
  skill_list: state.skill_list.skills,
  value: state.skill_list.value
}),{selectSkill, getSkillList})
export default class Selector extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const {getSkillList, skill_list} = this.props
    if(Object.getOwnPropertyNames(skill_list).length === 0){
      getSkillList()
    }
  }

  render(){
    const {value, skill_list, isFetching, selectSkill} = this.props
    const hidden = isFetching ? 'hidden' : ''

    return (
      <div>
        <ul className={"nav nav-list "+hidden}>
          <form>
            <div className="form-group">
            <li>
              <input
                className="form-control floating-label"
                type="text"
                name="suggestion"
                value={value}
                id="suggestion"
                placeholder="Type to find an exercise"
                onChange={selectSkill}
              />
            </li>
            <span className="material-input"></span>
            </div>
          </form>
        </ul>
        <SkillList/>
      </div>
    )
  }
}
