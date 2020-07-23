import React, {useState} from 'react'
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import * as Actions from "../../actions/actions"
import { bindActionCreators } from 'redux';


const CategoryDropdown = (props) =>  {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const getOrders = () =>{
       props.actions.addOrders("Running")
    }
    return(
        <div className = {props.home ? "header-menu-active" : "header-menu"} onClick = {getOrders}>
           New Orders
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
    return{
        home:state.Toggle.home
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(Actions, dispatch)
  }
  };

export default connect(mapStateToProps , mapDispatchToProps) (CategoryDropdown)