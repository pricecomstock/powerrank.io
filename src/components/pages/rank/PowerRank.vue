<template>
  <div>
    <section class="hero is-white is-small">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="subtitle is-4">
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
          <div class="field has-addons is-horizontal">
            <!-- <div class="field-label is-normal">
              <label class="label">Name</label>
            </div> -->
            <div class="control has-icons-left is-expanded">
              <input class="input is-medium"
                type="text"
                :class="{'is-danger': $v.username.$error}"
					      @input="$v.username.$touch()"
                @keyup.enter="submit()"
                placeholder="Name"
                v-model="username">
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
              <p v-if="username.length > 20" class="help" :class="{'is-danger': $v.username.$error}">{{username.length}}/{{$v.username.$params.maxLen.max}}</p>
            </div>
            <p class="control">
              <a class="button is-medium is-primary" :class="submitButtonClasses" @click="submit()" :disabled="!validRanking">
                <span class="icon">
                <i class="fas fa-check"></i>
                </span>
                <span>Submit</span>
              </a>
            </p>
          </div>
            
            <div class="field is-grouped is-grouped-right">
              <p class="control">
                <a class="button is-outlined is-danger" @click="reset()">
                  <span class="icon">
                  <i class="fas fa-undo"></i>
                  </span>
                  <span>Reset</span>
                </a>
              </p>
              <p class="control">
                <router-link :to="`/rankresults/${id}`" class="button">
                <span class="icon">
                  <i class="fas fa-trophy"></i>
                </span>
                <span>Results</span>
                </router-link>
              </p>
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
	import { maxLength, minLength } from 'vuelidate/lib/validators'
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
    validations: {
      username: {
        maxLen: maxLength(24)
      },
      
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
      },
      validRanking () {
        const numRequiredToRank = this.$store.getters.rankedList.numRequiredToRank || 2
        return this.$store.getters.rankedList.length >= numRequiredToRank
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
        if (this.validRanking) {
          this.$store.dispatch('submitPowerRankToDatabase', this.$router)
        }
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