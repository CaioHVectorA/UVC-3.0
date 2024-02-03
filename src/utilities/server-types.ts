import { ServerError } from "@/server/ServerError";

export type ServerResponse<T> = (ServerError | T)

export type ProtectedUserApiResponse = ServerResponse<{ username: string; id: string, image_path: string, }>