<template>
  <div class="q-pa-md">
    <q-list
      bordered
      separator
      style="max-width: 318px"
    >
      <q-item
        v-ripple
        clickable
      >
        <q-item-section>Single line item</q-item-section>
      </q-item>

      <q-item
        v-ripple
        clickable
      >
        <q-item-section>
          <q-item-label>Item with caption</q-item-label>
          <q-item-label caption>
            Caption
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        v-ripple
        clickable
      >
        <q-item-section>
          <q-item-label overline>
            OVERLINE
          </q-item-label>
          <q-item-label>Item with caption</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
