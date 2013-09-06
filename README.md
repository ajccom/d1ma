#D1ma - build one-page site so easy

This is a tool be used to build one-page site. It works for mobile website and hybird mobile application.

##Install

D1ma is a framework based on `jQuery`. So you should include `D1ma.js` after the jQuery file.

##Config

```
	pageWrapperId: 'page-wrapper',
	// one element's id, D1ma will push all sub pages into this element. if not defined, D1ma will push all sub pages to body element.
	modelPath: 'models/',//sub pages model path
	htmlPath: '',//sub pages path
	defaultHash: 'home'//your application's first page
```

##D1ma.route

	controls hash to load which one of sub pages. If not defined, D1ma will load [hash + `.html`].

###set

```
	D1ma.route.set('index', 'home.html', function () {/*some code*/});
```
set hash & route, and there is a callback you can set to trigger before model's event.
	
###del

```
	D1ma.route.del('index');
```
del rule of hash & route.

###get

```
	D1ma.route.get('index');
```
return an object with route & callback.

##Template Rule
	
###output model data

```
	<p><%=obj.name%></p> //model = {name: 'Jone'} and then will output HTML <p>Jone</p>
```

###use if-else

```
	<% var i = 0;
		if (i === 0) { 
	%>
	<p>I will always shown.</p>
	<%
		}
	%>
```
also `for`, `switch`, `with` you can use


###use function

```
	<p><%=Math.random()%></p>
```

###include

do you want to include one sub page to another one? Yes, you can.

```
	<div><%=D1ma.include('HashName')%></div>//will include which 'HashName' defined in D1ma.route or 'HashName.html'.
```
	
In your sub page, you should use `template rule` to fill your data with model.
	
##D1ma.getPage
	
```
	var jIndexObj = D1ma.getPage('index');
```
return a jQuery Object of sub page's wrapper.
	
##D1ma.load
	
handel load sub pages.

if you want to load one sub page, you can

```
	D1ma.load('hash');
```

##D1ma.updatePage

```
	D1ma.updatePage();
```
refresh current page with last model.

##D1ma.updateIncludePage

```
	D1ma.updateIncludePage('hash', {text: 'included block update'});
```
refresh block included in current page.

##Model

model will be loaded when sub page's HTML be load.

you should new a model in your sub pages' model files defined in D1ma.config.

for example, in your model `home.js` , it will look like:

```
	new D1ma.ViewModel('home', {
		data: {
			section: 'Section Text'
		},
		beforeload: function () {
			//alert('home beforeload');
			D1ma.updateIncludePage('header', {header: 'Home'});
		},
		load: function () {
			//alert('home load');
		}
	});
```
If you don't want to model, just do nothing.

##D1ma.effect

When sub page exchange to another one, some effects will appear.

###effect name

####normal

####slide

####fade

####pop

####slidefade

####slidedown

###currentEffect

```
	D1ma.currentEffect = 'slidedown';
```

D1ma just defined one effect to all sub pages. 
So if you want exchange effect, you should set `D1ma.currentEffect` to which one you wanted.

## License

@ @

## ¾èÔù
Èç¹ûÄú¾õµÃÕâ¶ÔÄúÓÐ°ïÖú£¬»¶Ó­ÇëajccomºÈÒ»±­¿§·È

[![¾èÔù](https://img.alipay.com/sys/personalprod/style/mc/btn-index.png)](https://me.alipay.com/ajccom)