<div class="col-md-3">
	<pre>{{unrankedJSON}}</pre>
</div>
<div class="col-md-3">
	<pre>{{rankedJSON}}</pre>
</div>

<template>
  <div id="debug" class="columns">
		<div class="column is-half">
			<pre class="box">{{unrankedJSON}}</pre>
		</div>
		<div class="column is-half">
			<pre class="box">{{rankedJSON}}</pre>
		</div>
	</div>
</template>
  
  <script>
    export default {
      name: 'debug',
      computed: {
        rankedJSON: {
          get () {
            return this.$store.getters.rankedListJSON;
          }
        },
        unrankedJSON: {
          get () {
            return this.$store.getters.unrankedListJSON;
          }
        }
      },
      data () {
        return {};
      }
    };
  </script>
  
  <style>
  
  </style>
  