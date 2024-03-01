import { gql } from '@apollo/client';

// Mutations 
export const SUBSCRIBE_PLAN = gql`
    mutation subscribePlan($planId: ID!) {
        subscribePlan(planData: { planId: $planId }) {
            _id
            subscribedPlans {
                _id
                name
                description
                price
            }
        }
    }
`;

export const UNSUBSCRIBE_PLAN = gql`
    mutation unsubscribePlan($planId: ID!) {
        unsubscribePlan(planId: $planId) {
            _id
            subscribedPlans {
                _id
                name
                description
                price
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!, $isProvider: Boolean!) {
        createUser(username: $username, email: $email, password: $password, isProvider: $isProvider) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            email
            }
        }
    }
`;

export const CREATE_PLAN = gql`
    mutation createPlan($planData: PlanInput!) {
        createPlan(planData: $planData) {
            _id
            name
            description
            price
            provider {
                _id
                username
            }
        }
    }
`;

export const CREATE_POST = gql`
    mutation createPost($postData: PostInput!) {
        createPost(postData: $postData) {
            _id
            description
            createdAt
            plan {
                _id
                name
                description
                price
            }
        }
    }
`;

export const DELETE_PLAN = gql`
    mutation removePlan($planId: ID!) {
        removePlan(planId: $planId) {
            _id
            createdPlans {
                _id
                name
                description
                price
            }
        }
    }
`;