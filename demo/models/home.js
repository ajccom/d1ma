new D1ma.ViewModel('home', {
	data: {
		section: 'Section Text',
		header: 'HOME'
	},
	beforeload: function () {
		//alert('home beforeload');
		D1ma.updateIncludePage('header', {header: 'Home'});
	},
	load: function () {
		//alert('home load');
	}
});