import { SEARCH_TOGGLE, MOBILE_RIGHT_TOGGLE, RIGHT_SIDEBAR, SWITCH_TOGGLE } from '../actionTypes'

const Initial_state = {
    searchToggle: false,
    mobileRightToggle: false,
    rightSidebarToggle: false,
    switchToggle: false
}

const Common = (state=Initial_state, action) => {
    switch (action.type) {
        case SEARCH_TOGGLE:
             state.searchToggle = !state.searchToggle;
             return state;
        case MOBILE_RIGHT_TOGGLE:            
            state.mobileRightToggle = !state.mobileRightToggle;
            return state;
        case RIGHT_SIDEBAR:
            state.rightSidebarToggle = !state.rightSidebarToggle;
            return state;
        case SWITCH_TOGGLE:
            state.switchToggle= !state.switchToggle
            return state;
        default:
            return state
    }
}

export default Common;