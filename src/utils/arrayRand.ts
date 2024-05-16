export const arrayRand = (array: any[], value = true) => {
    const index = Math.floor(Math.random()*array.length);

    if(!value) return index;
    else return array[index]
}