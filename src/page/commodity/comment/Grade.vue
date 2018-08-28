<template>
	<div class="grade_page">
		<div v-title>{{ title }}</div>
		<x-header :left-options="{backText: ''}" :title="title" class="page-head">
			<a slot="right" @click="done">完成</a>
		</x-header>
		<section class="grade-content">
			<div class="grade-content-head">
				<img src="../../../assets/vux_logo.png" alt="">
				<span>描述相符</span>
				<rater :max="max" v-model="value" active-color="#ffdd99"></rater>
				<span class="rater-text">{{value | rater}}</span>
			</div>
		</section>
		<group class="grade-content-img">
			<x-textarea :placeholder="textAreaTitle" v-model="textAreaVal" :rows="rows"></x-textarea>
			<ul class="grade-content-img-list">
				<li v-for="(item,index) in list" :key="index" @click="del(index,item.id)" :class="item.attachmentUrl?'grade-content-img-active':''"><img :src="item.attachmentUrl" alt=""></li>
				<li><img src="../../../assets/carme.png" alt=""><input type="file" accept="image/*" id="file" @change="flie(this)" :disabled="isdisabled"></li>
			</ul>
		</group>
		<section class="grade-content">
			<p class="title"><span class="iconfont icon-dianpu"></span><span>店铺评分</span></p>
			<div class="grade-content-head">
				<span class="text-color">物流服务</span>
				<rater :max="max" v-model="logistics" active-color="#ffdd99"></rater>
				<span class="rater-text">{{logistics | rater}}</span>
			</div>
			<div class="grade-content-head">
				<span class="text-color">服务态度</span>
				<rater :max="max" v-model="service" active-color="#ffdd99"></rater>
				<span class="rater-text">{{service | rater(2)}}</span>
			</div>
			<div class="grade-content-head">
				<span class="text-color">满意评分</span>
				<rater :max="max" v-model="faction" active-color="#ffdd99"></rater>
				<span class="rater-text">{{faction | rater(2)}}</span>
			</div>
		</section>
		<confirm v-model="show" title="温馨提示" @on-confirm="onConfirm">
			<p style="text-align:center;">您确定删除吗？</p>
		</confirm>
	</div>
</template>

<script>
	import { XHeader, Rater, Group, XTextarea, base64, Confirm } from 'vux'
	import { getStore, setStore } from '../../../config/mUtils'
	import { doEvaluate, delImg } from '../../../service/getData'
	export default {
		data() {
			return {
				title: '发表评论',
				max: 5,
				show: false,
				isdisabled: false,
				index: 0,
				id: 0,
				raterText: '非常好',
				textAreaTitle: '对我们的产品还满意吗？说说您的使用心得。',
				list: [],
				rows: 5,
				value: 5,
				textAreaVal: '',
				service: 5,
				logistics: 5,
				faction: 5
			}
		},
		components: {
			XHeader,
			Rater,
			Group,
			XTextarea,
			base64,
			Confirm
		},
		methods: {
			del(index, id) {
				this.show = true
				this.index = index
				this.id = id
			},
			onConfirm() {
				delImg(this.id).then(resolved => {
					if(resolved.msgCode == '0000') {
						this.list.splice(this.index, 1)
					} else {
						this.$nextTick(() => {
							this.$vux.toast.show({
								text: resolved.msg
							})
						})
					}
				})
			},
			done() {
				doEvaluate(getStore('userId'), getStore('nickname'), getStore('headPic'), this.$route.query.id, this.textAreaVal, this.value, this.service, this.logistics, this.faction).then(resolved => {
					if(resolved.msgCode == '0000') {
						this.$vux.toast.show({
							text: '提交成功'
						})
						setTimeout(() => {
							this.$router.back()
						}, 1001)
					} else {
						this.$vux.toast.show({
							text: resolved.msg
						})
					}
				})
			},
			flie(val) {
				this.$vux.loading.show({
					text: '上传中...'
				})
				this.isdisabled = true
				let files = document.getElementById('file').files
				if(files && files.length) {
					let param = new FormData(); //创建form对象
					param.append('attachmentId', this.$route.query.id);
					param.append('userId', getStore('userId'));
					param.append('attachmentType', 3);
					param.append('file', files[0]);
					let config = {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}; //添加请求头
					this.$ajax.post('http://test.celelink.com/one_mall/backend/base/saveImg', param, config).then(response => {
						let data = JSON.parse(base64.decode(response.data))
						if(data.msgCode === '0000') {
							this.list.push(data.data)
							this.$nextTick(() => {
								this.$vux.loading.hide()
								this.$vux.toast.show({
									text: data.msg
								})
							})
						} else {
							this.$vux.loading.hide()
						}
						this.isdisabled = false
					}).catch((err) => {
						this.isdisabled = false
						console.log(err)
					})
				}
			}
		},
		filters: {
			rater(val) {
				if(val === 1) {
					return '非常差'
				} else if(val === 2) {
					return '差'
				} else if(val === 3) {
					return '一般'
				} else if(val === 4) {
					return '好'
				} else if(val === 5) {
					return '非常好'
				}
			}
		}
	}

	function getImgURL(node) {
		var imgURL = "";
		try {
			var file = null;
			if(node.files && node.files[0]) {
				file = node.files[0];
			} else if(node.files && node.files.item(0)) {
				file = node.files.item(0);
			}
			//Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径  
			try {
				//Firefox7.0   
				imgURL = file.getAsDataURL();
				//alert("//Firefox7.0"+imgRUL);                           
			} catch(e) {
				//Firefox8.0以上                                
				imgRUL = window.URL.createObjectURL(file);
				//alert("//Firefox8.0以上"+imgRUL);  
			}
		} catch(e) { //这里不知道怎么处理了，如果是遨游的话会报这个异常                   
			//支持html5的浏览器,比如高版本的firefox、chrome、ie10  
			if(node.files && node.files[0]) {
				var reader = new FileReader();
				reader.onload = function(e) {
					imgURL = e.target.result;
				};
				reader.readAsDataURL(node.files[0]);
			}
		}
		console.log(imgURL)
		return imgURL;
	}
</script>

<style lang="less" scoped>
	@import '~vux/src/styles/1px.less';
	@white: #ffffff;
	.grade_page {
		.grade-content {
			padding: 4px 10px;
			background-color: @white;
			margin-top: 4px;
			.grade-content-head {
				display: flex;
				align-items: center;
				margin-bottom: 4px;
				img {
					width: 1.06666rem;
					height: 1.0666rem;
				}
				.rater-text {
					text-align: right;
					flex-grow: 1;
					color: #888888
				}
				.text-color {
					color: #888888;
				}
			}
			.title {
				padding: 0.37333rem 0;
			}
			.weui-cell {
				padding: 0;
			}
		}
		.grade-content-img {
			margin-top: 4px;
			background-color: @white;
			.grade-content-img-list {
				padding: 0 15px;
				display: flex;
				flex-wrap: wrap;
				padding-bottom: 0.34666rem;
				#file {
					opacity: 0;
					position: absolute;
					display: inline-block;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
				}
				li {
					position: relative;
					overflow: hidden;
					width: 1.78666rem;
					height: 1.78666rem;
					border: 1px dotted #ccc;
					border-radius: 10px;
					box-sizing: border-box;
					padding: 5px;
					text-align: center;
					margin-left: 1px;
					margin-bottom: 1px;
					&:nth-child(5n+1) {
						margin-left: 0;
					}
					img {
						width: 100%;
						height: 100%
					}
				}
				.grade-content-img-active {
					border: none;
					padding: 0
				}
			}
		}
	}
</style>