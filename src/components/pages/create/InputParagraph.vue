<template>
	<div id="input-paragraph">
		<div class="field">
			<label class="label">Title</label>
			<div class="control">
				<input
				  class="input"
					:class="{'is-danger': !titleOk}"
					type="text"
					placeholder="Name your powerrank list. Something Descriptive!"
					v-model="inputTitle">
			</div>
			<p v-if="!titleOk" class="help is-danger">This field is required.</p>
		</div>
		<div class="field">
			<label class="label">Powerrank Items</label>
			<div class="control">
				<textarea
				class="textarea tallertextarea"
				:class="{'is-danger': !paragraphOk || !paragraphEnoughLines}"
				placeholder="Input one item per line"
				v-model="inputParagraph"></textarea>
			</div>
			<p v-if="!paragraphOk || !paragraphEnoughLines" class="help is-danger">This field is required and must have at least 2 lines.</p>
		</div>
		<div class="field is-grouped is-grouped-right">
			<p class="control">
				<a
					class="button is-primary"
					:class="{'is-loading': submitted}"
					@click="submit()">
					Submit
				</a>
			</p>
			<p class="control">
				<a class="button is-light" @click="clear()">
					Clear
				</a>
			</p>
		</div>
	</div>
</template>

<script>
	import InputItem from '../../lists/listItems/InputItem.vue'

	export default {
		name: 'InputParagraph',
		data() {
			return {
				titleOk: true,
				paragraphOk: true,
				submitted: false,
				paragraphEnoughLines: true
			}
		},
		components: {
			inputItem: InputItem
		},
		methods: {
			clear() {
				this.$store.dispatch('setInputParagraph', '');
			},
			submit() {
				if (this.checkInput()) {
					// send router instance so that it can change the page after airtable responds
					// this is bad
					// i am bad
					// #asyncprogramming
					this.$store.dispatch('sendInputParagraphToDatabase', this.$router)
					// this.$store.dispatch('sendInputParagraphToAirtable', this.$router)
					this.submitted = true;
				}
			},
			checkInput() {
				if (!this.inputTitle) {
					this.titleOk = false;
				} else {
					this.titleOk = true;
				}
				if (!this.inputParagraph) {
					this.paragraphOk = false;
				} else {
					this.paragraphOk = true;
				}
				if (this.inputParagraph.split('\n').filter(item => item.trim() !== '').length < 2) {
					this.paragraphEnoughLines = false;
				} else {
					this.paragraphEnoughLines = true;
				}

				return this.titleOk && this.paragraphOk && this.paragraphEnoughLines
			}
		},
		computed: {
			inputParagraph: {
				get() {
					return this.$store.getters.inputParagraph;
				},
				set(value) {
					this.$store.dispatch('setInputParagraph', value);
				}
			},
			inputTitle: {
				get() {
					return this.$store.getters.inputTitle;
				},
				set(value) {
					this.$store.dispatch('setInputTitle', value);
				}
			}
		}
	}
</script>

<style>
	.tallertextarea {
		height: 250px;
	}
</style>