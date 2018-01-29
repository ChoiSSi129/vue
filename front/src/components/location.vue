<template>
	<div class="ui container">
		<vuetable ref="vuetable"
			api-url="/api/locationData"
			:fields="fields"
			:per-page = "perPage"
			pagination-path=""
			@vuetable:pagination-data="onPaginationData"
		>
			<template slot="actions" slot-scope="props">
				<div class="custom-actions">
					<button class="ui basic button"
					@click="handlePostData('delete', props.rowData)">
					<i class="delete icon"></i>
					</button>
				</div>
			</template>
		</vuetable>
		<vuetable-pagination ref="pagination"
			@vuetable-pagination:change-page="onChangePage"
		></vuetable-pagination>

		<button type="button" :class="{avtive: isActive}" @click="handleOpenAddClick()">추가</button>

		<div class="addWrap" v-if="isActive">
			<h1>데이터 추가</h1>
			<table class="vuetable ui blue table">
				<colgroup>
					<col style="width:30%;">
					<col style="width:70%;">
				</colgroup>
				<tbody>
					<tr>
						<th scope="col">가맹점</th>
						<td><input type="text" v-model="addData.가맹점"></td>
					</tr>
					<tr>
						<th scope="col">주소</th>
						<td><input type="text" v-model="addData.주소"></td>
					</tr>
					<tr>
						<th scope="col">대표자</th>
						<td><input type="text" v-model="addData.대표자"></td>
					</tr>
					<tr>
						<th scope="col">Tel</th>
						<td><input type="tel" v-model="addData.tel"></td>
					</tr>
					<tr>
						<th scope="col">타입</th>
						<td><input type="text" v-model="addData.타입"></td>
					</tr>
					<tr>
						<th scope="col">Lat</th>
						<td><input type="text" v-model="addData.lat" @keyup="handleLocationCheck()"></td>
					</tr>
					<tr>
						<th scope="col">Lng</th>
						<td><input type="text" v-model="addData.lng" @keyup="handleLocationCheck()"></td>
					</tr>
					<tr>
						<th scope="col">이메일</th>
						<td><input type="text" v-model="addData.이메일"></td>
					</tr>
				</tbody>
			</table>

			<button type="submit" @click="handlePostData('add', addData)">전송</button>
			<button type="button" @click="handleOpenAddClick()">닫기</button>
		</div>
		<div class="dim" v-if="isActive"></div>
    </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'

export default {
	components: {
		Vuetable,
		VuetablePagination
	},

	data(){
		return{
			fields: [
				'가맹점', '주소', '대표자', 'tel', '타입', 'lat', 'lng', '이메일',
				{
					name: '__slot:actions',
					title: 'Actions',
					titleClass: 'center aligned',
					dataClass: 'center aligned'
				}
			], 
			perPage: 10,
			addData: {
				가맹점: "",
				주소: "",
				대표자: "",
				tel: "",
				타입: "",
				lat: "",
				lng: "",
				이메일: ""
			},
			isActive: false
		}
	},
	
	methods: {
		onPaginationData (paginationData) {
			this.$refs.pagination.setPaginationData(paginationData)
		},
		onChangePage (page) {
			this.$refs.vuetable.changePage(page)
		},
		handlePostData(type, data){
			var obj = {type: type, data: data};
			this.$http.post("/api/locationData", obj).then((res) => {
				console.log("post")
				if(type === "add"){
					for(var key in data){
						data[key] = "";
					}
					this.isActive = !this.isActive;
				}
				this.$refs.vuetable.refresh();
			});
		},
		handleOpenAddClick(){
			this.isActive = !this.isActive;
		},

		handlePhoneNumCheck(){
			var check = /^\d{2,3}-\d{3,4}-\d{4}$/;
			console.log(check.test(this.addData.tel));
		},

		handleMailCheck(){
			var check = /^[a-z][a-z0-9_-]{3,11}@([a-z\d\.-]+)\.([a-z\.]{2,6})$/
			console.log(check.test(this.addData.이메일));
		},

		handleLocationCheck(){
			var check = /^[0-9.]$/g
			console.log(check.test(this.addData.lat));
		}
	}
}
</script>

<style>
table {table-layout:fixed}
input {width:100%;}
.addWrap {position:fixed;top:100px;left:50%;z-index:10;width:700px;padding:30px;box-sizing:border-box;background:#fff;transform:translateX(-50%);}
.dim {position:fixed;top:0;left:0;width:100%;height:100%;background:#000;opacity:.5;}
</style>
