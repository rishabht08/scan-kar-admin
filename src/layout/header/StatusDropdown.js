import React, { useState } from 'react';
// import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { connect } from 'react-redux';
const StatusDropdown = (props) => {
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const toggle = () => setDropdownOpen(prevState => !prevState);

   const getPendingPaymemnts = () => {
      props.dispatch({
         type: "PENDING_PAYMENTS"
      })
   }
   return (
      <div className="header-menu" onClick={getPendingPaymemnts}>
         Pending Payments
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

const mapStateToProps = (state) => {
   console.log("state", state)

}

const mapDispatchToProps = (dispatch) => {

   return {
      dispatch

   }

}

export default connect(mapStateToProps, mapDispatchToProps)(StatusDropdown)