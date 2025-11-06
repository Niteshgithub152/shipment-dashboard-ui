import { IUser } from "./User";

export interface IResult<T> {
    isSuccess: boolean;
    message: string;
    data: T;
}