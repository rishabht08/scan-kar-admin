import React, {useState} from 'react'
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';


const CategoryDropdown = (props) =>  {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const getOrders = () =>{
        props.dispatch({
            type:"GET_ORDERS"
        })
    }
    return(
        <div className = "header-menu" onClick = {getOrders}>
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
    
}

const mapDispatchToProps = (dispatch) =>{

    return{
        dispatch

    }

}

export default connect(mapStateToProps , mapDispatchToProps) (CategoryDropdown)