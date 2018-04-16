<template>
    <div class="section pcfooter">
        <div class="container">
            <div class="level">
                <div class="level-left">
                    <div class="level-item has-text-grey">
                        powerrank.io v0.1.0
                    </div>
                </div>
                <div class="level-right is-size-7">
                    <div class="level-item has-text-grey">
                        by Price Comstock
                    </div>
                    <div class="level-item">
                        <a href="https://twitter.com/price_comstock" class="button has-text-grey is-small is-light">
                            <span class="icon is-medium">
                                <i class="fab fa-lg fa-twitter"></i>
                            </span>
                            <span>@price_comstock</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Footer',
	data () {
		return {
		};
	}
};
</script>

<style>
.pcfooter {
    background-color: hsl(0, 0%, 96%);
    padding: 1rem 0rem;
}
</style>