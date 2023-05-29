export const copyToClipboard = (text: string): boolean => {
    console.log(text);

    const storage = document.createElement('textarea');
    storage.innerHTML = text;

    document.querySelector('#clipboard').appendChild(storage);

    // Copy the text in the fake `textarea` and remove the `textarea`
    storage.select();
    storage.setSelectionRange(0, 99999);

    if (document.execCommand("copy")) {
        return true;
    } else {
        navigator.clipboard.writeText(text);
        return true;
    }
}