<template>
  <div class="fluid container">
    <!-- Debug -->
    <div class="row">
      <button @click="debug=!debug" class="button is-warning" :class="{'btn-warning':debug, 'btn-default':!debug}">Debug Mode</button>
      <debug-panel v-if="debug"></debug-panel>
    </div>
    <hr>
    <div class="columns">
      <!-- PowerRanking -->
      <div class="column is-one-fourth"></div>
      <draggable-list class="column is-one-fourth" :ranked="false"></draggable-list>
      <draggable-list class="column is-one-fourth" :ranked="true"></draggable-list>

      <div class="column is-one-fourth">
        <div class="field">
          <label class="label">Name</label>
          <div class="control has-icons-left">
            <input class="input" type="text" placeholder="who needs user accounts" v-model="username">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </div>
        </div>

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
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import draggableList from './DraggableList.vue';
  import debugPanel from '../Debug.vue';

  export default {
    name: 'powerRank',
    components: {
      draggable,
      'draggable-list': draggableList,
      debugPanel
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
          'is-disabled': true,
          'is-loading': this.submitted
        }
      }
    },
    methods: {
      loadPowerRank(id) {
        // this.$store.dispatch('loadFromAirtable', id);
        // this.$store.dispatch('loadFromPresets', id);
        this.$store.dispatch('loadPowerRankFromAirtable', id);
      },
      reset() {
        this.$store.dispatch('resetRankLists');
      },
      submit() {
        this.$store.dispatch('submitPowerRankToAirtable', this.$router)
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