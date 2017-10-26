<template>
	<div id="tab" class="tab">
		<ul class="ctrlWrap">
			<li><button type="button" class="btnCtrl" @click="handleTabClick('view1')">버튼1</button></li>
			<li><button type="button" class="btnCtrl" @click="handleTabClick('view2')">버튼2</button></li>
			<li><button type="button" class="btnCtrl" @click="handleTabClick('view3')">버튼3</button></li>
		</ul>
		<div class="viewWrap">
			<div class="view" v-if="tabType === 'view1'">
				<ul>
					<li v-for="item in list">{{item.text}}</li>
				</ul>
			</div>
			<div class="view" v-else-if="tabType === 'view2'">View2</div>
			<div class="view" v-else-if="tabType === 'view3'">View3</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Tab',
	data () {
		return {
			tabType: 'view1',
			list: [
				{text: "테스트1"},
				{text: "테스트2"},
				{text: "테스트3"}
			]
		}
	},
	computed: {
		// 계산된 속성중 일부가 변경된 경우에만 다시 실행
		
	},
	methods: {
		// 재 렌더링 할 때마다 실행
		handleTabClick: function(type){
			this.tabType = type
		}
	},
	watch: {
		// 비동기식 또는 시간이 많이 소요되는 조작을 수행하려는 경우에 가장 유용
	}
}
</script>

