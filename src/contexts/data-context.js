import React from "react"

const DataContext = React.createContext({})

const initialState = {
  exercises: [],
  loading: true,
  error: null,
}

const DataProvider = ({ children }) => {
  const [data, setData] = React.useState(initialState)

  const refreshExercises = () => {
    localStorage.removeItem("khan-academy-exercises")
    setData(initialState)
  }

  React.useEffect(() => fetchExercises(data, setData), [data])

  return (
    <DataContext.Provider value={{ ...data, refreshExercises }}>
      {children}
    </DataContext.Provider>
  )
}

const useDataContext = () => React.useContext(DataContext)

const fetchExercises = (data, setData) => {
  if (data.exercises.length === 0 && data.error === null) {
    let exercises = localStorage.getItem("khan-academy-exercises")
    if (exercises === null) {
      const url = "https://jgilgen.pythonanywhere.com/api/v2/topics/topictree"
      fetch(url)
        .then(res => res.json())
        .then(json => {
          exercises = json.exercises
          localStorage.setItem(
            "khan-academy-exercises",
            JSON.stringify(exercises)
          )
          setData({
            exercises,
            loading: false,
            error: null,
          })
        })
        .catch(err => {
          console.error(err)
          setData({
            exercises: [],
            loading: false,
            error: "Error fetching data 😞",
          })
        })
    } else {
      setData({
        exercises: JSON.parse(exercises),
        loading: false,
        error: null,
      })
    }
  }
}

export { useDataContext, DataProvider }
