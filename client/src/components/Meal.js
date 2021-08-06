import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";

const Meal = ({ meal, updateMeals, meals }) => {
  const history = useHistory();
  const { calories, description, name, type, _id } = meal;

  const deleteMeal = async () => {
    const deleteResponse = await axios.delete(`/user/meal/${_id}`);
    console.log(deleteResponse.data);
    console.log(meals);
    const newMeals = meals.filter((meal) => meal._id !== _id);
    updateMeals(newMeals);
  };
  const editMeal = () => {
    history.push({
      pathname: "/editmeal",
      state: { id: _id },
    });
  };

  return (
    <div className="meal">
      <div className="meal--name">{name}</div>
      <div className="meal--description">{description}</div>
      <div className="meal--type">{type}</div>
      <div className="meal--calories">{calories}</div>
      <div className="btns">
        <span className="meal--delete btn btn-delete" onClick={deleteMeal}>
          Delete
        </span>
        <span className="meal--delete btn btn-edit" onClick={editMeal}>
          Edit
        </span>
      </div>
    </div>
  );
};

export default Meal;
