export class HttpError {

    // Defaults
    public statusCode = 500;
    public statusText = 'An HTTP error occurred.';
    public url = '';
    public exception: ServerException;

    static getExceptionDetail(data: any): ServerException {
        const exception = data && data.fromJson ? data.fromJson : {};
        return new ServerException(
            exception.exceptionMessage,
            exception.exceptionType,
            exception.message);
    }

    constructor(data: any) {
        if (typeof data === 'object') {
            this.statusCode = data.status;
            this.statusText = data.statusText;
            this.url = data.url;
            this.exception = HttpError.getExceptionDetail(data);
        }
    }
}

export class ServerException {
    constructor(
        public exceptionMessage: string,
        public exceptionType: string,
        public message: string) { }
}
