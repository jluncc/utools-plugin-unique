// 自定义函数
export default {
  removeDuplicateLines: function removeDuplicateLines(originalText) {
    let start = performance.now();

    let lines = originalText.split('\n');

    let linesAfterRemoveDuplicate = new Set();
    lines.forEach(line => {
      linesAfterRemoveDuplicate.add(line.trim());
    })

    let result = this.buildStr(linesAfterRemoveDuplicate);
    let end = performance.now();
    console.log('removeDuplicateLines... cost ', `${end - start} ms`);
    return result;
  },

  buildStr: function buildStr(lines) {
    let result = '';
    lines.forEach(e => {
      if (e.length > 0) {
        result += (e + '\n')
      }
    })
    return result;
  },

  sortText: function sortText(type, text) {
    // console.log("sortText - type: %s, text: %s", type, text);
    if (!text) {
      return ''
    }
    let start = performance.now();

    let lines = text.split('\n');
    this.bubbleSort(lines);
    if ('desc' === type) {
      lines.reverse();
    }

    let result = this.buildStr(lines);
    let end = performance.now();
    console.log('sortText... cost ', `${end - start} ms`);
    return result;
  },

  // TODO 中英数字混合排序待优化，这里将数字当做字符串排序
  bubbleSort: function bubbleSort(arr) {
    for (var i = 0; i < arr.length-1; i++) {
      for (var j = i+1; j < arr.length; j++) {
        if (arr[i]>arr[j]) {
          var temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  }
}