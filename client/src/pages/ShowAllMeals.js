import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCurrentDate } from "../utils/utils";

const ShowAllMeals = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState("");

  const getMeals = async (userDate) => {
    setIsLoading(true);
    setError("");
    const date =
      userDate === undefined || null
        ? getCurrentDate()
        : getCurrentDate(userDate);

    try {
      console.log("ok",props)
      const id = props.location.state.id;
      const body={id, date}
      console.log(id, date)
      const response = await axios.post("/admin/meal", body);

      if (response.data.success) {
        const { meals } = response.data;
        setMeals(meals);
        setIsLoading(false);
      } else {
        setError(response.data.error);
        setIsLoading(false);
      }
    } catch (err) {
      setError("Please check if yo are  sign-in");
    }
  };

  useEffect(() => {
    getMeals();
  }, []);

  if (error) {
    <h3>{error}</h3>;
  }

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  return (
    <div className="container all-meals">
      <div className="date-picker">
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            getMeals(date);
          }}
        />
      </div>
      <div className="meals">
        {meals.length > 0 ? (
          meals.map((meal, index) => {
            const { calories, description, name, type, _id } = meal;
            return (
              <div key={index}>
                <div className="meal">
                  <div className="meal--name">{name}</div>
                  <div className="meal--description">{description}</div>
                  <div className="meal--type">{type}</div>
                  <div className="meal--calories">{calories}</div>
                </div>
              </div>
            );
          })
        ) : (
          <h3>No Meals Present On This Day</h3>
        )}
      </div>
    </div>
  );
};

export default ShowAllMeals;
