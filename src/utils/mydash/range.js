const baseRange = (start, end, step, isRight = false) => {
    let index = -1;
    let elementsCount = Math.max(Math.ceil((end - start) / (step)), 0);
    const result = new Array(elementsCount);

    while (elementsCount--) {
        result[++index] = start;
        start += step;
    }
    return isRight ? result.reverse() : result;
}

function range(start = 0, end, step, isRight = false) {
    if (end === undefined) {
        end = start;
        start = 0;
    }

    step = step === undefined ? (start < end ? 1 : -1) : step;
    return baseRange(start, end, step, isRight);
}