<template>
  <div class="contents">
		<div class="btnArea">
			<button type="button" class="btnYear" v-for="(item, index) in myData.year" :key="item.id" @click="handleYearClick(item.id, index)" :class="{active: isActive === index}">{{item.text}}</button>
		</div>
		<div class="projectList" v-bind="setViewAlign()">
			<div class="view" v-for="item in fliterObj" :key="item.id">
				<p class="tit">{{item.title}}</p>
				<p class="txt">{{item.text}}</p>
				<div class="btnWrap">
					<a :href="item.url" class="btn" target="_blank" v-if="item.url !== ''">작업물보기</a>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
// 객체에 충돌할경우 컴포넌트 옵션이 우선순위
// var mixin = {
// 	methods: {
// 		mixinTest: function(){
// 			console.log("mixin")
// 		}
// 	}
// }

// 지정 디렉티브
// 훅 함수 - bind, inserted, update, componentUpdated, unbind
// directives: {
//   focus: {
//     // 디렉티브 정의
//     inserted: function (el) {
//       el.focus()
//     }
//   }
// }

import axios from 'axios';

export default {
	// mixins: [mixin],
	name: 'ProjectList',
	data () {
		return {
			isActive: 0,
			yearFilter: 0,
			myData: []
		}
	},

	created: function() {
		this.$http.get('/api/data').then((response) => {
			this.myData = response.data[0]
		}).catch(e => {
			console.log("e", e);
		});
	},

	computed: {
		// 계산된 속성중 일부가 변경된 경우에만 다시 실행
		fliterObj: function(){
			if(this.myData.length === 0) return;
			var yearFilter = this.yearFilter
			if(yearFilter === 0){
				// this.mixinTest()
				return this.myData.list.slice().reverse()
			} else{
				return this.myData.list.slice().reverse().filter(function(item){
					return item.yearID === yearFilter
				})
			}
		}
	},

	methods: {
		// 재 렌더링 할 때마다 실행
		setViewAlign: function(){
			this.$nextTick(function(){
				let $projectList = $(".projectList")
				let $view = $(".view")

				$projectList.find($view).each(function(idx){
					let viewW = $(this).outerWidth(true)
					let viewH = $(this).outerHeight(true)
					let viewGapX = 5
					let viewGapY = 5
					let margin = 2.5
					let viewOuterW = viewW + viewGapX
					let viewOuterH = viewH + viewGapY
					let count = parseInt($projectList.width() / (viewW + viewGapX))
					let randomW = Math.floor(Math.random() * (viewOuterW * count - viewOuterW))
					let randomH = Math.floor(Math.random() * (viewOuterH * parseInt(idx / count)))
					let settingW = viewOuterW * parseInt(idx % count) + margin
					let settingH = viewOuterH * parseInt(idx / count)

					TweenMax.set($(this), { x: randomW, y: randomH, scaleX: .5, scaleY: .5, force3D: true })
					$(this).show()
					TweenMax.to($(this), .7, { x: settingW, y: settingH, scaleX: 1, scaleY: 1, opacity: 1, ease: Power1.easeInOut })
					$projectList.css({ "height": viewOuterH * parseInt(idx / count) + viewOuterH })
				})
			})
		},

		handleYearClick: function(yearID, index){
			this.yearFilter = yearID
			this.isActive = index
		}
	},

	components: {

	},

	watch: {
		// 비동기식 또는 시간이 많이 소요되는 조작을 수행하려는 경우에 가장 유용
	},

	// Vue 라이프 사이클
	// 1. Creation : 컴포넌트 초기화 단계
	// Creation 단계에서 실행되는 훅(hook)들이 라이프사이클 중에서 가장 처음 실행된다. 
	// 이 단계는 컴포넌트가 돔에 추가되기 전이다. 서버 렌더링에서도 지원되는 훅이다.
	beforeCreate () {
      console.log("beforeCreate")
	},
	
	// 2. Mounting : 돔(DOM) 삽입 단계
	// Mounting 단계는 초기 렌더링 직전에 컴포넌트에 직접 접근할 수 있다. 서버렌더링에서는 지원하지 않는다. 
	// 초기 랜더링 직전에 돔을 변경하고자 한다면 이 단계를 활용할 수 있다. 
	// 그러나 컴포넌트 초기에 세팅되어야할 데이터 페치는 created 단계를 사용하는것이 낫다.
	beforeMount() {
		console.log("beforeMount")
	},
	mounted() {
		this.$nextTick(function () {
			// 모든 화면이 렌더링된 후 실행합니다.
			console.log("mounted")
		})
	},

	// 3. Updating : Diff 및 재 렌더링 단계
	// 컴포넌트에서 사용되는 반응형 속성들이 변경되거나 어떤 이유로 재 렌더링이 발생되면 실행된다. 
	// 디버깅이나 프로파일링 등을 위해 컴포넌트 재 렌더링 시점을 알고 싶을때 사용하면 된다. 
	// 조심스럽지만, 꽤 유용하게 활용될 수 있는 단계이다. 서버렌더링에서는 호출되지 않는다.
	beforeUpdate() {
		console.log("beforeUpdate")
	},
	updated() {
		this.$nextTick(function () {
			// 모든 화면이 렌더링된 후 실행합니다.
			console.log("updated")
		})
	},

	// 4. Destruction : 해체 단계
	// 이 훅은 해체(뷰 인스턴스 제거)되기 직전에 호출된다. 
	// 컴포넌트는 원래 모습과 모든 기능들을 그대로 가지고 있다. 
	// 이벤트 리스너를 제거하거나 reactive subscription을 제거하고자 한다면 이 훅이 제격이다. 서버 렌더링시 호출되지 않는다.
	beforeDestroy() {
		console.log("beforeDestroy")
	},
	destroyed() {
		console.log("destroyed")
	}
}
</script>


<style scoped>
/* Common */
.btnYear {display:inline-block;height:28px;margin-left:5px;padding:0 5px;border:1px solid #ccc;border-radius:3px;background:#fff;font-size:14px;line-height:28px;}
.btnYear.active {background:#757380;border:1px solid #757380;font-weight:bold;color:#fff;}

/* Contents */
.btnArea {margin-bottom:20px;text-align:right;}

.projectList {position:relative;}
.projectList > .view {position:absolute;top:0;left:0;overflow:hidden;width:208px;height:101px;padding:150px 15px 15px;border:1px solid #e4e4e4;background:#fff;}
.projectList .tit {overflow:hidden;font-weight:bold;font-size:16px;line-height:20px;text-overflow:ellipsis;white-space:nowrap;}
.projectList .txt {overflow:hidden;margin-top:10px;font-size:14px;text-overflow:ellipsis;white-space:nowrap;}
.projectList .btnWrap {padding-top:15px;margin-top:15px;border-top:1px solid #aeb4bd;}
.projectList .btn {display:inline-block;height:28px;padding:0 5px;border:1px solid #ccc;border-radius:3px;font-size:12px;font-weight:bold;line-height:28px;}
</style>

