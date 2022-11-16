<template>
  <div class="new-editor">

    <div class="new-editor__content">
      <div id="editor" class="editor"/>
      <div id="preview" class="editor"/>
    </div>
  </div>
</template>

<script>
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Link from '@editorjs/link';
import Image from '@editorjs/image';
import CheckList from '@editorjs/checklist';
import List from '@editorjs/list';
import Quote from '@editorjs/quote'

export default {
  name: 'new-editor',
  data() {
    return {
      editor: null,
      preview: null
    }
  },
  mounted() {
    const tools = {
      Header,
      // Link,
      Image,
      CheckList,
      List,
      Quote
    }
    this.editor = new EditorJS({
      holder: 'editor',
      tools
    })
  },
}
</script>

<style lang="scss" scoped>
.new-editor {
  &__content {
    display: flex;
    .editor {
      width: 100%;
    }
  }
}
</style>
