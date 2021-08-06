export const getCurrentDate = (value)=>{

    if(value){
        const year = value.getFullYear()
        const month = value.getMonth()+1
        const date = value.getDate()
        return `${year}-${month}-${date}`

    }
    else{
        const dateObj = new Date()
        const year = dateObj.getFullYear()
        const month = dateObj.getMonth()+1
        const date = dateObj.getDate()
        return `${year}-${month}-${date}`
    }
}

export const getTotalCalories = (meals)=>{
    const calories = meals.map(meal=>{
        return meal.calories
    })
    const total = calories.reduce((prev, curr)=>prev+curr,0)
    return total
}

export const clearCookies = ()=>{
    document.cookie = `token=""`
    document.cookie = `admin-token=""`
}