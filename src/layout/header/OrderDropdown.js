import React, {useState} from 'react'
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import * as Actions from "../../actions/actions"
import { bindActionCreators } from 'redux';

const OrderDropdown = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const getRunningOrders = () =>{
        props.actions.addOrders("Completed")
    }
    return(
        <div className = {props.running ? "header-menu-active" : "header-menu"}   onClick = {getRunningOrders}>
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
    return{
        running:state.Toggle.running
    }
    
    
}

const mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(Actions, dispatch)
  }
  };

export default connect(mapStateToProps , mapDispatchToProps) (OrderDropdown)