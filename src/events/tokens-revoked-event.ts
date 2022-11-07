import {Subjects} from "./subjects";

export interface TokensRevokedEvent {
    subject: Subjects.TOKENS_REVOKED;
    data: {
        userId: string;
        at: number;
    };
}