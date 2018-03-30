<template>
    <router-link class="box hero is-white is-small ranklink" :to="'/rank/' + rankList.id" >
    <article class="post">
        <h1 class="title is-4">{{ rankList.title }}</h1>
        <div class="media">
            <!-- <div class="media-left">
                <p class="image is-32x32">
                    <img src="http://bulma.io/images/placeholders/128x128.png">
                </p>
            </div> -->
            <div class="media-content">
                <div class="content">
                    <p class="order">
                    in order of <strong>{{rankList.scaleName}}</strong>
                    <!-- <span class="tag">Question</span> -->
                    </p>
                    <p class="">
                    <strong>@{{rankList.user || 'anonymous'}}</strong> asked {{rankList.date}}
                    <!-- <span class="tag">Question</span> -->
                    </p>
                </div>
            </div>
            <div class="media-right">
                <span class="has-text-grey-light"><i class="fa fa-comments"></i> 1</span>
            </div>
        </div>
    </article>
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

.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  /* font-weight: 700; */
  color: #8F99A3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E6EAEE;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

</style>
