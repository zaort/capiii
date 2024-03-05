import { gql } from "@apollo/client";

// Queries
export const GET_PLANS = gql`
	query {
		plans {
			_id
			name
			description
			price
			provider {
				_id
				username
			}
			subscriberCount
		}
	}
`;

export const GET_PLAN = gql`
	query getPlan($planId: ID!) {
		plan(_id: $planId) {
			_id
			name
			description
			price
			provider {
				_id
				username
			}
			posts {
				_id
				createdAt
				description
			}
			subscriberCount
		}
	}
`;

export const GET_USER = gql`
	query me {
		me {
			_id
			username
			email
			isProvider
			subscribedPlans {
				_id
				name
				description
				price
			}
			createdPlans {
				_id
				name
				description
				price
			}
		}
	}
`;

// TESTING
// export const GET_PROVIDER_PLANS = gql`
// 	query me {
// 		me {
// 			_id
// 			username
// 			email
// 			subscribedPlans {
// 				_id
// 				name
// 				description
// 				price
// 			}
// 			createdPlans {
// 				_id
// 				name
// 				description
// 				price
// 			}
// 		}
// 	}
// `;
