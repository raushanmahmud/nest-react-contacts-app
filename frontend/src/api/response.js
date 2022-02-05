export function handleResponse(response) {
    if (response.results) {
        return response.results;
    }

    if (response.data) {
        return {
            data: response.data,
            status: response.status
        };
    }

    return response;
}

export function handleError(error) {
    if (error.data) {
        return error.data;
    }
    return error;
}