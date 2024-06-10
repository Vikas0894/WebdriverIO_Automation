import request from 'supertest';

class ApiMethods {
    public async getAllUsers(baseURL: string, endPoint: string, authToken: string, queryParam: object): Promise<any> {
        if (!baseURL || !endPoint) {
            throw Error(`One of the given values ${baseURL},${endPoint} is not valid`)
        }
        baseURL = baseURL.trim();
        endPoint = endPoint.trim();
        try {
            return await request(baseURL)
                .get(endPoint)
                .query(queryParam)
                .auth(authToken, { type: 'bearer' })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
        } catch (err) {
            const error = err as Error;
            throw new Error(`Somthing getting wrong in payload.${error.message}`);
        }
    }

    public async createUser(baseURL: string, endpoint: string, authToken: string, payload: object,): Promise<any> {
        if (!baseURL || !endpoint) {
            throw Error(`One of the given values baseURL: ${baseURL}, endpoint: ${endpoint} is not valid `)
        }
        baseURL = baseURL.trim();
        endpoint = endpoint.trim();
        try {
            return await request(baseURL)
                .post(endpoint)
                .auth(authToken, { type: 'bearer' })
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .send(payload)
        } catch (err) {
            const error = err as Error;
            error.message = `Error making a POST call to ${endpoint}, ${err}`
            throw err
        }
    }
}

export const apiMethods = new ApiMethods();
