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
	query Query($planId: ID!) {
		plan(planId: $planId) {
			_id
			description
			name
			price
		}
	}
`;

export const GET_USER = gql`
	query Query {
		me {
			_id
			email
			isProvider
			planCount
			username
			createdPlans {
				_id
			}
			subscribedPlans {
				_id
			}
			postCreated {
				_id
			}
		}
	}
`;

export const GET_PROVIDER_CREATED_PLANS = gql`
	query GetProviderCreatedPlans {
		me {
			_id
			isProvider
			createdPlans {
				_id
				description
				name
				price
				subscriberCount
			}
		}
	}
`;
