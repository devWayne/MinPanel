MinPanel
============
> Mini Debug Panel to make  mobile webview debuging esaier

# Import

When MinPanel is imported ,the min panel will automatic appear

1. use in gobal   

```html
	<script src="dist/mp.js"></script>
	<script>
		var _mp = new mp();
	</script>
```   

2. use as CommonJS module

```javascript
	var mp=require('MinPanel');
	var _mp = new mp();
```


# API

## _mp.log(text)

A simple way to log info.

## _mp.value(key, value)

A upgrade version of `_mp.log` when log an Object 

## _mp.on(type,fn)

There are six custom buttons on the pannel corresponding to six custom event('btn1','btn2','btn3'...)

example:   

```javascript
	_mp.on('btn',function(){
		//when the btn is clicked
		//something happens
	})
```

the button is disable in default.when the corresponding event is binded ,it hover.
