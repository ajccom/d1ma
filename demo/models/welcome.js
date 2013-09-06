new D1ma.ViewModel('welcome', {
	data: {
		welcome: 'included html: welcome'
	},
	beforeload: function () {
		//alert('more beforeload');
	},
	load: function () {
		//alert('more load');
	}
});