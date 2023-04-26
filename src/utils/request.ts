export async function sendRequest<T>(
    url: string,
    method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE',
    data?: any
): Promise<T> {
    const token: string = document.querySelector('meta[name=csrf-token]')?.getAttribute('content') ?? '';

    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': token
        }
    });

    const result: T = await response.json();

    return result;
}

/**
 * Color- Get, Post, Put, Patch, Delete methods for send requests.
 * @param url
 * @param data
 * @constructor
 */

export async function CGet<T>(url: string, data?: any) {
    return await sendRequest<T>(url, 'GET', data);
}

export async function CPost<T>(url: string, data?: any) {
    return await sendRequest<T>(url, 'POST', data);
}

export async function CDelete<T>(url: string, data?: any) {
    return await sendRequest<T>(url, 'GET', data);
}