<template>
  <router-link class="hero is-white is-small ranklink" :to="'/rank/' + rankList.id" >
      <div class="hero is-small">
        <div class="hero-head username">
          <small>@{{rankList.user || "anonymous"}}, {{rankList.date}}</small>
        </div>
        <div class="hero-body">
          <h1 class="title">{{ rankList.title }}</h1>
          <p class="has-text-grey">
            in order of <span class="scalename">{{rankList.scaleName}}</span>
          </p>
        </div>
        <div class="hero-foot">
          <div class="level stats is-mobile">
            <div class="level-left">
              <div class="stat2 level-item has-text-grey">
                <small>{{rankList.itemCount}} items</small>
              </div>
              <div class="stat2 level-item has-text-grey">
                <small>{{rankList.rankingCount}} rankings</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <h1 class="title is-3">{{ rankList.title }}</h1>
      <div class="media">
          <div class="media-content">
              <div class="content">
                  <p class="order">
                    in order of <strong>{{rankList.scaleName}}</strong>
                    <br>
                    <strong>@{{rankList.user || 'anonymous'}}</strong> asked {{rankList.date}}
                  </p>
              </div>
          </div>
          <div class="media-right">
            <span class="is-size-5">
              <i class="fas fa-chart-line"></i> 1
            </span>
          </div>
      </div> -->
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
.scalename {
  color: hsl(0, 0%, 48%);
  font-weight: bold;
}

.stats {
  padding: 0rem 1.5rem 1rem 1.5rem;
}

.title:not(:last-child) {
  margin-bottom: 1rem;
}

.hero.is-small .hero-body {
    padding-bottom: 1rem;
    padding-top: 0.5rem;
}

.hero-head.username {
	color: hsl(0, 0%, 48%);
  padding: 1rem 0rem 0rem 1.5rem;
}

.stat2 {
	color: hsl(0, 0%, 48%);
}

.level-item.stat2 {
  padding: 0rem 0.75rem 0rem 0rem;
}
</style>
