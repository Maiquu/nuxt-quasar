<script setup lang="ts">
import {ref} from "#imports";
const toggle = ref(true);
</script>


<template>
  <div>
    <QMarkupTable style="max-width: 600px;">
      <tbody>
        <tr>
          <td>
            Q-CircularProgress with blue as the default color:
          </td>
          <td>
            <QCircularProgress />
          </td>
        </tr>
        <tr>
          <td>
            Q-Toggle with red as the default color:
          </td>
          <td>
            <QToggle v-model="toggle"/>
          </td>
        </tr>
        <tr>
          <td>
            Q-Linear-Progress with green as the default color:
          </td>
          <td>
            <QLinearProgress indeterminate/>
          </td>
        </tr>
      </tbody>
    </QMarkupTable>
  </div>
</template>
