export type UserUpType = {
    id: string;
} & Partial<{
    username: string;
    password: string;
    imagePath: string;
}>;