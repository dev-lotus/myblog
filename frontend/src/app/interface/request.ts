export interface Request {
    _id: Object,
    listId: string,
    listType:string,
    listedUserToken: string,
    requesterUserToken: string,
    request_message: string,
    rejection_message: string,
    acceptance_status: string,
    createdAt: Date,
    updatedAt: Date
}
