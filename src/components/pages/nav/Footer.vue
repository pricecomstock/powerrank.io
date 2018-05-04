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
                    <div class="level-item">
                        <a class="button is-small is-light has-text-grey" href="https://blog.pricecomstock.com">by Price Comstock</a>
                    </div>
                    <div class="level-item field has-addons">
                        <p class="control">
                            <a href="https://twitter.com/price_comstock" class="button has-text-grey is-small is-light">
                                <span class="icon is-medium">
                                    <i class="fab fa-lg fa-twitter"></i>
                                </span>
                            </a>
                        </p>
                        <!-- <p class="control">
                            <a href="https://pricecomstock.com" class="button has-text-grey is-small is-light">
                                <span class="icon is-medium">
                                    <i class="fa fa-lg fa-address-card"></i>
                                </span>
                            </a>
                        </p> -->
                        <!-- <p class="control">
                            <a href="https://blog.pricecomstock.com" class="button has-text-grey is-small is-light">
                                <span class="icon is-medium">
                                    <i class="fa fa-lg fa-comment-dots"></i>
                                </span>
                            </a>
                        </p> -->
                        <!-- <p class="control">
                            <a href="https://github.com/pricecomstock" class="button has-text-grey is-small is-light">
                                <span class="icon is-medium">
                                    <i class="fab fa-lg fa-github"></i>
                                </span>
                            </a>
                        </p> -->
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