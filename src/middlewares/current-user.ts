import {NextFunction, Request, Response} from "express";
import {Session, SessionManager, UserInfo} from "../services/session-manager";

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserInfo
        }
    }
}

export const currentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const user = SessionManager.getUserInfo(req.session as Session);
        if (user != null) {
            req.currentUser = user;
        }
    } catch (err) {
        console.log("Failed to get user from session: ", req.session);
    }

    next();
}