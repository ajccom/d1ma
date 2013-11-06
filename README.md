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
refresh current page with latest model.

##D1ma.updateIncludePage

```
	D1ma.updateIncludePage('hash', {text: 'included block update'});
```
refresh block included in current page.
*when use updateIncludePage, there will be triggered included page's beforeload\load event defaulted in module and not only change HTML.*


##ViewModel

Every pages' data and events will be defined in its model. 

You could `new` a ViewModel in your sub pages' model files.

For example, in your model `home.js` , it will look like:

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

If you don't want to use model, just do nothing.

*You shouldn't use a global variable to named your model, every page's model will be visited in D1ma.model['hash']*

###Model Object

####getHash

`modelObject.getHash();`

return model's hash, sometime it looks like model's name.

####getModel

`modelObject.getModel();`

`modelObject.getModel('load');`

Return model or one model's property. 

####setModel

`modelObject.setModel({data: {...}, load: function () {}, ...);`

Set model's data & events;

*this function will update HTML immediately*

####setData

`modelObject.setModel({...});`

Set model's data;

*this function will update HTML immediately*

####getData

`modelObject.getData();`

`modelObject.getData('text');`

Return model's data or one data's property. 

####getTemplate

`modelObject.getTemplate();`

Return model's HTML Template.

####setTemplate

`modelObject.getTemplate('str str str...');`

Set model's new HTML Template.

####getHtml

`modelObject.getHtml();`

Return HTML String form explained template.

####getBlock

`modelObject.getBlock();`

Return DOM Element in Main DOM Tree.

####updatePage

`modelObject.updatePage();`

Refresh model's template in page.

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
The MIT License (MIT)

Copyright (c) 2013 ajccom

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


## ����
���������������а�������ӭ��ajccom��һ������

[![����](https://img.alipay.com/sys/personalprod/style/mc/btn-index.png)](https://me.alipay.com/ajccom)