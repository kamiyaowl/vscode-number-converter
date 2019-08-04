export function parse(src: string): {
    origin: number,
    hex   : string,
    bin   : string,
}[] {
    const results = 
        src.split(' ')
           .filter(x => x.length > 0)
           .map(x => {
                const isHex = src.indexOf('0x') > -1;
                const isBin = src.indexOf('0b') > -1;
                if (isHex && isBin) {
                    return null;
                } else if (isHex) {
                    return parseInt(x, 16);
                } else if (isBin) {
                    return parseInt(x, 2);
                } else {
                    return parseInt(x, 10);
                }
            })
            .filter(x => x !== null && !isNaN(x))
            .map(x => {
                return {
                    origin: x as number,
                    hex: '0x' + (x as number).toString(16).replace('-', ''),
                    bin: '0b' + (x as number).toString(2).replace('-', ''),
                };
            });
    return results;
}