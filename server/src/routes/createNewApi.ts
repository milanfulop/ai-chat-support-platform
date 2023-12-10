import { Request, Response } from 'express';
import crypto from "crypto";
import { API, User } from "../configs/db.config";

interface API {
    apiKey: string;
    userId: string;
}

const createNewApi = (req: Request, res: Response) => {
    if (req.user && 'id' in req.user) {
        const apiKey = crypto.randomBytes(32).toString("hex");
        const userId = req.user.id as string;

        const newApi: API = {
            apiKey: apiKey,
            userId: userId,
        };

        new API(newApi).save().then(() => {
            User.findOneAndUpdate(
                { _id: userId },
                { $push: { apis: apiKey } },
                { new: true }
            ).then((updatedUser) => {
                console.log("API key created and linked to user ID:", userId);
                res.json({ apiKey: apiKey, user: updatedUser });
            }).catch((error) => {
                console.error("Error updating user with API key:", error);
                res.status(500).json({ error: "Internal Server Error" });
            });
        }).catch((error) => {
            console.error("Error creating API key:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
    } else {
        res.status(400).json({ error: "User ID not available in the request" });
    }
};

export default createNewApi;
