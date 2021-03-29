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
    };
  },
  components: {
    ListHeader,
    CatalogList,
    Modal,
  },
  async created() {
    await this.getData();
  },
  computed: {
    ...mapGetters('catalog', { catalog: 'catalog' }),
    ...mapGetters('recommendations', { recommendations: 'recommendations' }),
  },
  methods: {
    ...mapActions('icecreams', ['buyIcecreamAction']),
    ...mapActions('catalog', ['getCatalogAction']),
    ...mapActions('recommendations', ['getRecommendationsAction']),
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
    async getData() {
      await this.getCatalog();
      await this.getRecommendations();
    },
    async getCatalog() {
      this.errorMessage = undefined;
      try {
        await this.getCatalogAction();
      } catch (error) {
        this.errorMessage = 'Unauthorized';
      }
    },
    async getRecommendations() {
      this.errorMessage = undefined;
      try {
        await this.getRecommendationsAction();
      } catch (error) {
        this.errorMessage = 'Unauthorized';
      }
    },
  },
};
</script>

<template>
  <div class="content-container">
    <ListHeader title="Our Favorite" @refresh="getRecommendations" :routePath="routePath">
    </ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column" v-if="recommendations">
        <CatalogList
          :icecreams="recommendations"
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
