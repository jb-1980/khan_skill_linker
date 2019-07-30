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

const parseExerciseData = data => {
  if (Array.isArray(data)) {
    return data.reduce((acc, child) => {
      if (child.children) {
        return { ...acc, ...parseExerciseData(child.children) }
      } else if (child.kind === "Exercise") {
        return {
          ...acc,
          [child.id]: {
            imageUrl: child.image_url,
            name: child.name,
            title: child.title,
            ka_url: child.ka_url,
          },
        }
      }
      return acc
    }, {})
  }

  if (data.children) {
    return parseExerciseData(data.children)
  }

  if (data.kind === "Exercise") {
    return {
      [data.id]: {
        imageUrl: data.image_url,
        name: data.name,
        title: data.title,
        ka_url: data.ka_url,
      },
    }
  }
}

const fetchExercises = (data, setData) => {
  if (data.exercises.length === 0 && data.error === null) {
    let exercises = localStorage.getItem("khan-academy-exercises")
    if (exercises === null) {
      const url =
        "https://jgilgen.pythonanywhere.com/api/v1/topictree?kind=Exercise"
      fetch(url)
        .then(res => res.json())
        .then(json => {
          exercises = Object.values(parseExerciseData(json))
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
