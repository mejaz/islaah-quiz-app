import {
	GET_TOPICS,
	GET_QUESTIONS,
} from '../actions'

const initState = {
	topics: {},
	questions: {},
	stats: {},
}

function quizStore(state=initState, action) {
	console.log(initState)
	switch (action.type) {
		case GET_TOPICS:
			return {
				...state,
				topics: {
					...state.topics,
					[action.topics.name]: action.topics,
				}
			}
		case GET_QUESTIONS:
			return {
				...state,
				questions: action.questions
			}
		default:
			return state
	}
}

export default quizStore