<template>
	<div id="input-paragraph">

		<!-- TITLE -->
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

		<!-- RANK METRIC -->
		<div class="field">
			<label class="label">Rank Metric</label>
			<div class="control">
				<input id="scaleName" type="text" class="input" placeholder="e.g. Excellence, Awfulness, Vertical Leap"
				v-model="scaleName">
			</div>
		</div>

		<!-- POWERRANK ITEMS -->
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

		<!-- USER -->
		<div class="field">
			<label class="label">Username</label>
			<div class="control has-icons-left">
				<input id="username" type="text" class="input" placeholder="Take credit. Who needs user accounts?"
				v-model="username">
				<span class="icon is-small is-left">
				<i class="fa fa-user"></i>
				</span>
			</div>
		</div>

		<!-- VISIBILITY -->
		<div class="field">
			<div class="control">
				<label class="checkbox">
					<input type="checkbox" v-model="publiclyVisible">
					Public
				</label>
			</div>
		</div>
		
		<!-- SUBMIT AND CLEAR BUTTONS -->
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
				paragraphEnoughLines: true,
				scaleNamePlaceholders: [
					'Excellence',
					'Vertical Leap',
					'Awfulness',
					'Bench Press 1RM',
					'Coolness',
					'Best Laugh',
					'Generosity'
				]
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
			},
			scaleName: {
				get() {
					return this.$store.getters.scaleName;
				},
				set(value) {
					this.$store.dispatch('setScaleName', value);
				}
			},
			username: {
				get() {
					return this.$store.getters.username;
				},
				set(value) {
					this.$store.dispatch('setUsername', value);
				}
			},
			publiclyVisible: {
				get() {
					return this.$store.getters.publiclyVisible;
				},
				set(value) {
					this.$store.dispatch('setPubliclyVisible', value);
				}
			}
		}
	}
</script>

<style>
	.tallertextarea {
		height: 200px;
	}
	/* #scaleName::placeholder {
		color: #000;
		opacity: 0.3;
		transition: opacity 0.8s ease-in-out;
	} */
</style>