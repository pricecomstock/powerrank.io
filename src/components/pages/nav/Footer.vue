<template>
    <div class="section pcfooter">
        <div class="container">
            <div class="level">
                <div class="level-left">
                    <div class="level-item has-text-grey">
                        powerrank.io v0.1.1
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
body {
    min-height: 100%;
    position: relative;
    padding-bottom: 4rem;
}

@media only screen and (max-width: 760px) {
    body {
        padding-bottom: 10rem;
    }
}

html {
  height: 100%;
  box-sizing: border-box;
}

.pcfooter {
    background-color: hsl(0, 0%, 96%);
    padding: 1.5rem 0rem;
    position:absolute;
    left:0px;
    right:0px;
    bottom:0px;
}
</style>