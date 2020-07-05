import { SEARCH_TOGGLE, MOBILE_RIGHT_TOGGLE, RIGHT_SIDEBAR, SWITCH_TOGGLE } from '../actionTypes'

export const SearchBarToggle = (toggleVal) =>{  
  return(
    {
        type: SEARCH_TOGGLE,
        toggleVal
    }
  )
}

export const MobileRightToggle = (toggleVal) => {
  return(
    {
      type: MOBILE_RIGHT_TOGGLE,
      toggleVal
    }
  )
}

export const RightSidebarToggle = (toggleVal) => {
  return(
    {
      type: RIGHT_SIDEBAR,
      toggleVal
    }
  )
}

export const SwitchToggle = (toggleVal) => {
  return(
    {
      type: SWITCH_TOGGLE,
      toggleVal
    }
  )
}

