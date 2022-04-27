<template>
  <v-card>
    <Snackbar/>
    <Loader v-if="loading"/>
    <div class="categories" v-else :key="updateCount+categories.length">
      <CategoriesForm @createCategory="createCategory"/>
      <EditCategories :categories="categories"
                      @updated="updateCategory"
                      :key="updateCount+categories.length"
      />
    </div>
  </v-card>
</template>

<script>
import CategoriesForm from "../components/CategoriesForm";
import EditCategories from "../components/EditCategories";
import Snackbar from "../components/Snackbar";
import Loader from "../components/app/Loader";
export default {
  head:{
    title: 'Категории'
  },
  name: "categories",
  components: {Loader, Snackbar, EditCategories, CategoriesForm},
  data: ()=>({
    categories:[],
    loading:true,
    updateCount: 0
  }),
  async mounted() {
    this.categories=await this.$store.dispatch('category/fetchCategories')
    this.loading=false

  },
  methods:{
    createCategory(category){
      this.categories.push(category)
    },
    updateCategory(category){
      const idx=this.categories.findIndex(c=> c.id===category.id)
      this.categories[idx].title=category.title
      this.categories[idx].limit=category.limit
      this.updateCount++
      // console.log(this.updateCount)
    }
  }
}
</script>

<style scoped>
.categories{
  display: flex;
  justify-content: space-around;
}
@media (max-width: 900px) {
  .categories{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
