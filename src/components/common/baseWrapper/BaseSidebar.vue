<template>
  <el-menu
      class="base-sidebar"
      :default-active="activeLink"
      :router="true"
  >
    <el-menu-item
        v-for="item in items"
        :index="item.to">
      <el-icon>
        <component :is="item.icon"/>
      </el-icon>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import {links} from "@/components/common/baseWrapper/links";

export default {
  name: 'base-sidebar',
  props: {
    expand: { type: Boolean }
  },
  data () {
    return {
      drawer: true,
      items: links
    }
  },
  computed: {
    activeLink() {
      if (this.$route.path.startsWith('/administration')) {
        return '/administration'
      } else if (this.$route.path.startsWith('/documents')) {
        return '/documents'
      } else if (this.$route.path.startsWith('/calculations')) {
        return '/calculations'
      } else {
        return this.$route.path
      }
    }
  },
  methods: {
    changeExpand(value) {
      this.$emit('update:expand', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-sidebar {
  position: fixed;
  width: 230px;
  min-height: calc(100vh - 56px);
  :deep(.el-menu-item) {
    .el-icon {
      font-size: 20px;
    }
    > span {
      font-size: 16px;
    }
  }
}
</style>
