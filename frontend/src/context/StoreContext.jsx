import{ createContext, useContext, useState, useEffect } from 'react';
export const StoreContext = createContext(null);
import axios from 'axios';


const StoreContextProvider = (props) => {
    const url = "http://localhost:4000"    
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);


    const fetchFoodList = async() => {
        const response = await axios.get(url+"/api/food/list");
     
        console.log(response);
        // console.log(response.data);
        // console.log(response.data.data);
        
        setFoodList(response.data.data);
    }

    useEffect(() => {
        async function loadData (){
            await fetchFoodList();
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCardData(localStorage.getItem("token"));
        }
    }
        loadData();
    }, []);
    
    const addToCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId] : (cartItems[itemId] || 0) + 1}))
        
        if(token)
            await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}})
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
        if(token)
            await axios.post(url+"/api/cart/remove", {itemId}, {headers:{token}})
    }

    const loadCardData = async (token) => {
        const response = await axios.post(url+'/api/cart/get', {}, {headers:{token}});
        setCartItems(response.data.cartData);
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;    
        for(let id in cartItems)
            if(cartItems[id] > 0){
                console.log(food_list)
                let itemInfo = food_list.filter(item => id == item._id);
                console.log(itemInfo);
                totalAmount += (Number(itemInfo[0].price) * Number(cartItems[id]));
            }
                
        console.log(totalAmount);
        return totalAmount;
    }
    

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token, 
        setToken,
    }

    return (
        <StoreContext.Provider value = {contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider