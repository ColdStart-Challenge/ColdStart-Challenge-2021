<script>
import CardContent from '@/components/card-content.vue';
import ButtonFooter from '@/components/button-footer.vue';

export default {
  name: 'CatalogList',
  props: {
    icecreams: {
      type: Array,
      default: () => [],
    },
    errorMessage: {
      type: String,
      default: () => '',
    },
  },
  components: {
    CardContent,
    ButtonFooter,
  },
  data() {
    return {
    };
  },
  methods: {
    clicked: (item) => {
      console.log(item);

      // const o = JSON.parse(item);
      // console.log(o);

      // {
      //     "Id": "0B476647-586A-EB11-9889-000D3AB17657",
      //     "User": "Pip Doe",
      //     "Date": "2021-02-08T21:54:56.260Z",
      //     "IcecreamId": 1,
      //     "Status": "New",
      //     "DriverId": null,
      //     "FullAddress": "1 Microsoft Way, Redmond, WA 98052, USA",
      //     "LastPosition": null
      // }

      if (item.Id) {
      // if (o.Id) {
        console.log('Valid submit event payload!');
        return true;
      }
      console.warn('Invalid submit event payload!');
      return false;
    },
    clicked2(item) {
      console.log(item);
      const o = JSON.parse(item);
      console.log(o);
      if (item.Id) {
        console.log('Valid submit event payload!');
        return true;
      }
      console.warn('Invalid submit event payload!');
      return false;
    },
  },
};
</script>

<template>
  <div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-if="!icecreams.length && !errorMessage">
      Loading data ...
    </div>
    <div class="container">
      <div
        v-for="(icecream) in icecreams"
        :key="icecream.Id"
        role="presentation"
      >
        <div class="card">
          <CardContent
            :name="icecream.Name"
            :description="icecream.Description"
            :imageurl="icecream.ImageUrl"
          />
          <ButtonFooter @clicked="clicked"
            :item="icecream"
            label="Add To Cart"
          />
        </div>
      </div>
    </div>
  </div>
</template>
