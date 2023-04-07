import {
  QCircularProgress,
  QInput,
  QLinearProgress,
  QSelect,
  QToggle,
} from 'quasar'
import { defineNuxtPlugin } from '#app'
import { useQuasarPropDefaults } from '#imports'

export default defineNuxtPlugin(() => {
  useQuasarPropDefaults(QInput, {
    outlined: true,
  })

  useQuasarPropDefaults(QSelect, {
    outlined: true,
    dense: true,
  })

  useQuasarPropDefaults(QToggle, {
    color: 'red',
  })

  useQuasarPropDefaults(QCircularProgress, {
    color: 'blue',
    indeterminate: true,
  })

  useQuasarPropDefaults(QLinearProgress, {
    color: 'green',
    size: '15px',
    stripe: true,
  })
})
