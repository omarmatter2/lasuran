import { defineStore } from "pinia";

export const useCart = defineStore("cart", {
    state: () => {
        return {
            isAddLoading:false,
            products: [],
            loyalty_points: {},
            payment_methods: [],
            working_times: [],
            title: "",
            sub_title: "",
            message : ""
        }
    },
    getters: {
        getProducts(state){
            return state.products ?? [];
        },
        getProductsCount(state) {
            return state.products.length;
        },
        getAvailablePaymentMethods(state) { 
            return state.payment_methods ?? [];
        }
    },
    actions: {
      fetchCart() {

      },
      emptyCart() {

      },
      addOrUpdateServiceInCart(service : any, branchId = null) {
          const menuModule = useMenu();
          this.$state.isAddLoading = true;
          return  useApi(`cart`, {
                 method: "POST",
                 body: {
                     product_id: service.id,
                     quantity:1,
                     branch_id: branchId ?? menuModule.branch_id
                 }
              },
              {
                  onSuccess: (data : any) => {
                      this.$state.isAddLoading = false;
                  },
                  onError: (err : any) => {
                      this.$state.isAddLoading = false;
                  }
              });
      },
      removeProduct(){

      }
    },
    persist: true,
});