<template>
  <div>
    <section class="hero is-small is-white">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="subtitle is-3">
            Please powerrank <strong>{{rankList.title}}</strong> in order of <strong>{{rankList.scaleName}}</strong>
          </h1>
        </div>
      </div>
    </section>
    <div class="section" style="padding-top:0px;">
      <div class="container columns is-fluid">
        <!-- PowerRanking -->
        <draggable-list class="column is-one-third" :ranked="false"></draggable-list>
        <draggable-list class="column is-one-third" :ranked="true"></draggable-list>
  
        <div class="column is-one-third">
          <div class="field">
            <label class="label">Name</label>
            <div class="control has-icons-left">
              <input class="input" type="text" placeholder="who needs user accounts" v-model="username">
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
            </div>
          </div>
  
          <div class="column is-one-third">
            <div class="field is-grouped">
              <p class="control">
                <a class="button is-primary is-medium" :class="submitButtonClasses" @click="submit()">
                  Submit
                </a>
              </p>
              <p class="control">
                <a class="button is-medium is-outlined is-danger" @click="reset()">
                  Reset
                </a>
              </p>
              <p class="control">
                <router-link :to="`/rankresults/${id}`" class="button is-medium">Results</router-link>
              </p>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import draggableList from '../../lists/DraggableList.vue';
	import rankListStats from '../pieces/RankListStats.vue'
  // import debugPanel from '../Debug.vue';

  export default {
    name: 'powerRank',
    components: {
      draggable,
      'draggable-list': draggableList,
      rankListStats
      // debugPanel
    },
    props: {
      id: {
        type: String,
        default: 'a'
      }
    },
    data() {
      return {
        debug: false,
        submitted: false,
        presets: this.$store.getters.presets
      };
    },
    computed: {
      username: {
        get () {
          return this.$store.getters.username;
        },
        set (value) {
          this.$store.dispatch('setUsername', value);
        }
      },
      submitButtonClasses () {
        return {
          'is-disabled': this.$store.getters.rankedList.length > 0,
          'is-loading': this.submitted
        }
      },
      rankList () {
        return this.$store.getters.rankList;
      }
    },
    methods: {
      loadPowerRank(id) {
        // this.$store.dispatch('loadFromAirtable', id);
        // this.$store.dispatch('loadFromPresets', id);
        this.$store.dispatch('loadPowerRankFromDatabase', id);
      },
      reset() {
        this.$store.dispatch('resetRankLists');
      },
      submit() {
        if (this.$store.getters.rankedList.length > 0)
        this.$store.dispatch('submitPowerRankToDatabase', this.$router)
        // this.$store.dispatch('submitPowerRankToAirtable', this.$router)
      }
    },
    watch: {
      '$route'() {
        this.loadPowerRank(this.id)
      }
    },
    created() {
      this.loadPowerRank(this.id);
    }
  };
</script>

<style>
</style>