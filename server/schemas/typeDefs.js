const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        isProvider: Boolean
        subscribedPlans: [Plan]
        planCount: Int
        createdPlans: [Plan]
        postCreated: [Post]
    }
    type Plan{
        _id: ID!
        name: String
        description: String
        price: Float
        provider: User
        subscribers: [User]
        subscriberCount: Int
        posts: [Post]
        postCount: Int
    }
    type Post {
        _id: ID!
        postID: ID!
        description: String
        provider: User
        plan: Plan
        createdAt: String
    }
    input PlanInput{
        name: String!
        description: String!
        price: Float!
    }
    input PostInput{
        description: String!
        plan: ID!
    }
    input PlanSubscriptionInput {
        planId: ID!
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        # queries should match and be verified with client side queries.js
        me: User
        plans: [Plan]
        plan(planId: ID!): Plan
        posts: [Post]
        post(postId: ID!): Post
    }
    type Mutation {
        # mutations work on graphql playground
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!, isProvider: Boolean!): Auth
        createPlan(planData: PlanInput!): Plan
        createPost(postData: PostInput!): Post
        subscribePlan(planData: PlanSubscriptionInput!): User
        unsubscribePlan(planId: ID!): User
        removePlan(planId: ID!): User
    }
`;
module.exports = typeDefs;
