new D1ma.ViewModel('product', {
	data: {
		header: 'PRODUCT',
		pro: [{id: '001', name: 'product-001'},{id: '002', name: 'product-002'},{id: '003', name: 'product-003'}]
	},
	beforeload: function () {
		//alert('product beforeload');
		D1ma.updateIncludePage('header', {header: 'Product'});
	},
	load: function () {
		//alert('product load');
	}
});