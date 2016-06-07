//bind
new Vue({
  el:'.app',
  data:{
    message:'this vue bind'
  }
});

//table
var table = new Vue({
  el:'.table',
  data:{
    datas:[
      {text:'one'},
      {text:'two'},
      {text:'three'}
    ]
  }
});

//user input
//
function check(){
  return true;
}

new Vue({
  el:'.user-input',
  data:{
    message: 'Hello Vue.js!',
    classA:check(),
    classB:false,
    styleObject:{
      color:'red',
      fontSize:'20px'
    }
  },
  methods:{
    remessage : function(){
      console.log(this.ok);
      this.message = this.message.split('').reverse().join('');
    }
  },
  computed:{
    b : function(){
      return this.message + "hheehhe"
    }
  }
});


//table
new Vue({
  el:'.vu-show',
  data:{
    ok : true,
    show : true
  }
});

//event
//========================
//enter
//tab
//delete
//esc
//space
//up
//down
//left
//right
//========================
new Vue({
  el:'.event',
  data:{
    message: 'event!',
    choices:[]
  },
  methods:{
    say : function(ele,_event){
      if(this.choices[0]){
        console.log(this.choices);
      }else{
        console.log("default");
      }
    },
    submit : function(){
      console.log("key");
    },
    keyCode : function(){
    console.log('13');
    }
  },
});

var MyComponent = Vue.extend({
  template: '<div>A custom component!</div>'
});

Vue.component('my-component', MyComponent);
new Vue({
  el:'#example'
});