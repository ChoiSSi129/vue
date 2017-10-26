<template>
  <div class="contents">
		<div class="btnArea">
			<button type="button" class="btnYear" v-for="item in myData.year" :key="item.id" @click="handleYearClick(item.id)">{{item.text}}</button>
		</div>
		<div class="projectList">
			<div class="view" v-for="item in handleReverse()" :key="item.id">
				<p class="tit">{{item.title}}</p>
				<p class="txt">{{item.text}}</p>
				<div class="btnWrap">
					<a :href="item.url" class="btn">자세히보기</a>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'ProjectList',
  data () {
    return {
			myData: {
				year : [
					{ "id":0, "text":"전체보기" },
					{ "id":1, "text":"2012년" },
					{ "id":2, "text":"2013년" },
					{ "id":3, "text":"2014년" },
					{ "id":4, "text":"2015년" },
					{ "id":5, "text":"2016년" },
					{ "id":6, "text":"2017년" }
				],
				list: [
					{ "id":0, "yearID":1, "url":"", "title":"새누리당 리뉴얼 홈페이지 서브페이지 구축", "text":"2012년 1월 ~ 2012년 3월" },
					{ "id":1, "yearID":1, "url":"", "title":"삼성 SDS 삼성apps 운영", "text":"2012년 4월 ~ 2012년 6월" },
					{ "id":2, "yearID":1, "url":"", "title":"SKc&c T멤버십 모바일 앱 웹영역 유지보수 및 운영", "text":"2012년 6월 ~ 2013년 8월" },
					{ "id":3, "yearID":1, "url":"./bizT/index.html", "title":"비즈티월드", "text":"2012년 11월" },
					{ "id":4, "yearID":2, "url":"./biz2013/sample.html", "title":"비즈티월드", "text":"2013년6월 ~ 2013년 8월" },
					{ "id":5, "yearID":2, "url":"./style/sample.html", "title":"국립중앙도서관 서지유통관리자 홈페이지 구축", "text":"2013년 9월 ~ 2013년 12월" },
					{ "id":6, "yearID":2, "url":"./search/sample.html", "title":"국립중앙도서관 검색대PC 페이지 구축", "text":"2013년 11월 ~ 2013년 12월" },
					{ "id":7, "yearID":3, "url":"./skymall/sample.html", "title":"스카이몰", "text":"2014년 4월" },
					{ "id":8, "yearID":3, "url":"http://newyongpyong.m4nc.net/path.html", "title":"용평리조트", "text":"2014년 7월 ~ 2014년 9월" },
					{ "id":9, "yearID":3, "url":"./ucomic/path.html", "title":"만화1번지", "text":"2014년 9월 ~ 2015년 2월" },
					{ "id":10, "yearID":4, "url":"", "title":"삼성 SDS IMS1.1 구축", "text":"2015년 3월 ~ 2015년 11월" },
					{ "id":11, "yearID":4, "url":"", "title":"삼성 SDS IMS1.5 구축", "text":"2015년 3월 ~ 2015년 11월" },
					{ "id":12, "yearID":4, "url":"", "title":"삼성 SDS BCM 고도화 프로젝트", "text":"2015년 12월 ~ 2016년 3월" },
					{ "id":13, "yearID":5, "url":"./cyworld/web/index.html", "title":"싸이월드 메인 개편(웹)", "text":"2016년 2월" },
					{ "id":14, "yearID":5, "url":"./cyworld/mobile/index.html", "title":"싸이월드 메인 개편(모바일)", "text":"2016년 2월" },
					{ "id":15, "yearID":5, "url":"./samsungcrop/path_kor.html", "title":"삼성물산 구축(국문)", "text":"2016년 4월" },
					{ "id":16, "yearID":5, "url":"./samsungcrop/path_eng.html", "title":"삼성물산 구축(영문)", "text":"2016년 4월" },
					{ "id":17, "yearID":5, "url":"./sharedPlatform/html/allplus/path.html", "title":"신한은행 신나는한판", "text":"2016년 9월 ~ 11월" },
					{ "id":18, "yearID":5, "url":"./sharedPlatform/html/allplus/bp_path.html", "title":"신한은행 신나는한판(동시개설)", "text":"2016년 9월 ~ 11월" },
					{ "id":19, "yearID":6, "url":"", "title":"신한은행 개인 인터넷뱅킹 스크립트 지원", "text":"2016년 12월 ~  2017년 1월" },
					{ "id":20, "yearID":6, "url":"./hyundai/mobile/path.html", "title":"현대카드 법인 모바일웹 구축", "text":"2017년 4월 ~  2017년 6월" },
					{ "id":21, "yearID":6, "url":"", "title":"평창 IOT 개방형플랫폼 구축", "text":"2017년 7월 ~  2017년 9월" },
					{ "id":22, "yearID":6, "url":"https://github.com/ChoiSSi129/ChoiSSi129.github.io", "title":"삼성아몰레드 마이크로사이트 리뉴얼", "text":"2017년 9월 ~  2017년 10월" },
					{ "id":23, "yearID":6, "url":"./m4ncStudy/path.html", "title":"M4NC Study", "text":"2016년 6월" },
					{ "id":24, "yearID":6, "url":"./study/path.html", "title":"스터디", "text":"스터디 자료" },
					{ "id":25, "yearID":6, "url":"./cls_ex/index.html", "title":"ES6 Base", "text":"ES6 Base" },
					{ "id":26, "yearID":6, "url":"./htmlBase/index.html", "title":"HTML Base", "text":"HTML Base" }
				]
			}
		}
  },
  components: {
		
	},
	computed: {
		// 계산된 속성중 일부가 변경된 경우에만 다시 실행
	},
	methods: {
		// 재 렌더링 할 때마다 실행
		handleReverse: function(){
			return this.myData.list.slice().reverse()
		},
		handleYearClick: function(yearID){
			console.log(yearID)
		}
	},
	watch: {
		// 비동기식 또는 시간이 많이 소요되는 조작을 수행하려는 경우에 가장 유용
	}
}
</script>

<style scoped>
/* Common */
.btnYear {display:inline-block;height:28px;margin-left:5px;padding:0 5px;border:1px solid #ccc;border-radius:3px;background:#fff;font-size:14px;line-height:28px;}
.btnYear.current {background:#757380;border:1px solid #757380;font-weight:bold;color:#fff;}

/* Contents */
.btnArea {margin-bottom:20px;text-align:right;}

.projectList {position:relative;}
.projectList > .view {position:absolute;top:0;left:0;overflow:hidden;width:208px;height:101px;padding:150px 15px 15px;border:1px solid #e4e4e4;background:#fff;}
.projectList .tit {overflow:hidden;font-weight:bold;font-size:16px;line-height:20px;text-overflow:ellipsis;white-space:nowrap;}
.projectList .txt {overflow:hidden;margin-top:10px;font-size:14px;text-overflow:ellipsis;white-space:nowrap;}
.projectList .btnWrap {padding-top:15px;margin-top:15px;border-top:1px solid #aeb4bd;}
.projectList .btn {display:inline-block;height:28px;padding:0 5px;border:1px solid #ccc;border-radius:3px;font-size:12px;font-weight:bold;line-height:28px;}
</style>

