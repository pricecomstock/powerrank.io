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
				:class="{'is-danger': !paragraphOk}"
				placeholder="Input one item per line"
				v-model="inputParagraph"></textarea>
			</div>
			<p v-if="!paragraphOk" class="help is-danger">This field is required.</p>
		</div>
		<div class="field is-grouped is-grouped-right">
			<p class="control">
				<a class="button is-primary" @click="submit()">
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
	import InputItem from './InputItem.vue'

	export default {
		name: 'InputParagraph',
		data() {
			return {
				titleOk: true,
				paragraphOk: true
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
					this.$store.dispatch('sendInputParagraphToAirtable');
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
				return this.titleOk && this.paragraphOk
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