<script setup lang="ts">
import {ref} from "#imports";

const toggle = ref(true);
const progress = ref(0.5);
</script>


<template>
  <div>
    <p>Default Quasar Prop values can be set in <code>"/plugins/quasar-prop-defaults.ts"</code></p>
    <q-markup-table style="max-width: 600px;">
      <tr>
        <td>
          Q-CircularProgress with blue as the default color:
        </td>
        <td>
          <QCircularProgress/>
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
          <QLinearProgress value="progress" indeterminate/>
        </td>
      </tr>
    </q-markup-table>
  </div>
</template>

