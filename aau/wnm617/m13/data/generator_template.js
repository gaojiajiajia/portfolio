[
  '{{repeat(5)}}',
  {
    id:'{{index()}}',
    name:'{{firstName()}} {{surname()}}',
    username:function(){
      return 'user'+this.id;
    },
    email:function(){
      return this.username+'@gmail.com';
    },
    password:'pass',
    img:'img/me.png',
    animals:[
      '{{repeat(3, 10)}}',
      {
        id:'{{index()}}',
        name:'{{company()}}',
        // 1111111111
        size: '{{random("dog", "cat", "rabbit")}}',
        gender: '{{gender("boy","girl")}}',
        breed: function() {
          var breeds = [
            "Russian Blue",
            "Persian Cat",
            "Ragdoll",
            "French Bull Dog",
            "Pugdog",
            "Chihuahua",
            "Alaskan",
            "Angora",
            "Chinchilla",
            "Cinnamon",
            // "Alano Espanol",
            // "Pug"
          ];
          
          var randomBreedIndex = Math.floor(Math.random() * breeds.length);
          return breeds[randomBreedIndex];
        },
        img: function(){
          return {
            "Golden Retriever": "img/dog_icon/golden.png",
            "Brittany": "img/dog_icon/brittany.png",
            "Pharaoh Hound": "img/dog_icon/pharaoh.png",
            "Australian Cattle": "img/dog_icon/Australian.png",
            "Coton De Tulear": "img/dog_icon/Coton De Tulear.png",
            "Dalmatian": "img/dog_icon/dalmatian.png",
            "Miniature Schnauzer": "img/dog_icon/miniature.png",
            "German Shorthaired Pointer": "img/dog_icon/German.png",
            "Basenji": "img/dog_icon/Basenji.png",
            "Bull Terrier": "img/dog_icon/Bull Terrier.png",
            "Alano Espanol": "img/dog_icon/Alano Espanol.png",
            "Pug": "img/dog_icon/pug.png"
          }[this.breed];
        },
        locations: [
          '{{repeat(1, 7)}}',
          {
              id:'{{index()}}',
              lat:'{{floating(37.798186, 37.700505)}}',
              lng:'{{floating(-122.504680, -122.384096)}}',
              description:'{{lorem(3,"sentences")}}'
          }
        ]
      }
    ]
  }
]