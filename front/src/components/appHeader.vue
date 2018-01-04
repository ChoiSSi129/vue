<template>
	<header id="header">
		<div class="inner">
			<h1 class="logo"><router-link to="/">어드민</router-link></h1>
			<div class="gnb">
				<ul>
					<router-link tag="li" to="/" exact><a>Gallery</a></router-link>
					<router-link tag="li" to="/location"><a>시공점</a></router-link>
				</ul>
			</div>
		</div>
	</header>
</template>

<script>
export default {
  name: 'appheader'
}
</script>
