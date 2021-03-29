<script>
export default {
  name: 'Modal',
  props: {
    message: {
      type: String,
      default: () => '',
    },
    isOpen: {
      type: Boolean,
      default: () => false,
    },
    shippingAddress: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      editingShippingAddress: '',
    };
  },
  methods: {
    onNo() {
      this.$emit('handleNo');
    },
    onYes() {
      this.$emit('handleYes', this.editingShippingAddress);
    },
  },
};
</script>

<template>
  <div id="modal" class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirm</p>
      </header>
      <section class="modal-card-body">{{ message }}</section>
      <section class="modal-card-body">
        <div class="field">
          <label class="label" for="editingShippingAddress">Shipping address:</label>
          <input
            class="input"
            name="address"
            placeholder=""
            type="text"
            v-model="editingShippingAddress"
          />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button modal-no" @click="onNo">No</button>
        <button class="button is-primary modal-yes" @click="onYes">Yes</button>
      </footer>
    </div>
  </div>
</template>
