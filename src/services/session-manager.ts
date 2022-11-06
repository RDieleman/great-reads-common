import jwt from "jsonwebtoken";

interface Session {
    jwt: string;
}

interface UserInfo {
    id: string;
    email: string;
}

class SessionManager {
    static generate(info: UserInfo): Session {
        return {
            jwt: jwt.sign(
                info,
                process.env.JWT_KEY!
            )
        };
    }

    static getUserInfo(session: Session): UserInfo | null {
        try {
            // Decode the token.
            return jwt.verify(session.jwt, process.env.JWT_KEY!) as UserInfo;
        } catch (err) {
            return null;
        }
    }
}

export {SessionManager, Session, UserInfo};