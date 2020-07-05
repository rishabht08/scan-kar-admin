import { GET_ORDERS , RUNNING_ORDERS , PENDING_PAYMENTS  } from '../actionTypes'
import axios from "axios"

const Initial_state = {
    orders : ""
   
}

const Common = (state=Initial_state, action) => {
    switch (action.type) {
        case GET_ORDERS:
            console.log("Trigerred")
            state.orders = "Order Get"
      
             return state;
        case RUNNING_ORDERS:            
            console.log("Trigerred 2")
            state.orders = "Order Get Running"
            return state;
        case PENDING_PAYMENTS :
            console.log("Trigerred 3")
            state.orders = "Order Get Pending"
            return state;
      
        default:
            return state
    }
}

export default Common;