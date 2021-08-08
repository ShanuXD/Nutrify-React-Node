import axios from "axios";
import React, { useState, useRef } from "react";
import { getCurrentDate } from "../utils/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import UserNavbar from "../components/UserNavbar"

const applicationId = "497e4eee";
const applicationKey = "793cdb3728df0b6b274b824a06bd0c72";
const EndPoint = "https://trackapi.nutritionix.com/v2/natural/nutrients";

const AddMeal = () => {
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [totalCalories, setTotalCalories] = useState(0);
  const [fetchError, setFetchError] = useState(false);
  const caloriesRef = useRef(null);
  const nameRef = useRef(null);

  // Send Add to backend to save Meal data
  const addMeal = async (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const description = event.target.elements.description.value;
    const type = event.target.elements.type.value;
    const calories = event.target.elements.calories.value;
    const date = getCurrentDate(startDate);
    console.log(date);
    const body = {
      name,
      description,
      type,
      calories,
      date,
    };
    const response = await axios.post("/user/meal", body);
    if (response.data.success) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  };

  // Ger Calories from the api
  const getCalories = async () => {
    setFetchError(false);
    const headers = {
      "x-app-id": applicationId,
      "x-app-key": applicationKey,
    };
    const food = nameRef.current.value;
    try {
      const response = await axios.post(EndPoint, { query: food }, { headers });
      if (response.data) {
        // console.log(response.data.foods[0]["nf_calories"]);
        caloriesRef.current.value = response.data.foods[0]["nf_calories"];
      }
    } catch (err) {
      setFetchError(true);
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="app-container">
        <div className="form-feild">
          <h2>Add Meals</h2>
          {fetchError && (
            <h5>
              Please provide the name of the food then press calulate calories!
            </h5>
          )}
          <form onSubmit={addMeal}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <input
              ref={nameRef}
              type="text"
              id="food-name"
              name="name"
              required
              placeholder="Food Name"
            />
            <input
              type="text"
              id="description"
              name="description"
              required
              placeholder="Food Description"
            />
            <input
              type="text"
              name="type"
              required
              placeholder="Food Type Ex- Meat, Eggs"
            />
            <input
              type="number"
              ref={caloriesRef}
              id="calories"
              name="calories"
              step="any"
              required
              value={totalCalories}
              onChange={(e) => setTotalCalories(e.target.value)}
            />
            <div className="btn" onClick={getCalories}>
              Get Calories
            </div>
            <br />
            <button>Add Meal</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMeal;
