import {NextFunction, Request, Response} from "express";
import {Session, SessionManager} from "../../../auth/src/services/session-manager";
import {UserDoc} from "../../../auth/src/models/user";

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserDoc
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
        const user = await SessionManager.getUser(req.session as Session);
        if (user != null) {
            req.currentUser = user;
        }
    } catch (err) {
        console.log("Failed to get user from session: ", req.session);
    }

    next();
}