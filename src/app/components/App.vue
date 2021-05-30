<template>
		<div>
			<nav class="navbar navbar-expand-lg navbar-dark">
				<a href="/" class="navbar-brand"><img src="https://i.pinimg.com/originals/af/db/cd/afdbcdff9e996e5c0a7d624d60fe24b2.png">Doxclub</a>
				<div class="collapse navbar-collapse">
					<ul class="nav navbar-nav navbar-center">
						<li class="nav-item active">
							<a href="#" class="nav-link">Inicio</a>
						</li>
						<li class="nav-item active">
							<a href="#" class="nav-link">Media</a>
						</li>
						<li class="nav-item active">
							<a href="#" class="nav-link">Doxes</a>
						</li>
						<li class="nav-item active">
							<a href="#" class="nav-link">Salón de la fama</a>
						</li>
					</ul>
				</div>
			</nav>

			<div class="container-lg">
				<center>
				<div class="row">
						<div class="container-sm">
							<h1>{{dox.name}}</h1>
							<h5>By: {{dox.author}}</h5>
						</div>
					</div>
					<button class="btn btn-primary">Traer doxes</button>
				</center>
			</div>
		</div>
</template>

<script>
	const axios = require('axios');
	const config = require('../../config.json');

	export default {
		data() {
			return {
				dox: {
					name: '',
					author: '',
					img: ''
				},
				hostName: ''
			}
		},
		metaInfo() {
			const dox = this.dox;
			return {
			   	title: dox.name + " | Doxclub",
			   	meta: [{
			   		property: 'og:title',
        			content: "Ver el dox de " + dox.name + " hecho por " + dox.author
			   	}, {
			   		property: 'og:image',
			   		content: this.img
			   	}],
			    image: dox.img
			}
		},
		async mounted() {
			await axios.get('https://api.ipify.org?format=json')
				.then(data => {
					this.hostName = data.data.ip
				})
				.catch(e => console.log(e));

			axios.get(config.proxy + '/api/routes' + this.$router.currentRoute.path, {
				headers: {
					'x-forwarded-for': this.hostName
				}
			})
				.then(data => {
					data = data.data;
					this.dox.name = data.routeName;													
					this.dox.author = data.author;
					this.dox.img = data.image;
				})
				.catch(err => {
					console.log(err);
					this.dox.name = "oxi";
					this.dox.author = "O$int";
					this.dox.img = "https://ichef.bbci.co.uk/news/640/cpsprodpb/5BCC/production/_117900532_p03t4b52.jpg";
				});
		}
	}
</script>

