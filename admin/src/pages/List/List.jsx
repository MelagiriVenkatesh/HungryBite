import React, { useEffect, useState } from 'react'
import './List.css'
import { toast } from 'react-toastify';
import axios from "axios";
const List = ({url}) => {

  const [list, setList] = useState([]);

  const removeFood = async (fid) => {
    const response = await axios.post(`${url}/api/food/remove`, {id:fid});
    if(response.data.success)
    {
      toast.success(response.data.message);
    }
    else
    {
       toast.error('Error Occured')
    }
  }
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success)
    {
      setList(response.data.data);
    }
    else
    {
       toast.error("Error");
    }
  }

  useEffect(() => {
    fetchList();
  }, [list]);

  return (
    <div className = 'list add flex-col'>
        <p>All Foods List</p>
        <div className = 'list-table'>
          <div className = 'list-table-format title'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item, index)=>{
              return (
                <div key={index} className='list-table-format'>
                    <img src={`${url}/images/`+item.image} alt="" className = "img-loaded"/>
                    <p>{item.name}</p>
                    <p>{item.catergory}</p>
                    <p>${item.price}</p>
                    <p className = 'cross' onClick={() => {removeFood(item._id)}}>X</p>
                </div>
              )
          })}
        </div>
    </div>
  )
}

export default List