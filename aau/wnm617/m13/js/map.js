// Maps Functions

const showMap = (animalLocations,target,markerLambda) => {
	const tm = $(target);
	const sf = {lat:37.786210, lng:-122.399344};


	// const setMapBounds = (map,locations) => {
 //    if(locations.length==1) map.setCenter(locations[0]);
 //    else if(locations.length==0) {
 //        if(window.location.protocol!='https:') return;
 //        else {
 //            navigator.geolocation.getCurrentPosition((position)=>{
 //                let pos = {
 //                    lat:position.coords.latitude,
 //                    lng:position.coords.longitude
 //                }
 //                map.setCenter(pos);
 //            },(...args)=>{
 //                console.log("error?",args)
 //            })
 //        }
 //    }
 //    else {
 //        let bounds = new google.maps.LatLngBounds(null);
 //        locations.forEach(o=>bounds.extend(o));
 //        setTimeout(()=>map.fitBounds(bounds),300);
 //    }


	if(!tm.data("map")) {
		tm.data(
			"map",
			new google.maps.Map(tm[0], {
				center: sf,
				zoom: 14,
				styles: [
				    {
				        "featureType": "all",
				        "elementType": "all",
				        "stylers": [
				            {
				                "visibility": "on"
				            }
				        ]
				    },
				    {
				        "featureType": "all",
				        "elementType": "labels",
				        "stylers": [
				            {
				                "visibility": "off"
				            },
				            {
				                "saturation": "-100"
				            }
				        ]
				    },
				    {
				        "featureType": "all",
				        "elementType": "labels.text.fill",
				        "stylers": [
				            {
				                "saturation": 36
				            },
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 40
				            },
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "all",
				        "elementType": "labels.text.stroke",
				        "stylers": [
				            {
				                "visibility": "off"
				            },
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 16
				            }
				        ]
				    },
				    {
				        "featureType": "all",
				        "elementType": "labels.icon",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 20
				            }
				        ]
				    },
				    {
				        "featureType": "administrative",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 17
				            },
				            {
				                "weight": 1.2
				            }
				        ]
				    },
				    {
				        "featureType": "landscape",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 20
				            }
				        ]
				    },
				    {
				        "featureType": "landscape",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#4d6059"
				            }
				        ]
				    },
				    {
				        "featureType": "landscape",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "color": "#4d6059"
				            }
				        ]
				    },
				    {
				        "featureType": "landscape.natural",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#4d6059"
				            }
				        ]
				    },
				    {
				        "featureType": "poi",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "lightness": 21
				            }
				        ]
				    },
				    {
				        "featureType": "poi",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#4d6059"
				            }
				        ]
				    },
				    {
				        "featureType": "poi",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "color": "#4d6059"
				            }
				        ]
				    },
				    {
				        "featureType": "road",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "visibility": "on"
				            },
				            {
				                "color": "#7f8d89"
				            }
				        ]
				    },
				    {
				        "featureType": "road",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#7f8d89"
				            }
				        ]
				    },
				    {
				        "featureType": "road.highway",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#7f8d89"
				            },
				            {
				                "lightness": 17
				            }
				        ]
				    },
				    {
				        "featureType": "road.highway",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "color": "#7f8d89"
				            },
				            {
				                "lightness": 29
				            },
				            {
				                "weight": 0.2
				            }
				        ]
				    },
				    {
				        "featureType": "road.arterial",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 18
				            }
				        ]
				    },
				    {
				        "featureType": "road.arterial",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#7f8d89"
				            }
				        ]
				    },
				    {
				        "featureType": "road.arterial",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "color": "#7f8d89"
				            }
				        ]
				    },
				    {
				        "featureType": "road.local",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 16
				            }
				        ]
				    },
				    {
				        "featureType": "road.local",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#7f8d89"
				            }
				        ]
				    },
				    {
				        "featureType": "road.local",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "color": "#7f8d89"
				            }
				        ]
				    },
				    {
				        "featureType": "transit",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#000000"
				            },
				            {
				                "lightness": 19
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "elementType": "all",
				        "stylers": [
				            {
				                "color": "#2b3638"
				            },
				            {
				                "visibility": "on"
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#2b3638"
				            },
				            {
				                "lightness": 17
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#24282b"
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "color": "#24282b"
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "elementType": "labels",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "elementType": "labels.text",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "elementType": "labels.text.fill",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "elementType": "labels.text.stroke",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "elementType": "labels.icon",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    }
				],
		        disableDefaultUI: true

			})
		)
		.data(
	    	"infoWindow",
	    	new google.maps.InfoWindow({
	    		content:''
		    })
	    );
	}



	if(tm.data("markers")) {
		tm.data("markers").forEach(o=>o.setMap(null));
	}

	tm.data("markers",[]);

	animalLocations.forEach(o=>{
		let marker = new google.maps.Marker({
			position: o,
			map: tm.data("map"),
			icon: {
				url:o.icon,
				scaledSize:{
					height:30,
					width:30
				}
			}
		});
		tm.data("markers").push(marker);
	})

	if (markerLambda) {
		markerLambda(target);	
	}
}




