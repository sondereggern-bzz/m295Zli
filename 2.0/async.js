
//simuliert verzögerung nach "argument" milisekunden

async function simulierteVerzoegerung(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function addiereNachVerzoegerung(a, b, ms) {
    await simulierteVerzoegerung(ms);
    const sum = a + b;
    console.log(`Das Ergebnis der Addition von ${a} und ${b} nach einer Verzögerung von ${ms} Millisekunden beträgt: ${sum}`);
}

addiereNachVerzoegerung(1, 2, 1000);