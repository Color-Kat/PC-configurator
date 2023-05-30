// export const copyToClipboard = (text: string): boolean => {
//     // Copy the text in the fake `textarea`
//     const storage = document.createElement('textarea');
//     storage.setAttribute('readonly', "");
//     storage.innerHTML = text;
//
//     // Add
//     const clipboardContainer = document.querySelector('#clipboard');
//     clipboardContainer.appendChild(storage);
//     storage.select();
//     storage.setSelectionRange(0, 99999);
//
//     if (document.execCommand("copy")) {
//         clipboardContainer.removeChild(storage);
//         return true;
//     } else {
//         navigator.clipboard.writeText(text);
//         return true;
//     }
// }

export const copyToClipboard = (text: string): boolean => {

    // Try to use the Clipboard API
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
        console.log('Clipboard API');
        return true;
    }

    // If the Clipboard API is not available,
    // use exec command and fake textarea

    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';

    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    console.log('Exec command');

    return true;
};