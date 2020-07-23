import React, { useState } from 'react';
// import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { connect } from 'react-redux';
import * as Actions from "../../actions/actions"
import { bindActionCreators } from 'redux';
const StatusDropdown = (props) => {
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const toggle = () => setDropdownOpen(prevState => !prevState);

   const getPendingPaymemnts = () => {
      props.actions.calculateSales().then(res=>{
         console.log("In sales" , res)
      })
   }
   return (
      <div className = {props.sales ? "header-menu-active" : "header-menu"}onClick={getPendingPaymemnts}>
         Total Sales
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
       sales:state.Toggle.sales
   }
   
   
}

const mapDispatchToProps = (dispatch) => {
   return {
     actions: bindActionCreators(Actions, dispatch)
 }
 };

export default connect(mapStateToProps, mapDispatchToProps)(StatusDropdown)