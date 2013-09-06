D1ma.model['product-detail'] = {
	beforeload: function () {
		var products = D1ma.model['product'] ? (D1ma.model['product'].data.pro || []) : [],
			i = 0,
			l = products.length,
			temp = [];
		
		if (l > 0) {
			for (i; i < l; i++) {
				if (products[i].id === D1ma.getQuery('id')) {
					this.data = {name: products[i].name}
					break;
				}
			}
		} else {
			this.data = {name: 'not find'}
		}
		
		D1ma.updateIncludePage('header', {header: this.data.name});
	},
	load: function () {
		//alert('product load');
	}
};