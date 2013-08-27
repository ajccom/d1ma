/**
*	create for onepage-mobile application
*	jian.chen
*	136157536@qq.com
*/
(function () {

	var D1ma = D1ma || {};

	D1ma.config = {
		pageWrapperId: 'page-wrapper',
		modelPath: 'models/',
		htmlPath: '',
		defaultHash: 'home'
	};
	
	var ua = navigator.userAgent,
		mobileCheck = false;
	if (ua.match(/Android/i) || ua.match(/webOS/i) || ua.match(/iPhone/i) || ua.match(/iPad/i) || ua.match(/iPod/i) || ua.match(/BlackBerry/i) || ua.match(/Windows Phone/i)) {
		mobileCheck = true;
	}

	D1ma.event = {
		touch: mobileCheck ? 'touchstart' : 'mousedown',
		move: mobileCheck ? 'touchmove' : 'mousemove',
		end: mobileCheck ? 'touchend' : 'mouseup'
	};
	
	/**
	*	get search array or search value
	*/
	D1ma.getQuery = function (param) {
		var search = location.hash.split('?')[1].replace(/&+$/, '').split('&'),
			temp = '',
			data = {};
		jQuery.each(search, function(i, n) {
			temp = n.split('=');
			if (temp[0]) {
				data[decodeURIComponent(temp[0]).toLowerCase()] = decodeURIComponent(temp[1]);
			}
		});
		return param ? data[param] : data;
	};
	
	/**
	*	route - use hash to get which html load
	*/
	D1ma.route = {
		routeObj: {},
		set: function (hash, route, callback) {
			this.routeObj[hash] = {
				route: route,
				callback: callback// will trigger before html append to main DOM tree. only once
			}
		},
		del: function (hash) {
			delete this.routeObj[hash];
		},
		get: function (hash) {
			hash = hash.split('?')[0];
			if (this.routeObj[hash]) {
				return this.routeObj[hash];
			} else {
				return {
					route: hash + '.html'
				}
			}
		}
	};

	/**
	*	javascript template engine
	*/
	D1ma.tmpl = (function(){
	  D1ma.replace = function tmpl(str, data){
	   // Figure out if we're getting a template, or if we need to
		// load the template - and be sure to cache the result.
		var fn = 
		  // Generate a reusable function that will serve as a template
		  // generator (and which will be cached).
		  new Function("obj",
			"var p=[],print=function(){p.push.apply(p,arguments);};" +
		   
			// Introduce the data as local variables using with(){}
			"with(obj){p.push('" +
		   
			// Convert the template into pure JavaScript
			str
			  .replace(/[\r\t\n]/g, " ")
			  .split("<%").join("\t")
			  .replace(/((^|%>)[^\t]*)'/g, "$1\r")
			  .replace(/\t=(.*?)%>/g, "',$1,'")
			  .split("\t").join("');")
			  .split("%>").join("p.push('")
			  .split("\r").join("\\'")
		  + "');}return p.join('');");
		  
		// Provide some basic currying to the user
		return data ? fn(data) : fn;
	  };
	}());

	/**
	*	include one template to current template, use it like '<div class="xx"><% D1ma.include("child-page") %></div>' in your html.
	*/
	D1ma.include = function (hash) {
		var html = '',
			d = {},
			routeObj = null;
		if (D1ma.templates[hash]) {
			html = D1ma.templates[hash];
			d = D1ma.model[hash] || {};
			D1ma.isInclude = false;
			return D1ma.replace(html, d.data || {});
		} else {
			routeObj = D1ma.route.get(hash);
			$.ajax({
				type: 'GET',
				dataType: 'html',
				url: D1ma.config.htmlPath + routeObj.route + '?v=' + +new Date(),
				success: function (html) {
					var d = null;
					D1ma.templates[hash] = html;
					if (routeObj.callback) {
						routeObj.callback(html);
					}
					$('body').append('<script src="' + D1ma.config.modelPath + hash + '.js?v=' + +new Date() + '"></script>');
					d = D1ma.model[hash] ? (D1ma.model[hash].data || {}) : {};
					
					if (d.beforeload) {
						d.beforeload();
					}
					D1ma.currentPage.find('.D1maInculdeWrapper-' + hash).replaceWith(D1ma.replace(html, d));
					if (d.load) {
						d.load();
					}
				},
				error: function () {
					$('.D1maInculdeWrapper-' + hash).remove();
					console.log('error: D1ma.include - ' + D1ma.config.htmlPath + routeObj.route + '.');
				}
			});
			return '<div class="D1maInculdeWrapper-' + hash + '" style="display: block">' + hash + '</div>';
		}
	};

	//save templates for pages
	D1ma.templates = {};

	/**
	*	get page with hash, return jQuery Object
	*/
	D1ma.getPage = function (hash) {
		return $('.D1maTempPage.sub-page-' + hash);
	};

	/**
	*	load template by hash
	*	if loaded, use loaded template
	*/
	D1ma.load = function (hash) {
	
		var routeObj = D1ma.route.get(hash);
		var obj = null;
		if (location.hash !== '#' + hash) {
			location.hash = '#' + hash;  //webview in phonegap, this will trigger hashChange
		}
		if (D1ma.currentPage) {
			D1ma.prevPage = D1ma.currentPage.removeClass('current').addClass('prev-page');
		}
		
		hash = hash.split('?')[0];
		D1ma.model[hash] = D1ma.model[hash] || {};
		
		if (!$('.D1maTempPage.sub-page-' + hash)[0]) {
			obj = $('<div class="D1maTempPage ' + D1ma.currentEffect + '"></div>');
			$.ajax({
				type: 'GET',
				dataType: 'html',
				url: D1ma.config.htmlPath + routeObj.route + '?v=' + +new Date(),
				success: function (html) {
					D1ma.templates[hash] = html;
					if (routeObj.callback) {
						routeObj.callback(html);
					}
					D1ma.currentPage = obj;
					obj.addClass('sub-page-' + hash);
					
					obj.html('<div class="D1maPageLoading">loading...</div>');
					
					//var n = +new Date();
					$('body').append('<script src="' + D1ma.config.modelPath + hash + '.js?v=' + +new Date() + '"></script>');
					//alert(+new Date() - n); //10-15ms :)
					D1ma.handlePageData(hash, html);
					
				},
				error: function () {
					console.log('error: D1ma.load - ' + D1ma.config.htmlPath + routeObj.route + '.');
				}
			});
		} else {
			var html = D1ma.templates[hash],
				d = D1ma.model[hash];
			D1ma.currentPage = obj = $('.D1maTempPage.sub-page-' + hash);
			
			if (routeObj.callback) {
				routeObj.callback(html);
			}
			
			obj.html('<div class="D1maPageLoading">loading...</div>');

			D1ma.handlePageData(hash, html);
		}
		D1ma.isBack = 0;
	};

	/**
	*	tranform template to html
	*/
	D1ma.handlePageData = function (hash, html, isNoEffect) {
		var d = D1ma.model[hash] ? (D1ma.model[hash] || {}) : {},
			obj = D1ma.currentPage;
		if (d.beforeload) {
			d.beforeload();
		}
		
		html = D1ma.replace(html, d.data || {});
		
		!isNoEffect && D1ma.effect.run();
		
		obj.html(html).addClass('current');
		
		if (!$('body').find('.D1maTempPage.sub-page-' + hash)[0]) {
			if (D1ma.config.pageWrapperId) {
				obj.appendTo('#' + D1ma.config.pageWrapperId).show();
			} else {
				obj.appendTo('body').show();
			}
		}
		
		if (d.load) {
			d.load();
		}
	};

	/**
	*	update current page with last model
	*/
	D1ma.updatePage = function () {
		var hash = location.hash.slice(1).split('?')[0],
			routeObj = D1ma.route.get(hash),
			html = D1ma.templates[hash],
			d = D1ma.model[hash] || {};
		
		if (routeObj.callback) {
			routeObj.callback(html);
		}
		
		D1ma.handlePageData(hash, html, 1);
	};

	/**
	* model object
	*/
	D1ma.model = {
		/*hash: {
			data: {username: 'Jian' ...},// replace <%=username %> to Jian
			beforeload: function () {},
			load: {}
		}*/
	};

	/**
	*	set hash change event
	*/
	D1ma.hashHandler = {
		bind: function () {
			window.onhashchange = function () {
				var str = location.hash.slice(1) || D1ma.config.defaultHash; //hash will always there ...
				D1ma.load(str);
			}
			
			$(document).on(D1ma.event.end, '.back', function () {
				D1ma.isBack = 1;
				history.go(-1);
			});
			
			$(document).on(D1ma.event.end, 'a', function () {
				var str = $(this).attr('href');
				if (str && str.indexOf('#') > -1) {
					str = str.split('#')[1];
					if (str !== location.hash) {
						location.hash = str;
					}
				}
				return false;
			});
		},
		_ini: function () {
			if (!location.hash) {
				location.hash = '#' + D1ma.config.defaultHash;
			} else {
				D1ma.load(location.hash.slice(1));
			}
		},
		ini: function () {
			this._ini();
			this.bind();	
		}
	};



	D1ma.currentPage = null; //jQuery Object, current show page

	D1ma.currentEffect = 'slidedown'; //you can exchange transition effect with D1ma.currentEffect

	/**
	*	page transition effect
	*	animate.css copy from jQuery Mobile Framework
	*/
	D1ma.effect = {
		run: function () {
			//handle trans effect
			var currentEffect = D1ma.effect[D1ma.currentEffect],
				currentPage = D1ma.currentPage,
				t = D1ma.currentEffect === 'normal' ? 0 : 400,
				effectStr = D1ma.currentEffect + ' ' + currentEffect.prev + ' ' + currentEffect.next;
			currentPage.removeClass(effectStr);
			if (D1ma.isBack) {//when go back
				currentPage.addClass(D1ma.currentEffect + ' ' + currentEffect.prev);
				setTimeout(function () {
					currentPage.removeClass(currentEffect.prev + ' prev-page');
					D1ma.prevPage.removeClass(effectStr + ' prev-page');
				}, t);
			} else {
				currentPage.addClass(D1ma.currentEffect + ' ' + currentEffect.next);
				if (D1ma.prevPage) {
					setTimeout(function () {
						D1ma.prevPage.removeClass(effectStr + ' prev-page');
					}, t);
				}
			}
		},
		normal: {
			prev: '',
			next: ''
		},
		slide: {
			prev: 'in reverse',
			next: 'in'
		},
		fade: {
			prev: 'out',
			next: 'in'
		},
		pop: {
			prev: 'in reverse',
			next: 'in'
		},
		slidefade: {
			prev: 'in reverse',
			next: 'in'
		},
		slidedown: {
			prev: 'in reverse',
			next: 'in'
		}
	};

	D1ma.hashHandler.ini();

	window.D1ma = D1ma;
})();
