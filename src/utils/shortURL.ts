export const shortURL = async (link: string): Promise<string|false> => {
    // Use yandex clck.ru for get short link
    return fetch(
        `https://clck.ru/--?url=${encodeURIComponent(link)}`,
    ).then(response => {
        if(!response.ok) return '';

        return response.text();
    })
}