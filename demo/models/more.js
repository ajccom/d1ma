new D1ma.ViewModel('more', {
	data: {
		header: 'MORE'
	},
	beforeload: function () {
		//alert('more beforeload');
		D1ma.updateIncludePage('header', {header: 'More'});
	},
	load: function () {
		//alert('more load');
	}
});