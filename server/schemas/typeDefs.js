const typeDefs = `
    type User {
        _id: ID
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
        me: User
    }
    type Mutation {
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
