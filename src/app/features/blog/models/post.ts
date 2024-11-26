export type Post = {
    id: number,
    userId: number,
    username?: string,
    title: string,
    body: string,
    rating: number,
    voted: boolean
}