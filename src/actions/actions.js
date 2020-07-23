
import * as api from '../api/api';

export function loadReducer(type, data) {
    return {
        type: type,
        payLoad: data
    }
}

export function addOrders(type) {
    return function (dispatch) {
        return api.addOrders(type).then(res => {
            res = res || {};
         
            dispatch(loadReducer("ADD_TO_ORDERS", res));
            return res;
        })
    };
}

export function calculateSales() {
    return function (dispatch) {
        return api.calculateSales().then(res => {
            res = res || {};
         
            dispatch(loadReducer("TOTAL_SALES", res));
            return res;
        })
    };
}