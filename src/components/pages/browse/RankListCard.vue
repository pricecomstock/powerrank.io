<template>
    <router-link class="box hero is-white is-small ranklink" :to="'/rank/' + rankList.id" >
        <div class="hero-head">
            <div class="level has-text-grey has-text-weight-light is-mobile">
                <div class="level-left">
                    <div class="level-item">
                        <small>@{{rankList.user || "anonymous"}}</small>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <small>{{rankList.date}}</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero-body">
            <h1 class="title is-3 has-text-centered">
                {{ rankList.title }}
            </h1>
            <!-- <h2 class="subtitle has-text-centered has-text-grey">Excellence</h2> -->
        </div>
        <div class="hero-foot">
            <div class="level is-mobile has-text-grey">
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Item Count</p>
                        <p class="is-size-5 stat">{{rankList.itemCount}}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">In Order Of</p>
                        <p class="is-size-5 stat">{{rankList.scaleName}}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Rankings</p>
                        <p class="is-size-5 stat">{{rankList.rankingCount}}</p>
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>

export default {
  name: 'inputItem',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  props: {
    rankList: {
      type: Object,
      default: true
    }
  }
  //TODO: fire an event when this item is typed in so the parent component
  //      can set this as a normal item
}
</script>

<style>
.stat {
	max-width: 150px;
	color: grey;
	font-weight: bold;
}
</style>
