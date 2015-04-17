var ELEMENTS = {
	MP_ATTRIBUTE :{
            tag: 'div',
            style: {
                "border-radius": "5px",
                "padding": "5px",
                "background-color": "#000",
                "right": "5%",
                "position": "fixed",
                "top": "5%",
                "opacity": "0.2",
                "color": "#fff"
            },
	    text:'MP'
        },
	PANNEL_ATTRIBUTE :{
            tag: 'div',
            style: {
                "border-radius": "5px",
                "padding": "5px",
                "background-color": "#000",
                "width": "80%",
                "height": "80%",
                "position": "fixed",
                "top": "5%",
                "opacity": "0.2",
                "color": "#fff"
            }
	},
	PANNEL_TEXTAREA_ATTRIBUTE:{
	   tag: 'textarea',
	   style:{
	   	"width": "100%",
  		"box-sizing": "border-box",
		"height": "80%",
		"resize": "none",
		"font-size": "1em"
	   }
	},
	PANNEL_BUTTONSDIV_ATTRIBUTE:{
	   tag:'div',
	   style:{
	   	"display":"-webkit-box"
	   }
	},
	PANNEL_BUTTON_ATTRIBUTE:{
	   tag:'button',
	   style:{
	   	"display": "block",
		"-webkit-box-flex": "1"
	   }
	}
}

module.exports=ELEMENTS;
