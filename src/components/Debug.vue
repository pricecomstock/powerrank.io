<div class="col-md-3">
	<pre>{{unrankedJSON}}</pre>
</div>
<div class="col-md-3">
	<pre>{{rankedJSON}}</pre>
</div>

<template>
  <div id="debug" class="row">
		<div class="col-md-6">
			<pre>{{unrankedJSON}}</pre>
		</div>
		<div class="col-md-6">
			<pre>{{rankedJSON}}</pre>
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
  