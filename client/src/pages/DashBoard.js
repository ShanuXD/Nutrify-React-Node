import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Meal from "../components/Meal";
import { getCurrentDate, getTotalCalories } from "../utils/utils";
import Loading from "../components/Loading";

const DashBoard = ({changeAuth}) => {
  const [isloading, setIsloading] = useState(true);
  const [calories, setCalories] = useState(0);
  const [userConsumeCalories, setUserConsumeCalories] = useState(0);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [meals, setMeals] = useState([]);

  // After Deleting Meal Update The UI
  const updateMeals = (newMeals) => {
    setMeals(newMeals);
    const totalCalories = getTotalCalories(newMeals);
    setUserConsumeCalories(totalCalories);
  };

  // Featching data for the dashboard
  const getData = async (userDate) => {
    setError(false);
    setIsloading(true);
    try {

      const userResponse = await axios.get("/user");
      // get the user date or provide the default date
      const date = userDate === undefined || null
          ? getCurrentDate()
          : getCurrentDate(userDate);

      const mealResponse = await axios.get("/user/meal", {
        params: { date: date },
      });

      if (userResponse.data.success) {
        
        const user = userResponse.data.user;
        setName(user.name);
        setCalories(user.calories);
        setIsloading(false);
        setMeals(mealResponse.data.meals);
        const totalCalories = getTotalCalories(mealResponse.data.meals);
        setUserConsumeCalories(totalCalories);

      } else {
        // Token expire go back to login
        setError(true);
        changeAuth(false)
      }
    } catch (err) {
      console.log("you are the admin bro!");
      setError(true);
      changeAuth(false)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return <div className="error-message">Please sign in again!</div>;
  }

  if (isloading) {
    return <Loading />;
  }

  if (!isloading && !error && meals.length === 0) {
  }

  return (
    <section className="dashborad container">
      <div className="user">
        <div className="user__info">
          <div className="user__info--name">{name}</div>
        </div>
        <div className="user__limit-bar">
          <span>{calories}</span>/{userConsumeCalories>calories? <span className="red-text">{Math.floor(userConsumeCalories)}</span>:
          <span className="green-text">{Math.floor(userConsumeCalories)}</span>}
        </div>
        <div className="date-picker">
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              getData(date);
            }}
          />
        </div>
      </div>
      <div className="meals">
        {meals.length > 0 ? (
          meals.map((meal, index) => {
            return (
              <Meal
                key={index}
                meal={meal}
                updateMeals={updateMeals}
                meals={meals}
              />
            );
          })
        ) : (
          <h3>No Meals Present On This Day</h3>
        )}
      </div>
    </section>
  );
};

export default DashBoard;
