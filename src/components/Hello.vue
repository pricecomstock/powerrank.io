<template>
	<div class="fluid container">
		<!--<div class="form-group form-group-lg panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">Sortbale control</h3>
			</div>
			<div class="panel-body">
				<div class="checkbox">
					<label><input type = "checkbox" v-model="editable">Enable drag and drop</label>
				</div>
				<button type="button" class="btn btn-default" @click="orderList">Sort by original order</button>
			</div>
		</div>-->
		<div class="row">
			<div class="col-xs-12 col-md-1">
				<label for="debugCheck">Debug</label>
				<input type="checkbox" id="debugCheck" class="form-control" v-model="debug">
			</div>
			<div class="col-xs-12 col-md-6">
				<label for="listInput">Items</label>
				<textarea id="listInput" v-model="listInput"></textarea>
			</div>
			<div class="col-xs-1 col-md-3">
				<button class="btn btn-primary" @click="newItems">Update</button>
			</div>
		</div>


		<hr>
		<div class="col-md-3">
			<draggable class="list-group" element="ul" v-model="list" :options="dragOptions" :move="onMove" @start="isDragging=true"
			 @end="isDragging=false">
				<transition-group type="transition" :name="'flip-list'">
					<li class="list-group-item" v-for="(element, index) in list" :key="element.order">
						<!--<i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>-->
						<span class="label label-primary">{{index + 1}}</span>
						{{element.name}}
					</li>
				</transition-group>
			</draggable>
		</div>

		<div class="col-md-3">
			<draggable element="span" v-model="list2" :options="dragOptions" :move="onMove">
				<transition-group name="no" class="list-group" tag="ul">
					<li class="list-group-item" v-for="(element, index) in list2" :key="element.order">
						<!--<i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>-->
						<span class="label label-primary">{{index + 1}}</span>
						{{element.name}}
					</li>
				</transition-group>
			</draggable>
		</div>


		<div class="col-md-3" v-if="debug">
			<pre>{{listString}}</pre>
		</div>
		<div class="col-md-3" v-if="debug">
			<pre>{{list2String}}</pre>
		</div>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	const message = ['vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based', 'on', 'Sortablejs']

	export default {
		name: 'hello',
		components: {
			draggable,
		},
		data() {
			return {
				listInput: 'tritz\nelliott\nprice\nmark',
				list: [],
				list2: [],
				editable: true,
				isDragging: false,
				delayedDragging: false,
				debug: true
			}
		},
		methods: {
			// orderList() {
			// 	this.list = this.list.sort((one, two) => { return one.order - two.order; })
			// },
			onMove({relatedContext, draggedContext}) {
				const relatedElement = relatedContext.element;
				const draggedElement = draggedContext.element;
				return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
			},
			newItems() {
				this.list = this.listArray.map((name, index) => { return { name, order: index + 1, fixed: false }; })
			}
		},
		computed: {
			dragOptions() {
				return {
					animation: 0,
					group: 'description',
					disabled: !this.editable,
					ghostClass: 'ghost'
				};
			},
			listString() {
				return JSON.stringify(this.list, null, 2);
			},
			list2String() {
				return JSON.stringify(this.list2, null, 2);
			},
			listArray() {
				return this.listInput.split('\n');
			}
		},
		watch: {
			isDragging(newValue) {
				if (newValue) {
					this.delayedDragging = true
					return
				}
				this.$nextTick(() => {
					this.delayedDragging = false
				})
			}
		},
		created() {
			this.newItems()
		}
	}

</script>

<style>
	.flip-list-move {
		transition: transform 0.8s;
	}
	
	.no-move {
		transition: transform 0s;
	}
	
	.ghost {
		opacity: .5;
		background: #C8EBFB;
	}
	
	.list-group {
		min-height: 40px;
	}
	
	.list-group-item {
		cursor: move;
	}
	
	.list-group-item i {
		cursor: pointer;
	}

	#listInput {
		width: 100%;
		height: 200px;
	}

	.drag-here {
		background-color: #DDD;
		text-align: center;
		width: 100%;
		height: 100%;
	}
</style>