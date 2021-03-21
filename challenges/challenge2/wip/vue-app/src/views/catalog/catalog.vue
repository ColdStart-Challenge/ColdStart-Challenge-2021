<script>
import { mapActions, mapGetters } from 'vuex';
import ListHeader from '@/components/list-header.vue';
import Modal from '@/components/modal.vue';
import CatalogList from './catalog-list.vue';

const captains = console;

export default {
  name: 'Catalog',
  data() {
    return {
      errorMessage: '',
      message: '',
      routePath: '/catalog',
      showModal: false,
      title: 'Our Ice Creams',
      personalizerTitle: 'Products you might like:',
    };
  },
  components: {
    ListHeader,
    CatalogList,
    Modal,
  },
  async created() {
    await this.getCatalog();
    await this.getPersonalizerAction();
  },
  computed: {
    ...mapGetters('catalog', { catalog: 'catalog' }),
    ...mapGetters('catalog', { recommended: 'recommended' }),
    recommendation() {
      const id = Number.parseInt(this.recommended.Id, 10);
      return this.catalog.filter((x) => x.Id === id)[0];
    },
  },
  methods: {
    ...mapActions('icecreams', ['buyIcecreamAction']),
    ...mapActions('catalog', ['getCatalogAction']),
    ...mapActions('catalog', ['getPersonalizerAction']),
    askToBuy(icecream) {
      this.icecreamToBuy = icecream;
      this.showModal = true;
      if (this.icecreamToBuy.Name) {
        this.message = `Would you like to buy ${this.icecreamToBuy.Name}?`;
        captains.log(this.message);
      }
    },
    closeModal() {
      this.showModal = false;
    },
    buyIcecream(shippingAddress) {
      this.closeModal();
      if (this.icecreamToBuy) {
        captains.log(`You said you want to buy ${this.icecreamToBuy.Name}`);
        captains.log(`Address: ${shippingAddress}`);
        this.icecreamToBuy.ShippingAddress = shippingAddress;
        this.buyIcecreamAction(this.icecreamToBuy);
      }
    },
    async getCatalog() {
      this.errorMessage = undefined;
      try {
        await this.getCatalogAction();
      } catch (error) {
        this.errorMessage = 'Unauthorized';
      }
    },
    async getPersonalizer() {
      this.errorMessage = undefined;
      try {
        await this.getPersonalizerAction();
      } catch (error) {
        this.errorMessage = 'Unauthorized';
      }
    },
  },
};
</script>

<template>
  <div class="content-container">
    <ListHeader :title="personalizerTitle" @refresh="getPersonalizer" :routePath="routePath">
    </ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column" v-if="recommended">
        <CatalogList
          :icecreams="recommendation"
          :errorMessage="errorMessage"
          @bought="askToBuy($event)"
        ></CatalogList>
      </div>
    </div>
    <ListHeader :title="title" @refresh="getCatalog" :routePath="routePath">
    </ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column" v-if="catalog">
        <CatalogList
          :icecreams="catalog"
          :errorMessage="errorMessage"
          @bought="askToBuy($event)"
        ></CatalogList>
      </div>
    </div>

    <Modal
      class="modal-product"
      :message="message"
      :isOpen="showModal"
      @handleNo="closeModal"
      @handleYes="buyIcecream($event)"
    ></Modal>
  </div>
</template>
