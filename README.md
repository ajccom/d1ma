#D1ma - build one-page site so easy

This is a framework used to build one-page application. It works for mobile website and hybird mobile application.

##Install

Just include `D1ma.js` after your jQuery file.

##Config

```
	pageWrapperId: 'page-wrapper',
	modelPath: 'models/',
	htmlPath: '',
	defaultHash: 'home'
```

`pageWrapperId` tell D1ma which DOM Element that pages appended to.

`modelPath` tell D1ma models' local path

`htmlPath` tell D1ma views' local path

`defaultHash` tell D1ma which page is default page

##D1ma.route

Define a hash binding to a page in views. If not defined, D1ma will load file in `D1ma.config.htmlPath + [hash + '.html']`.

###set

```
	D1ma.route.set('index', 'home.html', function () {/*some code*/});
```
Set hash & route, and there is a callback function that will be exec before model's `beforeload` event.
	
###del

```
	D1ma.route.del('index');
```
Delete relation of hash & route.

###get

```
	D1ma.route.get('index');
```
Return an object with route & callback.

##Template
	
###output rule

```
	<p><%=obj.name%></p>
```

Write your script in `<%` and `%>` tag.

And if `modelObject.data = {name: 'Jone'}` then D1ma will output HTML `<p>Jone</p>`.

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
Also `for`, `switch`, `with` ... , you can use.


###use function

```
	<p><%=Math.random()%></p>
```

D1ma use whole logic template engine, so you can use all javascript API in template.

###include sub page

Do you want to include a sub page?

```
	<div><%=D1ma.include('HashName')%></div>
```
D1ma will include the template which 'HashName' defined in D1ma.route or just use html path + 'HashName.html'.
	
##D1ma.getPage
	
```
	var jIndexObj = D1ma.getPage('index');
```
Return a jQuery Object of sub page's wrapper.

##D1ma.load

Handle load pages to application or just show current page.

If you want to load one page, you can

```
	D1ma.load('hash');
```

##D1ma.updatePage

```
	D1ma.updatePage();
```

Refresh current page with latest model.

##D1ma.updateIncludePage

```
	D1ma.updateIncludePage('hash', {text: 'included page update'});
```

Refresh included page in current page.

*If use updateIncludePage, there will be triggered included page's beforeload\load event defined in model and not just change HTML.*

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

Return model's hash, sometime it looks like model's name.

####getModel

`modelObject.getModel();`

`modelObject.getModel('load');`

Return model or one model's property. 

####setModel

`modelObject.setModel({data: {...}, load: function () {}, ...);`

Set model's data & events;

*This function will update HTML immediately*

####setData

`modelObject.setModel({...});`

Set model's data;

*This function will update HTML immediately*

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

`normal | slide | fade | pop | slidefade | slidedown`

###currentEffect

```
	D1ma.currentEffect = 'pop';
```

D1ma just defined one effect to all sub pages. 

If you want exchange effect, you should set `D1ma.currentEffect` when you wanted to change.

##Thanks

Thanks everyone in [Sumai](http://www.sumai100.com) project.

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