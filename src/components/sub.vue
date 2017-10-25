<template>
	<div class="contents">
		<Tab></Tab>
	</div>
</template>

<script>
import Tab from '@/components/tab'
export default {
	name: 'Sub',
	components: {
		Tab
	},
	computed: {
		// 계산된 속성중 일부가 변경된 경우에만 다시 실행
	},
	methods: {
		// 재 렌더링 할 때마다 실행
	},
	watch: {
		// 비동기식 또는 시간이 많이 소요되는 조작을 수행하려는 경우에 가장 유용
	}
}
</script>
