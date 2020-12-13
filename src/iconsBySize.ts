const iconsBySize = {
  SMALL: (color) => `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'><defs/><path fill='${color}' fill-rule='evenodd' d='M8 15A7 7 0 108 1a7 7 0 000 14zm3.244-8.131a.875.875 0 00-1.238-1.238L7.125 8.513 5.994 7.38A.875.875 0 004.756 8.62l1.75 1.75a.875.875 0 001.238 0l3.5-3.5z' clip-rule='evenodd'/></svg>`,
  MEDIUM: (color) => `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'><defs/><path fill='${color}' fill-rule='evenodd' d='M12 22a10 10 0 100-20 10 10 0 000 20zm4.634-11.616a1.25 1.25 0 00-1.768-1.768l-4.116 4.117-1.616-1.617a1.25 1.25 0 00-1.768 1.768l2.5 2.5a1.25 1.25 0 001.768 0l5-5z' clip-rule='evenodd'/></svg>`,
  LARGE: (color) => `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 32 32'><defs/><path fill='${color}' fill-rule='evenodd' d='M16 30a14 14 0 100-28 14 14 0 000 28zm6.487-16.263a1.75 1.75 0 00-2.474-2.474l-5.763 5.763-2.263-2.263a1.75 1.75 0 00-2.474 2.474l3.5 3.5a1.75 1.75 0 002.474 0l7-7z' clip-rule='evenodd'/></svg>`,
}

export default iconsBySize;
