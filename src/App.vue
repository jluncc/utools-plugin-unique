<script setup lang="ts">
import { Button, Row, Col, Space } from 'ant-design-vue';
import { leftContent, rightContent, duplicateLines, leftLineNums, rightLineNums, setupAppScript } from './AppScript';
import './AppStyle.css';

const { sortAsc, sortDesc, copyToClipboard, clearContent } = setupAppScript();
</script>

<template>
  <div class="container">
    <Row :gutter="[8, 8]" type="flex" align="middle" justify="start" style="width: 100%; flex-wrap: nowrap;">
      <!-- 左侧输入区域 -->
      <Col :style="{ flex: '0 0 40%', boxSizing: 'border-box' }">
      <div class="editor-container">
        <div class="line-numbers" ref="leftLineNumbers">
          <div v-for="(num, index) in leftLineNums" :key="index"
            :class="{ 'duplicate-line': duplicateLines.includes(index) }">{{ num }}</div>
        </div>
        <textarea v-model="leftContent" class="content-input" 
          placeholder="请输入内容"
          @scroll="e => { const target = e.target as HTMLElement; const leftLineNumbers = $refs.leftLineNumbers as HTMLElement | null; if (target && leftLineNumbers) leftLineNumbers.scrollTop = target.scrollTop; }" />
      </div>
      </Col>

      <!-- 中间按钮区域 -->
      <Col :style="{ flex: '0 0 20%', boxSizing: 'border-box' }">
      <Space direction="vertical" size="middle" align="center">
        <div class="button-group">
          <p>复制文本</p>
          <div class="button-row">
            <Button @click="copyToClipboard(leftContent, true)">左</Button>
            <Button @click="copyToClipboard(rightContent, false)">右</Button>
          </div>
        </div>

        <div class="button-group">
          <p>排序文本</p>
          <div class="button-row">
            <Button @click="sortAsc">升</Button>
            <Button @click="sortDesc">降</Button>
          </div>
        </div>

        <div class="button-group">
          <p>其他操作</p>
          <div class="button-row">
            <Button danger class="clear-btn" @click="clearContent">清空内容</Button>
          </div>
        </div>
      </Space>
      </Col>

      <!-- 右侧输出区域 -->
      <Col :style="{ flex: '0 0 40%', boxSizing: 'border-box' }">
      <div class="editor-container">
        <div class="line-numbers" ref="rightLineNumbers">
          <div v-for="(num, index) in rightLineNums" :key="index">{{ num }}</div>
        </div>
        <textarea v-model="rightContent" class="content-input"
          placeholder="去重后的内容" readonly
          @scroll="e => { const target = e.target as HTMLElement; const rightLineNumbers = $refs.rightLineNumbers as HTMLElement | null; if (target && rightLineNumbers) rightLineNumbers.scrollTop = target.scrollTop; }" />
      </div>
      </Col>
    </Row>
  </div>
</template>
