function range(start, end, step) {
  switch (arguments.length) {
    case 0:
      return [];
    case 1:
      end = arguments[0];
      start = 0;
      step = 1;
      break;
    case 2:
      start = arguments[0];
      end = arguments[1];
      if (start === end) return [];
      // step = (end - start) / Math.abs(end - start);
      step = 1;
      break;
  }
  const rez = [];
  step = Math.abs(step) || 0;
  const stepIsNull = !step;
  if (start < end) {
    for (let i = start; i < end; i += Math.max(step, 1)) {
      const iq = stepIsNull ? start : i;
      rez.push(iq);
    }
  } else {
    for (let i = start; i > end; i -= Math.max(step, 1)) {
      const iq = stepIsNull ? start : i;
      rez.push(iq);
    }
  }
  console.log(start, end, step);
  console.log(rez);
  return rez;
}
