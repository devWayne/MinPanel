var ELEMENTS = {
	MP_ATTRIBUTE :{
            tag: 'div',
            style: {
                "border-radius": "5px",
                "padding": "5px",
                "background-color": "rgba(0, 0, 0, 0.2)",
                "right": "5%",
                "width": "25px",
		"top": "5%",
                "color": "#fff"
            },
	    text:'MP'
        },
	PANNEL_ATTRIBUTE :{
            tag: 'div',
            style: {
                "border-radius": "5px",
                "padding": "5px",
                "background-color": "rgba(0, 0, 0, 0.2)",
                "width": "80%",
                "height": "80%",
                "position": "fixed",
                "top": "5%",
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
		"font-size": "1em",
		"color": "#fff",
  		"background-color": "rgba(0, 0, 0, 0.8)"
	   }
	},
	PANNEL_BUTTONSDIV_ATTRIBUTE:{
	   tag:'div',
	   style:{
	   	"display":"-webkit-box",
		"height":"5%"
	   }
	},
	PANNEL_BUTTON_ATTRIBUTE:{
	   tag:'button',
	   style:{
	   	"display": "block",
		"-webkit-box-flex": "1",
		"height": "100%"
	   }
	}
}

module.exports=ELEMENTS;
