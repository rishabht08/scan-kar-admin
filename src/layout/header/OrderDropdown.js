import React, {useState} from 'react'
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';

const OrderDropdown = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const getRunningOrders = () =>{
        props.dispatch({
            type:"RUNNING_ORDERS"
        })
    }
    return(
        <div className = "header-menu"   onClick = {getRunningOrders}>
        Running Orders
    {/* <DropdownToggle caret>
         Category

     </DropdownToggle> */}
     {/* <DropdownMenu>
         <DropdownItem>Admin</DropdownItem>
         <DropdownItem>Shopify</DropdownItem>
         <DropdownItem>Ecommerce</DropdownItem>
         <DropdownItem>Prestashop</DropdownItem>
     </DropdownMenu> */}
 </div>
    )
}

const mapStateToProps = (state) =>{
    console.log("state", state)
    
}

const mapDispatchToProps = (dispatch) =>{

    return{
        dispatch

    }

}

export default connect(mapStateToProps , mapDispatchToProps) (OrderDropdown)