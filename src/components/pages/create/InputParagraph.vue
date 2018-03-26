<template>
	<div id="input-paragraph">

		<!-- TITLE -->
		<div class="field">
			<label class="label">Title</label>
			<div class="control">
				<input
				  class="input"
					:class="{'is-danger': $v.inputTitle.$error}"
					@blur="$v.inputTitle.$touch()"
					type="text"
					placeholder="Name your powerrank list. Something Descriptive!"
					v-model="inputTitle">
			</div>
			<p v-if="$v.inputTitle.$error" class="help is-danger">This field is required.</p>
		</div>

		<!-- RANK METRIC -->
		<div class="field">
			<label class="label">Rank Metric</label>
			<div class="control">
				<input id="scaleName"
					:class="{'is-danger': $v.scaleName.$error}"
					@input="$v.scaleName.$touch()"
					type="text"
					class="input"
					placeholder="e.g. Excellence, Awfulness, Vertical Leap"
					v-model="scaleName">
			</div>
			<p v-if="scaleName.length > 45" class="help" :class="{'is-danger': $v.scaleName.$error}">{{scaleName.length}}/{{$v.scaleName.$params.maxLen.max}}</p>
		</div>

		<!-- POWERRANK ITEMS -->
		<div class="field">
			<label class="label">Powerrank Items</label>
			<div class="control">
				<textarea
				class="textarea tallertextarea"
				:class="{'is-danger': $v.inputParagraph.$error}"
				@blur="$v.inputParagraph.$touch()"
				placeholder="Input one item per line"
				v-model="inputParagraph"></textarea>
			</div>
			<p v-if="$v.inputParagraph.$error && !$v.inputParagraph.atLeastTwoItems" class="help is-danger">At least two items are required.</p>
			<p v-if="!$v.inputParagraph.notTooMuch" class="help is-danger">You can't have more than 128 items and they can't be longer than 280 characters. Whatever you're trying to do is insane.</p>
		</div>

		<!-- USER -->
		<div class="field">
			<label class="label">Username</label>
			<div class="control has-icons-left">
				<input 
					id="username"
					type="text"
					:class="{'is-danger': $v.username.$error}"
					@input="$v.username.$touch()"
					class="input"
					placeholder="Take credit. Who needs user accounts?"
					v-model="username">
				<span class="icon is-small is-left">
				<i class="fa fa-user"></i>
				</span>
			</div>
			<p v-if="username.length > 20" class="help" :class="{'is-danger': $v.username.$error}">{{username.length}}/{{$v.username.$params.maxLen.max}}</p>
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
				<a class="button is-white" @click="clear()">
					Clear
				</a>
			</p>
			<p class="control">
				<a
					class="button is-primary"
					:class="{'is-loading': submitted}"
					@click="submit()"
					:disabled="$v.$invalid">
					Submit
				</a>
			</p>
		</div>
	</div>
</template>

<script>
	import { required, maxLength } from 'vuelidate/lib/validators'

	export default {
		name: 'InputParagraph',
		data() {
			return {
				submitted: false,
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
		validations: {
			inputTitle: {
				required
			},
			scaleName: {
				maxLen: maxLength(60)
			},
			username: {
				maxLen: maxLength(24)
			},
			inputParagraph: {
				required,
				atLeastTwoItems: value => {
					const validLines = value.split('\n').filter(item => item.trim() !== '')
					return validLines.length >= 2
				},
				notTooMuch: value => {
					const validLines = value.split('\n').filter(item => item.trim() !== '')
					return validLines.length <= 128 && validLines.every( line => line.length <= 280 )
				}
			}
		},
		methods: {
			clear() {
				this.$store.dispatch('createClear');
				this.$v.$reset()
			},
			submit() {
				if (!this.$v.$invalid) {
					this.$store.dispatch('sendInputParagraphToDatabase', this.$router)
					this.submitted = true;
				}
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
					return this.$store.getters.creatorUsername;
				},
				set(value) {
					this.$store.dispatch('setCreatorUsername', value);
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