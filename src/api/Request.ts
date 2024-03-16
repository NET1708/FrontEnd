export async function my_request(endpoint:string) {

    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
    }
    return await response.json();
}