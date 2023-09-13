import React,{useEffect,useState} from "react";
import { useSelector ,useDispatch} from "react-redux";
import { FormatDate } from "../utils/reuseable";

import {getProducts,getSales } from "./../../store/actions/datacollection"
const UserProFile=()=>{
    
  const allproducts=useSelector((data)=>data.Allproducts)
  const allSales=useSelector((data)=>data.Allsales)
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getProducts())
    },[dispatch])
    
    useEffect(()=>{
        dispatch(getSales())
      },[dispatch])
    

const [totalproducts,settotal]=useState(0);
const [estimatedrevenue,setrevenue]=useState(0);
const [totalsale,setsales]=useState(0);
const [totallost,setlost]=useState(0);
useEffect(()=>{
    if(allproducts && allproducts.data){
        settotal(allproducts.data.length)
        let amount=0;
        let expense=0
        allproducts.data.forEach((value)=>{
            amount=  amount + value.quantity* value.price;
            if(value.expiry){
                expense=expense + value.quantity* value.price;

            }

        })
        setlost(expense)
        setrevenue(amount)

    }
})

useEffect(()=>{
    if(allSales && allSales.data){
        
        let amount=0;
        allSales.data.forEach((value)=>{
            amount= amount + value.price

        })
        setsales(amount)

    }
})
    return(
        <div>
        <div className="my-details">
        <div className="gridlayout-item">
        <div className="overview-box">
            <h1>
Total Products In Stock
            </h1>

            <p> {totalproducts}</p>
        </div>
        <div className="overview-box">
            <h1>
Estimted Total Revenue
            </h1>

            <p> GH₵  {estimatedrevenue}</p>
        </div>
        <div className="overview-box">
            <h1>
Total Sales
            </h1>

            <p>GH₵ {totalsale}</p>
        </div>
        <div className="overview-box">
            <h1>
 Expired Product Cost
            </h1>

            <p>
            GH₵     {totallost}
            </p>
        </div>

        </div>
     

        
       
    
      
         
        </div>
        </div>
    )
}

export default UserProFile;