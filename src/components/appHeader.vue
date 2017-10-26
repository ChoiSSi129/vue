<template>
	<header id="header">
		<div class="inner">
			<h1 class="logo"><router-link to="/">Logo</router-link></h1>
			<div class="gnb">
				<ul>
					<router-link tag="li" to="/" exact><a>Index</a></router-link>
					<router-link tag="li" to="/sub"><a>Sub</a></router-link>
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
