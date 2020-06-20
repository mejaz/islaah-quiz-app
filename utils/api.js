
const api = "https://islaah.herokuapp.com"

const headers = {
  'Content-Type': 'application/json;charset=utf-8;',
}

export const getTopics = () =>
	fetch(`${api}/categories`, { headers })
		.then(function(response) {
			if(response.status === 200) {
				return response
			} else {
				throw new Error(response)
			}
		})
		.then(res => res.json())
		.then(res => (
			{sts: "success", response: res}
		))
		.catch((error) => {
			return({sts: "error", error: error})
		})


export const getAllQuestions = () =>
	fetch(`${api}/questions/all`, {headers})
		.then(function(response) {
			if(response.status === 200) {
				return response
			} else {
				throw new Error(response)
			}
		})
		.then(res => res.json())
		.then(res => (
			{ sts: "success", response: res }
		))
		.catch((error) => {
			return (
				{ sts: "error", error: error }
			)
		})
