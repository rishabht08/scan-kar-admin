import { GET_ORDERS, RUNNING_ORDERS, PENDING_PAYMENTS , ADD_TO_ORDERS} from '../actionTypes'
import axios from "axios"

const Initial_state = {
    orders: [],
    buttonFunctional: true

}

const Common = (state = Initial_state, action) => {
    switch (action.type) {
        case GET_ORDERS:

           axios.get("http://13.233.233.253:5000/api/v1/customer-order").then(res => {
                console.log(res)
                state.orders = res.data.data.orders
                state.buttonFunctional = true;
                return state;
            })
           

        case RUNNING_ORDERS:
            let arr2 = []
            for(let i =0 ; i<parseInt(state.orders.length/2) ; i++){
                arr2[i] = state.orders[state.orders.length-1-i];
            }

            state.orders = arr2;
            
            state.buttonFunctional = true;
            return state;
        case PENDING_PAYMENTS:
            let arr = state.orders;
            state.orders = arr.filter(item => {
                return item.status == "Pending"
            })

            state.buttonFunctional = false;
            return state;

        case ADD_TO_ORDERS:

            state.orders = action.payLoad
            state.buttonFunctional = true;
            return state;

        default:
            return state
    }
}

export default Common;