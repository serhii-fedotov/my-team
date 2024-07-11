export const defaultErrorHandler = (res: Response) => {
    return res.json().then((data) => {
        throw new Error(data.error);
    });
};
