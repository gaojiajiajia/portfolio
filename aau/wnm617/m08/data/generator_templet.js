[
  '{{repeat(10)}}',
  {
    id:'{{index()}}',
    name:'{{firstName()}}.{{surname()}}',
    username:function(){
      return'user'+this.id;
  },
    email:function(){
      return this.username+'@gmail.com';
  },
    password:'pass',
    
    img:'https://via.placeholder.com/400/{{integer(700,999)}}/fff',
    animals:[
      '{{repeat(5,15)}}',
      {
        id:'{{index()}}',
        name:'{{company()}}',
        type:'{{random("cat","dog","horse")}}',
        breed:function(tags){
          var breeds={
            cat:["shorthair","sphynx","longhair","ginger"],
            dog:["corgi","shiba inu","great dane","poodle"],
            horse:["arabian","white","brown"]
      };
          var chosen_breed=breeds[this.type];
          var chosen_index=tags.integer(0,chosen_breed.length-1);
          return chosen_breed[chosen_index];
  },
        img:function(tags){
          return'https://via.placeholder.com/400'+
            tags.integer(700,900)+
            '/fff/?text='+this.name;
        },
        location:[
          '{{repeat(5,7)}}',
          {
            id:'{{index()}}',
            latitude: '{{floating(37.797215,37.700281 )}}',
            longitude: '{{floating(-122.504491, -122.384241)}}',
            description:'{{lorem(3,"sentences")}}',
            date:'{{date(new Date(2018, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss")}}',
            img:'https://via.placeholder.com/400/'
          }
        ]
      }
      ]
  }
]