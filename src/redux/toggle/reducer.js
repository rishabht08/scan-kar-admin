import { GET_ORDERS, RUNNING_ORDERS, PENDING_PAYMENTS, ADD_TO_ORDERS } from '../actionTypes'
import axios from "axios"

const Initial_state = {
    orders: [],
    buttonFunctional: true,
    takeAwaySale: null,
    takeAwayTotal: null,
    dineInSale: null,
    dineInTotal: null,
    showPage: true,
    running:false,
    home:true,
    sales:false

}


const Common = (state = Initial_state, action) => {
    switch (action.type) {
        // case GET_ORDERS:

        //     return axios.get("https://scankarapi.herokuapp.com/api/v1/customer-order").then(res => {

        //         let pending = res.data.data.orders.filter(order => {
        //             return order.process == "Pending"
        //         })

        //         state.orders = [...pending]
        //         state.buttonFunctional = true;
        //         state.showPage = true;
        //         console.log("Get Orders" , state.orders )
        //         return state;
        //     })


        // case RUNNING_ORDERS:
        //     return axios.get("https://scankarapi.herokuapp.com/api/v1/customer-order").then(res => {

        //         let running = res.data.data.orders.filter(order => {
        //             return order.process == "Running"
        //         })

        //         state.orders = [...running]
        //         state.buttonFunctional = true;
        //         state.showPage = true;
        //         console.log("Get  Running Orders" , state.orders )
        //         return state;
        //     })

        case "TOTAL_SALES":
            

            state.takeAwayTotal = action.payLoad.takeAwayTotal;
            state.dineInTotal = action.payLoad.dineInTotal;
            

            state.takeAwaySale = action.payLoad.takeAwaySale;
            state.dineInSale =  action.payLoad.dineInSale;
            state.showPage = false;

            state.buttonFunctional = false;
            state.running = false;
            state.home=false;
            state.sales  = true
            return state;

        case "ADD_TO_ORDERS":

            state.orders = action.payLoad
            if(action.payLoad[0].process=="Running" || action.payLoad.length ==0){
                state.running = true;
                state.home=false;
                state.sales  = false
            }
            else{
                state.running = false;
                state.home=true;
                state.sales  = false

            }
            state.buttonFunctional = true;
            state.showPage = true;
            return state;

        default:
            return state
    }
}

export default Common;