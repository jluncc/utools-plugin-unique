window.removeDuplicateLines = function(originalText) {
  console.log("originalText: ", originalText);
  let start = performance.now();
  console.log("start...");

  let lines = originalText.split('\n');
  console.log("lines: ", lines);
  
  let linesAfterRemoveDuplicate = new Set();
  lines.forEach(line => {
    linesAfterRemoveDuplicate.add(line.trim());
  })
  console.log("linesAfterRemoveDuplicate: ", linesAfterRemoveDuplicate);
  
  let result = '';
  linesAfterRemoveDuplicate.forEach(e => {
    if (e.length > 0) {
      result += (e + '\n')
    }
  })
  console.log("result: ", result);
  let end = performance.now();
  console.log('end... cost ', `${end - start} ms`);
  return result;
};