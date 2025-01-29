export default interface IUser {
    id: string;
    email: string;
    bots: {
        botName: string;
        botKey: string;
    }[];
}
