export default function shuffleArray(a: Array<any>): Array<any> {
    let j;
    let x;
    let i;

    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }

    return a;
}
