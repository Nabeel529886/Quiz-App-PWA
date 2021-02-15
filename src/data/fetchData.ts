

export const fetchData = async () => {
    const url = 'https://quizapi.io/api/v1/questions?difficulty=Medium&limit=10'
    const urlDescription = {
        "method": "GET",
        "headers": {
            "X-Api-key": `${process.env.REACT_APP_API_KEY}`
        }
    }

    const response = await fetch(url, urlDescription)
    const data = await response.json()
    return data
}