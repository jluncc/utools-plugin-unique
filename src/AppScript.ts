import { ref, watch } from 'vue';
import { message } from 'ant-design-vue';

// 响应式变量
export const leftContent = ref('');
export const rightContent = ref('');
export const duplicateLines = ref<number[]>([]);
export const leftLineNums = ref<string[]>([]);
export const rightLineNums = ref<string[]>([]);

export function setupAppScript() {
  // 监听左侧内容变化，实时去重
  watch(leftContent, (newVal) => {
    const lines = newVal.split('\n');
    updateLeftLineNumbers(lines.length);
    findDuplicateLines(lines);
    rightContent.value = removeDuplicates(lines).join('\n');
  });

  // 同步右侧行号
  watch(rightContent, (newVal) => {
    const lines = newVal.split('\n');
    updateRightLineNumbers(lines.length);
  });

  // 更新左侧行号
  const updateLeftLineNumbers = (count: number) => {
    leftLineNums.value = Array.from({ length: Math.max(count, 30) }, (_, i) => (i + 1).toString());
  };

  // 更新右侧行号
  const updateRightLineNumbers = (count: number) => {
    rightLineNums.value = Array.from({ length: Math.max(count, 30) }, (_, i) => (i + 1).toString());
  };

  // 查找重复行
  const findDuplicateLines = (lines: string[]) => {
    const lineMap = new Map<string, number[]>();
    lines.forEach((line, index) => {
      if (!lineMap.has(line)) {
        lineMap.set(line, []);
      }
      lineMap.get(line)!.push(index);
    });

    const duplicates: number[] = [];
    lineMap.forEach((indices) => {
      if (indices.length > 1) {
        duplicates.push(...indices);
      }
    });
    duplicateLines.value = duplicates;
  };

  // 去重逻辑
  const removeDuplicates = (lines: string[]): string[] => {
    const seen = new Set<string>();
    return lines.filter(line => {
      if (seen.has(line)) return false;
      seen.add(line);
      return true;
    });
  };

  // 升序排序
  const sortAsc = () => {
    // 处理左侧输入框
    const leftLines = leftContent.value.split('\n');
    leftLines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    leftContent.value = leftLines.join('\n');

    // 处理右侧输入框
    const rightLines = rightContent.value.split('\n');
    rightLines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    rightContent.value = rightLines.join('\n');
  };

  // 降序排序
  const sortDesc = () => {
    // 处理左侧输入框
    const leftLines = leftContent.value.split('\n');
    leftLines.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }));
    leftContent.value = leftLines.join('\n');

    // 处理右侧输入框
    const rightLines = rightContent.value.split('\n');
    rightLines.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }));
    rightContent.value = rightLines.join('\n');
  };

  // 复制文本
  const copyToClipboard = (content: string, isLeft: boolean) => {
    navigator.clipboard.writeText(content).then(() => {
      message.success(`已复制${isLeft ? '左侧' : '右侧'}内容`);
    });
  };

  // 清空内容
  const clearContent = () => {
    leftContent.value = '';
    rightContent.value = '';
    duplicateLines.value = [];
  };

  // 初始化行号
  updateLeftLineNumbers(30);
  updateRightLineNumbers(30);

  return {
    sortAsc,
    sortDesc,
    copyToClipboard,
    clearContent
  };
}