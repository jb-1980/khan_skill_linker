import { combineReducers } from "redux"

import {
  REQUEST_SKILL_LIST,
  RECEIVE_SKILL_LIST,
  ERROR_SKILL_LIST,
  SELECT_SKILL,
  REQUEST_SKILL,
  RECEIVE_SKILL,
  REQUEST_VIDEOS,
  RECEIVE_VIDEOS,
  SET_SKILL_NAME,
} from "../actions"

function skill(
  state = {
    isFetchingSkill: false,
    isFetchingVideos: false,
    skillName: "",
    skillProps: {},
    videos: [],
  },
  action
) {
  switch (action.type) {
    case REQUEST_SKILL:
      return Object.assign({}, state, {
        isFetchingSkill: true,
        skill_name: action.skill_name,
      })

    case RECEIVE_SKILL:
      return Object.assign({}, state, {
        isFetchingSkill: false,
        skillProps: action.skillProps,
      })

    case SET_SKILL_NAME:
      return Object.assign({}, state, {
        skillName: action.skillName,
      })

    case REQUEST_VIDEOS:
      return Object.assign({}, state, {
        videos: [],
        isFetchingVideos: true,
      })

    case RECEIVE_VIDEOS:
      return Object.assign({}, state, {
        videos: action.videos,
        isFetchingVideos: false,
      })

    default:
      return state
  }
}

function skill_list(
  state = {
    isFetching: true,
    value: "",
    skills: {},
  },
  action
) {
  switch (action.type) {
    case SELECT_SKILL:
      return Object.assign({}, state, {
        isFetching: false,
        value: action.value,
      })

    case REQUEST_SKILL_LIST:
      return Object.assign({}, state, {
        isFetching: true,
      })

    case RECEIVE_SKILL_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        skills: action.skills,
      })

    case ERROR_SKILL_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        err: action.err,
      })

    default:
      return state
  }
}

export default combineReducers({
  skill,
  skill_list,
})
