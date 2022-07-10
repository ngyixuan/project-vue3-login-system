<template>
    <div>
            <el-result
        icon="warning"
        title="Warning Tip"
        sub-title="Please follow the instructions"
      >
        <template #extra>
          <el-button @click="$router.push('/')" type="primary">Back</el-button>
        </template>
      </el-result>
    </div>
</template>