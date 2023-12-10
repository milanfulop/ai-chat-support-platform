export default interface IUser {
    id: string;
    email: string;
    apis: [{
        apiKey: string;
    }]
}