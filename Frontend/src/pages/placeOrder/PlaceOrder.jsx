import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './PlaceOrder.css'

import { useNavigate } from "react-router-dom";
import axios from 'axios';
const PlaceOrder = () => {
  const navigate = useNavigate();
  const {getTotalCartAmount , url , food_list , cartItems ,token} = useContext(StoreContext)

  const [data,setData] = useState({
    firstName : "",
    lastName : "",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event)=>{
      const name = event.target.name
      const value = event.target.value
      setData(data=>({...data,[name]:value}))
  }

  // useEffect(()=>{
  //   console.log(data)
  // },[data])

  const placeorder = async()=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id] > 0){
       let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address : data,
      items:orderItems,
      amount :getTotalCartAmount() + 2 ,
    }
    let response = await axios.post(url+'/api/order/place',orderData,{headers:{token}})
    console.log(response)
    if(response.data.success){
      const {session_url} = response.data
      window.location.replace(session_url)
    }else{
      alert("error while payment session")
    }
  }

  return (
    <div>
      <form onSubmit = {placeorder} className='place-order'>
        <div className="place-order-left">
            <p className='title'> Delivery Information</p>
            <div className='multi-field'>
              <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='first name'/>
              <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='last name' />
            </div>

            <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email'/>
            <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>

            <div className='multi-field'>
              <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
              <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
            </div>

            <div className='multi-field'>
              <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zipcode'/>
              <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
            </div>

            <input required  name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone no' />
        </div >
        <div className="place-order-right">
                 <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button  type='submit' >Proceed to payment</button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder
