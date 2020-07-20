import { GET_ORDERS, RUNNING_ORDERS, PENDING_PAYMENTS , ADD_TO_ORDERS} from '../actionTypes'
import axios from "axios"

const Initial_state = {
    orders: [],
    buttonFunctional: true,
    takeAwaySale:null,
    takeAwayTotal:null,
    dineInSale:null,
    dineInTotal:null,
    showPage : true

}


const Common = (state = Initial_state, action) => {
    switch (action.type) {
        case GET_ORDERS:

           axios.get("https://scankar.herokuapp.com/api/v1/customer-order").then(res => {
                console.log(res)
                state.orders = res.data.data.orders
                state.buttonFunctional = true;
                state.showPage = true;
                return state;
            })
           

        case RUNNING_ORDERS:
            let arr2 = state.orders
            state.orders = arr2.filter(item => {
                return item.status == "Pending"
            })

            state.buttonFunctional = true;
            state.showPage = true;
            return state;
           
        case PENDING_PAYMENTS:
            let arr = state.orders;
            let dineIn = arr.filter(order=>{
                return order.orderType == "Dine In"
            })

            let takeAway  = arr.filter(order=>{
                return order.orderType != "Dine In"
            })

            state.takeAwayTotal = takeAway.length;
            state.dineInTotal = dineIn.length;
            let x =0;
            let y =0;

            dineIn.forEach(item=>{
                x+=parseInt(item.price)
                
            })
            takeAway.forEach(item=>{
                y+=parseInt(item.price)
                
            })

            state.takeAwaySale = y;
            state.dineInSale = x;
            state.showPage = false;

            state.buttonFunctional = false;
            return state;

        case ADD_TO_ORDERS:

            state.orders = action.payLoad
            state.buttonFunctional = true;
            state.showPage = true;
            return state;

        default:
            return state
    }
}

export default Common;