import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import { RestaurantsContext } from "../context/RestaurantsContext"

const RestaurantDetailPage = () => {
  const { id } = useParams()
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext)
  return <div>Detail Page</div>
};

export default RestaurantDetailPage
