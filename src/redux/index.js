import {combineReducers} from 'redux'
import Common from '../redux/common/common'
import Customizer from './Customizer/reducer'
import Toggle from "./toggle/reducer"
const reducers = combineReducers({
    Common,
    Customizer,
    Toggle
});

export default reducers;