export const GET_TOPICS = "GET_TOPICS"
export const GET_QUESTIONS = "GET_QUESTIONS"

export function addTopicsToStore({topics}) {
	console.log("tt", topics)
	return {
		type: GET_TOPICS,
		topics,
	}
}

export function addQuestionsToStore({questions}) {
	return {
		type: GET_QUESTIONS,
		questions,
	}
}